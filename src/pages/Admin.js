import React from "react";
import { _addBook, _searchAll, _searchById, _searchByName } from "../service/BookService";
import { Table } from "antd";

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

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    bookId: 1,
    bookName: "",
    bordered: true,

    data: [],

    loading: false,

    isSearchedAll: true,

    pagination: {
      current: 1,
      pageSize: 10
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

  saveBook = async (params = {}) => {
    this.setState({ loading: true });

    const data = await _addBook(params);

    console.log(JSON.stringify(data));

    this.setState({
      loading: false,
      data: data,
    });
  }

  render() {
    const { bordered, data, pagination, loading, isSearchedAll } = this.state;
    return (
      <Table
        bordered={bordered}
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={pagination}
        onChange={this.handleTableChange}
      />);
  }
}

export default Admin;