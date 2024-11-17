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

export const GET_TODO_LIST_BY_ID = gql`
  query GET_TODO_LIST_BY_ID($id: uuid!) {
    Todos(where: {id: {_eq: $id}}) {
      id
      title
      description
      status
    }
  }
`;

export const GET_TODO_LIST = gql`query GetTodos{
    Todos{
        id
        title
        description
        status
    }
}`;
