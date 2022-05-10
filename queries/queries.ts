import { gql } from '@apollo/client'

export const getUsers = gql`
  query GetUsers {
    users(order_by: { created_at: desc }) {
      id
      name
      created_at
    }
  }
`

export const getUsersLocal = gql`
  query GetUsersLocal {
    users(order_by: { created_at: desc }) @client {
      id
      name
      created_at
    }
  }
`

export const getUserIds = gql`
  query GetUserIds {
    users(order_by: { created_at: desc }) {
      id
    }
  }
`

export const getUserById = gql`
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`

export const createUser = gql`
  mutation CreateUser($name: String!) {
    insert_users_one(object: { name: $name }) {
      id
      name
      created_at
    }
  }
`

export const updateUser = gql`
  mutation UpdateUser($id: uuid!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
      created_at
    }
  }
`

export const deleteUser = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`
