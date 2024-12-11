import { gql } from "@apollo/client";

export const GET_GALLERY = gql`query GET_GALLERY($_eq: uuid!) {
  Gallery(where: {UserId: {_eq: $_eq}}) {
    id
    name
    url
  }
}

  `;


export const INSERT_IMAGE = `mutation RegisterImage($name: String!, $url: String!, $UserId: uuid!) {
  insert_Gallery_one(object: {name: $name, url: $url, UserId: $UserId}) {
    id
    name
    url
  }
}`

export const UPDATE_IMAGE = `mutation UpdateImage($name: String!, $url: String!, $UserId: uuid!) {
  update_Gallery_by_pk(pk_columns: {id: $id}, _set: {name: $name, url: $url, UserId: $UserId}) {
    id
    name
    url
  }
}`

export const DELETE_IMAGE = `mutation DeleteImage($id: uuid!) {
  delete_Gallery_by_pk(id: $id) {
    id
  }
}`
