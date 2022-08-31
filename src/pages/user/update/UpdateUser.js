import { Button, Col, Form, Input, InputNumber, notification, Pagination, Radio, Row } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react";

import { UserContentParser, UserListParser } from "../UserContentParser";
import UserCollapseUpdate from "./UserCollapseUpdate";

import { _searchAllUsers, _searchUserById, _searchUserByUsername, _updateUser } from "../../../service/UserService";

import { PAGINATION } from "../../../globals/GlobalVariables";

import UserSearch from "../ASD";

const searchOptions = [
  {
    label: "Search User By ID",
    value: "Search User By ID"
  },
  {
    label: "Search User By Username",
    value: "Search User By Username"
  }
];

export default function UpdateUser() {
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([{
    key: 0,
    username: "",
    readList: null,
    favoriteList: null,
    roles: null
  }]);
  const [radioValue, setRadioValue] = useState("Search User By ID");
  const [pagination, setPagination] = useState(PAGINATION);
  // isSearch makes use of the fact that '0: false, others: true'
  const [isSearch, setIsSearch] = useState(0);

  const notRenderPaginationEffect = useRef(true);

  /* ========== Use Effect Functions ========== */
  useEffect(() => {
    async function searchAllUsers() {
      const response = await _searchAllUsers(PAGINATION); // searching users

      if (!response.successful) { // Not successful
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

      const newContent = UserContentParser(response.content);
      const { pageNumber, pageSize } = response.pageable;

      // setting states with new users
      setUsers(newContent);
      setPagination({
        ...pagination,
        current: pageNumber + 1,
        pageNumber: pageNumber,
        pageSize: pageSize,
        total: response.totalElements
      });
    }

    searchAllUsers();
  }, [userId !== 0, username !== ""]);

  useEffect(() => {
    async function searchAllUsers() {
      const response = await _searchAllUsers(pagination); // searching users

      if (!response.successful) { // Not successful
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

      const newContent = UserContentParser(response.content);

      // setting states with new users
      setUsers(newContent);
      setPagination({
        ...pagination,
        total: response.totalElements
      });
      setIsSearch(0);
    }

    if (notRenderPaginationEffect.current) {
      notRenderPaginationEffect.current = false;
      return;
    }

    if (!isSearch) {
      return;
    }

    if (radioValue === "Search User By ID" && userId !== 0) {
      handleUserSearchById();
    } else if (radioValue === "Search User By Username" && username) {
      handleUserSearchByUsername();
    } else {
      searchAllUsers();
    }
  }, [isSearch])

  /* ========== Event Listener Functions ========== */
  function handleUserIdChange(newId) {
    if (newId) {
      setUserId(newId);
    } else {
      setUserId(0);
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleRadioValueChange(event) {
    setIsSearch(prev => prev + 1);
    setRadioValue(event.target.value);
  };

  function handlePaginationChange(current, pageSize) {
    setPagination({
      ...pagination,
      current: current,
      pageNumber: current - 1,
      pageSize: pageSize
    });
    setIsSearch((prev) => prev + 1);
  }

  async function handleUserSearchById() {
    if (userId < 0) {
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

    const response = await _searchUserById({ userId });
    if (!response.successful) { // Not Found
      const config = {
        description: 'User is not found!',
        duration: 4.5,
        key: 'search-user-by-id-not-found-error',
        message: 'User could not be found! Check username and try again!',
        placement: 'top'
      }

      notification.error(config);

      setUserId(null);
      setPagination(PAGINATION);

      return;
    }

    const newUsers = UserContentParser(response.content);
    const { pageNumber, pageSize } = response.pageable;

    setUsers(newUsers);
    setPagination({
      ...pagination,
      current: pageNumber + 1,
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: response.totalElements
    });
  }

  async function handleUserSearchByUsername() {
    if (username == null || username === "") {
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

    const response = await _searchUserByUsername({ username, pagination });
    if (!response.successful) { // Not Found
      const config = {
        description: 'User is not found!',
        duration: 4.5,
        key: 'search-user-by-username-not-found-error',
        message: 'User could not be found! Check username and try again!',
        placement: 'top'
      }

      notification.error(config);

      setUsername("");
      setPagination(PAGINATION);

      return;
    }

    // User(s) is found
    const newUsers = UserContentParser(response.content);
    const { pageNumber, pageSize } = response.pageable;

    setUsers(newUsers);
    setPagination({
      ...pagination,
      current: pageNumber + 1,
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: response.totalElements
    });
  }

  async function handleUpdate(id, password) {
    const response = await _updateUser({ userId: id, newPassword: password })

    console.log(response);

    if (!response.successful) { // Unsuccessful request
      const config = {
        description: 'User could not be updated! Try again!',
        duration: 4.5,
        key: 'search-user-by-username-not-found-error',
        message: 'Update is not successful! ',
        placement: 'top'
      }

      notification.error(config);

      setUserId(null);
      setUsername("");
      setPagination(PAGINATION);

      return;
    }

    const config = {
      description: 'User is successfully updated!',
      duration: 4.5,
      key: 'user-update-success',
      message: 'User is updated!',
      placement: 'top'
    }

    notification.success(config);

    // Update is successful

    const newUsers = UserListParser(response.data);

    setUserId(null);
    setUsername("");
    setUsers(newUsers);
  }

  /* ========== Return ========== */
  return (
    <>
      <UserSearch
        userId={userId}
        setUserId={setUserId}
        handleUserSearchById={handleUserSearchById}
        username={username}
        setUsername={setUsername}
        handleUserSearchByUsername={handleUserSearchByUsername}
        radioValue={radioValue}
        handleRadioValueChange={handleRadioValueChange}
      />


      {/* <Radio.Group
        options={searchOptions}
        onChange={handleRadioValueChange}
        value={radioValue}
        optionType="default"
      />

      <div className='search-forms'>
        <Row>
          {
            radioValue === "Search User By ID" ?
              <Col span={12}>
                <Form
                  onFinish={handleUserSearchById}
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
                      value={userId}
                      onChange={handleUserIdChange}
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
                  onFinish={handleUserSearchByUsername}
                  onFinishFailed={() => console.log("Failed in Search User By Name!")}
                >
                  <Form.Item
                    label="Search User By Name"
                    rules={[{ message: 'Please input username' }]}
                  >
                    <Input
                      id="username"
                      name="username"
                      value={username}
                      onChange={handleUsernameChange}
                    />

                    <Button type="primary" htmlType="submit">
                      Search
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
          }
        </Row>
      </div> */}

      <div className='user-show'>
        <h1>Users</h1>
        {users.map((user) => {
          return (<UserCollapseUpdate user={user} handleUpdate={handleUpdate} />)
        })}
      </div>

      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        showSizeChanger={true}
        total={pagination.total}
        pageSizeOptions={pagination.pageSizeOptions}
        onChange={handlePaginationChange}
      />
    </>
  );
}
