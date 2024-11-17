import { gql } from "@apollo/client";

export const STATUS = [
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

export const GET_TODO_LIST_BY_ID = `
  query GET_TODO_LIST_BY_ID($_eq: uuid!) {
  Todos(where: {UserID: {_eq: $_eq}}) {
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

export const INSERT_TODO = gql`mutation InsertTodo {
  insert_Todos_one(
    object: {
        title: "testing",
        status: "ACTIVE",
        description: "PROBANDO INSERT",
        UserID: ""
        })}
`;

export const UPDATE_TODO_BY_ID = gql`mutation UpdateTodoById($id: uuid!, $description: String!, $status: String!, $title: String!) {
  update_Todos_by_pk(pk_columns: {id: $id}, _set: {status: $status, title: $title, description: $description}) {
    description
    status
    title
  }
}
`;

export const LOGIN_QUERY = gql`query LoginQuery($_eq: String = "carlos123", $_eq1: String = "1") {
  Users(where: {username: {_eq: $_eq}, _and: {password: {_eq: $_eq1}}}) {
    id
    username
    fullname
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
