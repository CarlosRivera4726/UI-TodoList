import { gql } from "@apollo/client";

export const HEADERS = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": "StpgVF86YjCS77ZxCF3sYKTtzdc2kRDLdLu6PxpNprZgMgdAWDppWqURPJDC7agc",
}

export const STATUS = [
  {
    value: "SELECT ONE STATUS",
    label: "Seleccionar un estado"
  },
  {
    value: "PENDING",
    label: "Pendiente"
  },
  {
    value: "COMPLETED",
    label: "Completado"
  },
  {
    value: "IN_PROGRESS",
    label: "En progreso"
  },
  {
    value: "ACTIVE",
    label: "Activo"
  },
  {
    value: "INACTIVE",
    label: "Inactivo"
  },

]

export const GET_TODO_LIST_BY_USERID = `
  query GET_TODO_LIST_BY_ID($_eq: uuid!) {
  Todos(where: {UserID: {_eq: $_eq}}) {
    id
    title
    description
    status
  }
}
`;

export const GET_TODO_LIST_BY_ID_ = gql`
  query GET_TODO_LIST_BY_ID($_eq: uuid!) {
  Todos(where: {id: {_eq: $_eq}}) {
    id
    title
    description
    status
  }
}
`;

export const GET_TODO_LIST = gql`query GetTodos {
    Todos{
        id
        title
        description
        status
    }
}`;

export const INSERT_TODO = gql`
mutation MyMutation(
  $UserID: uuid!,
  $description: String!,
  $status: String!,
  $title: String!
) {
  insert_Todos_one(
    object: {
      description: $description,
      status: $status,
      title: $title,
      UserID: $UserID
    }
  ) {
    id
    status
    title
    description
    UserID
  }
}
`;

export const UPDATE_TODO_BY_ID = gql`
  mutation UpdateTodoById($id: uuid!, $description: String!, $status: String!, $title: String!) {
    update_Todos_by_pk(
      pk_columns: { id: $id }
      _set: { status: $status, title: $title, description: $description }
    ) {
      description
      status
      title
    }
  }
`;


export const LOGIN_QUERY = gql`query LoginQuery($_eq: String!) {
  Users(where: {username: {_eq: $_eq} }) {
    id
    username
    fullname
    email
    password
  }
}
`;

export const GET_USER_INFO = `query GetUserInfo($_eq: String!) {
  Users(where: {email: {_eq: $_eq} }) {
    id
    email
  }
}
`;

export const REGISTER_USER = `mutation RegisterUser($email: String!, $fullname: String!, $password: String!, $username: String!) {
  insert_Users_one(object: {email: $email, fullname: $fullname, password: $password, username: $username}, on_conflict: {constraint: Users_username_key}){
    username
    fullname
    email
  }
}
`;

export const DELETE_TODO_BY_ID = `mutation DELETE_TODO_BY_ID($id: uuid!) {
  delete_Todos_by_pk(id: $id){ id title status }
}
`;
