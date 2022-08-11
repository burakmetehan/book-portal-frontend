import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { _searchAll, _searchById, _searchByName } from "../service/BookService";
import { Button, InputNumber, Input, Space } from 'antd';
import { Form } from "antd";
const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "30%"
  },
  {
    title: "Author",
    dataIndex: "author",
    width: "20%"
  },
  {
    title: "Page Count",
    dataIndex: "pageCount",
    width: "10%"
  },
  {
    title: "Type",
    dataIndex: "type",
    width: "10%"
  },
  {
    title: "Publisher",
    dataIndex: "publisher",
    width: "20%"
  },
  {
    title: "Publication Date",
    dataIndex: "publicationDate",
    width: "10%"
  }
];


class BookList extends React.Component {
  state = {
    bookId: 1,
    bookName: "",
    bordered: true,

    data: [],

    loading: false,

    isSearchedAll: true,

    pagination: {
      current: 1,
      pageSize: 1
    },
  };

  componentDidMount() {
    const { pagination } = this.state;
    this.searchAll({ pagination });
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.searchAll({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters
    });
  };

  searchAll = async (params = {
    pagination: {
      pageSize: 1,
      current: 1
    }
  }) => {
    this.setState({ loading: true });

    const data = await _searchAll({
      pageSize: params.pagination.pageSize,
      pageNumber: params.pagination.current - 1
    });

    console.log(JSON.stringify(data));

    this.setState({
      loading: false,
      data: data && data.content,
      isSearchedAll: true,
      pagination: {
        current: data && data.pageable.pageNumber + 1,
        pageSize: data && data.pageable.pageSize,
        total: data && data.totalElements
      }
    });
  };

  searchById = async (params = {}) => {
    this.setState({ loading: true });

    const data = await _searchById(params);

    console.log(JSON.stringify(data));

    this.setState({
      loading: false,
      data: data && data.content,
      isSearchedAll: false,
      pagination: {
        current: data && data.pageable.pageNumber + 1,
        pageSize: data && data.pageable.pageSize,
        total: data && data.totalElements
      }
    });
  };

  sth = (newVal) => {
    console.log(newVal);
    console.log("Here");
    this.setState({ bookId: newVal });
    console.log(this.state.bookId);
  }

  handleChange = (event) => {
    if (event == null) {
      this.searchAll();
    }
    this.setState({ bookId: event })
  };

  handleChangeName = (event) => {
    if (event.target.value == "") {
      this.searchAll();
    }
    console.log(event.target.value);
  }

  onFinish = async bookId => {
    await this.searchById(bookId);
  };

  searchByName = async (params = {}) => {
    this.setState({ loading: true });

    const data = await _searchByName(params);

    console.log(JSON.stringify(data));

    this.setState({
      loading: false,
      data: data && data.content,
      isSearchedAll: false,
      pagination: {
        current: data && data.pageable.pageNumber + 1,
        pageSize: data && data.pageable.pageSize,
        total: data && data.totalElements
      }
    });
  };

  onFinishName = async bookName => {
    await this.searchByName({ bookName });
  }

  render() {
    const { bordered, data, pagination, loading, isSearchedAll } = this.state;
    return (
      <>
        <Form
          layout="inline"
          onFinish={this.onFinish}
        >
          <Space>
            <Form.Item
              label="Search By Id"
              name="bookId"
            >
              <InputNumber
                min={0}
                onChange={this.handleChange}
                value={this.state.bookId}
                name="bookId"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Search
            </Button>

            <Form.Item
              label="Search By Name"
              name="bookName"
            >
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onChange={this.handleChangeName}
                onSearch={this.onFinishName}
              />
            </Form.Item>
          </Space>
        </Form>

        <Table
          bordered={bordered}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          loading={loading}
          pagination={pagination}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}

export default BookList;
