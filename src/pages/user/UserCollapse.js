import React from "react";

import { Table, Collapse } from "antd";

export default function UserCollapse({ user }) {
  const { Panel } = Collapse;

  const bookColumns = [
    {
      title: 'Book Name',
      dataIndex: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Page Count',
      dataIndex: 'pageCount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
    },
    {
      title: 'Publication Date',
      dataIndex: 'publicationDate',
    }
  ];

  return (
    <Collapse>
      <Panel header={user.username} key={user.id}>
        <p>This is the data of {user.username}.</p>
        <Collapse ghost>
          <Panel header="Read List" key="readList">
            <Table
              bordered
              columns={bookColumns}
              dataSource={user.readList}
            />
          </Panel>
          <Panel header="Favorite List" key="favoriteList">
            <Table
              bordered
              columns={bookColumns}
              dataSource={user.favoriteList}
            />
          </Panel>
          <Panel header="Roles" key="roles">
            {
              user.roles &&
              <ul>
              {
                user.roles.map((item) => {
                  return <li key={item.id}>{item.name}</li>
                })
              }
            </ul>
            }
            
          </Panel>
        </Collapse>
      </Panel>
    </Collapse>
  )
}