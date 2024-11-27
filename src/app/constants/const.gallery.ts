import { gql } from "@apollo/client";

export const GET_GALLERY = gql`query GET_GALLERY($_eq: uuid!) {
  Gallery(where: {UserId: {_eq: $_eq}}) {
    id
    name
    url
  }
}

  `;
  