import React, { useEffect, useState, useRef } from 'react';
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Col, Row } from "antd";

import UserShow from './UserShow';
import UserContentParser from './UserContentParser';

import {
  _deleteUser,
  _searchAllUsers, _searchUserById, _searchUserByName,
  _updateUser
} from '../../service/UserService';

import PAGINATION from "../../global-vars/Pagination";

export default function DeleteUpdateSearchUser() {
  const [state, setState] = useState({
    userId: 0,
    username: '',
    userData: [{
      key: 0,
      username: "",
      readList: null,
      favoriteList: null,
      roles: null,
    }],
    pagination: PAGINATION
  })
  /* const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState([{
    key: 0,
    username: "",
    readList: null,
    favoriteList: null,
    roles: null,
  }]);

  const [pagination, setPagination] = useState(PAGINATION) */

  const isFirstRender = useRef(true);

  /* ========== Use Effect Function ========== */
  useEffect(() => {
    async function searchAllUsers() {

      const responseData = await _searchAllUsers(state.pagination); // searching users
      //const responseData = await _searchAllUsers(pagination); // searching users

      if (!responseData.successful) { // Not successful
        window.alert("Error in searchAllBook in SearchBook!");
        return;
      }

      // setting total elements in the beginning
      setState({
        ...state,
        pagination: {
          ...state.pagination,
          total: responseData.totalElements
        }
      })
      /* setPagination({
        ...pagination,
        total: responseData.totalElements
      }); */

      const newContent = UserContentParser(responseData);

      //setUserData(newContent);
      setState({
        ...state,
        userData: newContent
      })
    }

    searchAllUsers();
  }, [])

  useEffect(() => {
    async function searchAllUsers() {

      //const responseData = await _searchAllUsers(pagination); // searching users
      const responseData = await _searchAllUsers(state.pagination); // searching users

      if (!responseData.successful) { // Not successful
        window.alert("Error in searchAllBook in SearchBook!");
        return;
      }

      const newContent = UserContentParser(responseData);

      //setUserData(newContent);
      setState({
        ...state,
        userData: newContent
      })
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    searchAllUsers();
  }, [state.userId != null, state.username !== "", state.pagination])


  /* ========== Event Listener Functions ========== */
  function onUserIdChange(newId) {
    //setUserId(newId);
    setState({
      ...state,
      userId: newId
    })
  }

  function onUsernameChange(event) {
    //setUsername(event.target.value);
    setState({
      ...state,
      username: event.target.value
    })
  }

  async function onUserSearchById() {
    if (state.userId < 0) {
      window.alert("Check User Id. User Id should be greater than or equal 0!")
      return;
    }

    const data = await _searchUserById({ userId: state.userId });

    if (!data.successful) { // Not Found
      //setUserData([]);
      setState({
        ...state,
        userData: []
      })
      return;
    }

    // User is found
    const newContent = UserContentParser(data);

    //setUserData(newContent);
    setState({
      ...state,
      userData: newContent
    })

    /* onPaginationChange({
      newPageNumber: data.pageable.pageNumber + 1, // response's pageNumber start from 0
      newPageSize: data.pageable.pageSize
    });  */

  }

  async function onUserSearchByName() {
    if (state.username === "" || state.username == null) {
      window.alert("Check Username. Username should be provided!")
      return;
    }

    const data = await _searchUserByName({ username: state.username });

    if (!data.successful) { // Not Found
      //setUserData([]);
      setState({
        ...state,
        userData: []
      })
      return;
    }

    // User(s) is found
    const newContent = UserContentParser(data);

    //setUserData(newContent);
    setState({
      ...state,
      userData: newContent
    })
  }

  function onPaginationChange({ newPageNumber, newPageSize }) {
    /* setPagination({
      ...pagination,
      current: newPageNumber,
      pageSize: newPageSize,
      pageNumber: newPageNumber - 1
    }); */
    setState({
      ...state,
      pagination: {
        ...state.pagination,
        current: newPageNumber,
        pageSize: newPageSize,
        pageNumber: newPageNumber - 1
      }
    })
  }

  /* ========== Handle Functions ========== */
  async function handleDelete(key) {
    const data = await _deleteUser({ userId: key });

    if (!data.successful) { // Error
      window.alert("User is not Found")
      return;
    }

    // Delete is successful
    const newUserData = state.userData.filter((item) => item.key !== key);

    //setUserData(newUserData);
    setState({
      ...state,
      userData: newUserData
    })
  }

  // @TODO Change it
  async function handleUpdate(key, password) {
    const data = await _updateUser({ userId: key, password: password })

    if (!data.successful) { // Unsuccessful request
      window.alert("Error");
      return;
    }

    // Update is successful
    //setUserData(userData);
    setState({
      ...state,
      userData: state.userData
    })
  }

  /* ========== Return ========== */
  return (
    <>
      <div className='search-forms'>
        <Row>
          <Col span={12}>
            <Form
              onFinish={onUserSearchById}
              onFinishFailed={() => console.log("Failed in Search User By Id!")}
            >
              <Form.Item
                label="Search User By Id"
                rules={[{ message: 'Please input an integer greater than or equal to 0!' }]}
              >
                <InputNumber
                  min={0}
                  id="userId"
                  name="userId"
                  value={state.userId}
                  onChange={onUserIdChange}
                />

                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              onFinish={onUserSearchByName}
              onFinishFailed={() => console.log("Failed in Search User By Name!")}
            >
              <Form.Item
                label="Search User By Name"
                rules={[{ message: 'Please input username' }]}
              >
                <Input
                  id="username"
                  name="username"
                  value={state.username}
                  onChange={onUsernameChange}
                />

                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>

      <div className='user-show'>
        <h1>Users</h1>
        <UserShow
          users={state.userData}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          pagination={state.pagination}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </>
  );
}
