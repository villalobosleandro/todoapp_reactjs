import { gql } from "@apollo/client";

export const TASKS_LIST = gql`
  query GET_TASKS_LIST {
    tasksList {
        count
        items {
          id
          title
          completed
        }
    }
   }
`