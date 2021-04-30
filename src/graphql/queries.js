/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLog = /* GraphQL */ `
  query GetLog($id: ID!) {
    getLog(id: $id) {
      id
      user
      description
      dateTime
      createdAt
      updatedAt
    }
  }
`;
export const listLogs = /* GraphQL */ `
  query ListLogs(
    $filter: ModelLogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        description
        dateTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
