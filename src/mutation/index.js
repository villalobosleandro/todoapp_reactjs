import { gql } from "@apollo/client";

export const CREATE_TASK  = gql`
  mutation taskCreate ($data: TaskCreateInput!){
    taskCreate(data: $data) {
      id
      createdAt
      title
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation taskUpdate($data: TaskUpdateInput!) {
    taskUpdate(data: $data) {
      id
      updatedAt
      title
    }
  }
`;

export const DELETE_TASK = gql`
  mutation taskDelete($data: TaskDeleteInput) {
    taskDelete(data: $data) {
      success
    }
  }
`
