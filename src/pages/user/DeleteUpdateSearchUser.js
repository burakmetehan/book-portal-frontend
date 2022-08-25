import React, { useEffect, useState, useRef } from 'react';
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, Col, Row, notification, Radio } from "antd";

import UserShow from './UserShow';
import UserContentParser from './UserContentParser';

import SearchUser from "./SearchUser";

import {
  _deleteUser,
  _searchAllUsers, _searchUserById, _searchUserByName,
  _updateUser
} from '../../service/UserService';



import PAGINATION from "../../global-vars/Pagination";


const options = [
  {
    label: 'Search User By ID',
    value: 'Search User By ID'
  },
  {
    label: 'Search User By Username',
    value: 'Search User By Username'
  }
];

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
    pagination: PAGINATION,
    radioValue: 'Search User By ID'
  })

  const isFirstRender = useRef(true);
  const isFirstRender2 = useRef(true);

  /* ========== Use Effect Functions ========== */
  useEffect(() => {
    async function searchAllUsers() {

      const responseData = await _searchAllUsers(state.pagination); // searching users

      if (!responseData.successful) { // Not successful
        const config = {
          description: 'User could not be loaded!',
          duration: 4.5,
          key: 'search-all-user-error',
          message: 'An error happened while trying to load users! Please try later!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const newContent = UserContentParser(responseData);

      // setting state with new pagination and new userData
      setState({
        ...state,
        pagination: {
          ...state.pagination,
          total: responseData.totalElements
        },
        userData: newContent
      });
    }

    searchAllUsers();
  }, [])

  useEffect(() => {
    async function searchAllUsers() {

      const responseData = await _searchAllUsers(state.pagination); // searching users

      if (!responseData.successful) { // Not successful
        const config = {
          description: 'User could not be loaded!',
          duration: 4.5,
          key: 'search-all-user-error',
          message: 'An error happened while trying to load users! Please try later!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const newContent = UserContentParser(responseData);

      setState({
        ...state,
        userData: newContent
      });
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    searchAllUsers();
  }, [state.userId != null, state.username !== ""])

  useEffect(() => {
    async function userSearchById() {
      if (state.userId < 0) {
        const config = {
          description: 'Check User ID!',
          duration: 4.5,
          key: 'search-user-by-id-error',
          message: 'User ID should be 0 or greater than 0!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const responseData = await _searchUserById({ userId: state.userId });
      if (!responseData.successful) { // Not Found
        setState({
          ...state,
          userData: []
        });

        const config = {
          description: 'User is not found!',
          duration: 4.5,
          key: 'search-user-by-id-not-found-error',
          message: 'User could not be found! Check username and try again!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      // User is found
      const newContent = UserContentParser(responseData);

      setState({
        ...state,
        userData: newContent
      });
    }

    async function userSearchByName() {
      if (state.username === "" || state.username == null) {
        const config = {
          description: 'Check Username!',
          duration: 4.5,
          key: 'search-user-by-username-error',
          message: 'Username should be provided!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      const responseData = await _searchUserByName({ username: state.username, pagination: state.pagination });
      if (!responseData.successful) { // Not Found
        setState({
          ...state,
          userData: []
        })

        const config = {
          description: 'User is not found!',
          duration: 4.5,
          key: 'search-user-by-username-not-found-error',
          message: 'User could not be found! Check username and try again!',
          placement: 'top'
        }

        notification.error(config);

        return;
      }

      // User(s) is found
      const newContent = UserContentParser(responseData);

      setState({
        ...state,
        userData: newContent
      });
    }

    if (state.radioValue === "Search User By ID") {
      userSearchById();
    } else {
      userSearchByName();
    }
  }, [state.pagination])


  /* ========== Event Listener Functions ========== */
  function onUserIdChange(newId) {
    setState({
      ...state,
      userId: newId
    });
  }

  function onUsernameChange(event) {
    setState({
      ...state,
      username: event.target.value
    });
  }

  function onChangeRadioValue(event) {
    setState({
      ...state,
      radioValue: event.target.value
    });
  };

  async function onUserSearchById() {
    if (state.userId < 0) {
      const config = {
        description: 'Check User ID!',
        duration: 4.5,
        key: 'search-user-by-id-error',
        message: 'User ID should be 0 or greater than 0!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const responseData = await _searchUserById({ userId: state.userId });
    if (!responseData.successful) { // Not Found
      setState({
        ...state,
        userData: []
      });

      const config = {
        description: 'User is not found!',
        duration: 4.5,
        key: 'search-user-by-id-not-found-error',
        message: 'User could not be found! Check username and try again!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    // User is found
    const newContent = UserContentParser(responseData);
    const { pageNumber, pageSize, total } = responseData.pageable;

    setState({
      ...state,
      pagination: {
        ...state.pagination,
        current: responseData.pageable.pageNumber + 1,
        pageSize: pageSize,
        pageNumber: pageNumber,
        total: total
      },
      userData: newContent
    });
  }

  async function onUserSearchByName() {
    if (state.username === "" || state.username == null) {
      const config = {
        description: 'Check Username!',
        duration: 4.5,
        key: 'search-user-by-username-error',
        message: 'Username should be provided!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    const responseData = await _searchUserByName({ username: state.username, pagination: state.pagination });
    if (!responseData.successful) { // Not Found
      setState({
        ...state,
        userData: []
      })

      const config = {
        description: 'User is not found!',
        duration: 4.5,
        key: 'search-user-by-username-not-found-error',
        message: 'User could not be found! Check username and try again!',
        placement: 'top'
      }

      notification.error(config);

      return;
    }

    // User(s) is found
    const newContent = UserContentParser(responseData);
    const { pageNumber, pageSize, total } = responseData.pageable;

    setState({
      ...state,
      pagination: {
        ...state.pagination,
        current: responseData.pageable.pageNumber + 1,
        pageSize: pageSize,
        pageNumber: pageNumber,
        total: total
      },
      userData: newContent
    });
  }

  function onPaginationChange({ newPageNumber, newPageSize }) {
    setState({
      ...state,
      pagination: {
        ...state.pagination,
        current: newPageNumber,
        pageSize: newPageSize,
        pageNumber: newPageNumber - 1
      },
    });
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
      <Radio.Group
        options={options}
        onChange={onChangeRadioValue}
        value={state.radioValue}
        optionType="default"
      />

      <div className='search-forms'>
        <Row>
          {
            state.radioValue === "Search User By ID" ?
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
              :
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
          }


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
