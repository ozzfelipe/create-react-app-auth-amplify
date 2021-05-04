/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($username: String) {
    onCreateUser(username: $username) {
      id
      username
      email
      snsTopicArn
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($username: String) {
    onUpdateUser(username: $username) {
      id
      username
      email
      snsTopicArn
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($username: String) {
    onDeleteUser(username: $username) {
      id
      username
      email
      snsTopicArn
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLog = /* GraphQL */ `
  subscription OnCreateLog {
    onCreateLog {
      id
      user
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLog = /* GraphQL */ `
  subscription OnUpdateLog {
    onUpdateLog {
      id
      user
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLog = /* GraphQL */ `
  subscription OnDeleteLog {
    onDeleteLog {
      id
      user
      description
      createdAt
      updatedAt
    }
  }
`;
