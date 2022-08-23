import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { _searchAll } from '../../service/UserService';

const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    username: `Edrward ${i}`,
    password: `London Park no. ${i}`,
  });
}

export default function UpdateUser() {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      username: '',
      password: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newUserData = [...userData];
      const index = newUserData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newUserData[index];
        newUserData.splice(index, 1, { ...item, ...row });
        setUserData(newUserData);
        setEditingKey('');
      } else {
        newUserData.push(row);
        setUserData(newUserData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  useEffect(() => {
    async function searchAllUsers() {
      const data = await _searchAll({
        pageSize: 10,
        pageNumber: 0
      });

      const newContent = parseResponse(data);

      setUserData(newContent);
    }
    
    searchAllUsers();
  }, [userId != null, username !== ""])

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username'
    },
    {
      title: 'Password',
      dataIndex: 'password',
      editable: true,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={userData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function parseResponse(data) {
  const newContent = data.content.map((user) => {
    let readList = user.readList;
    let favoriteList = user.favoriteList;

    readList = readList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    favoriteList = favoriteList.map((book) => {
      return {
        ...book,
        key: book.id,
        publicationDate: book.publicationDate.slice(0, 10)
      }
    });

    return {
      ...user,
      key: user.id,
      readList: readList,
      favoriteList: favoriteList
    }
  });

  return newContent;
}