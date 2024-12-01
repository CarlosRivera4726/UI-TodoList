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
