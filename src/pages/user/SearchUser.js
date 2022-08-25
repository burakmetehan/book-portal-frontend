import React, { useState } from "react";

import { Radio, Form, InputNumber, Input, Button, notification } from "antd";

import {
  _deleteUser,
  _searchAllUsers, _searchUserById, _searchUserByName,
  _updateUser
} from '../../service/UserService';

import UserContentParser from './UserContentParser';

const { Search } = Input;

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

export default function SearchUser({ state, setState }) {

  function onChange(event) {
    setState({
      ...state,
      radioValue: event.target.value
    });
  };

  function SearchUserByIdForm() {
    function onUserIdChange(newId) {
      setState({
        ...state,
        userId: newId
      });
    }

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

    return (
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
    );
  }

  function SearchUserByUsername() {
    function onUsernameChange(event) {
      setState({
        ...state,
        username: event.target.value
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

      const responseData = await _searchUserByName({ username: state.username });
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

    return (
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
    );
  }

  return (
    <>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={state.radioValue}
        optionType="default"
      />

      {
        state.radioValue === "Search User By ID" ?
          <SearchUserByIdForm /> :
          <SearchUserByUsername />
      }
    </>
  );
}