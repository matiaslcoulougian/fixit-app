import {gql} from "@apollo/client";

export const GET_POSTS_BY_TYPE = gql`
    query GetPostsByType($type: String!) {
        getPostsByType(input: {
            type: $type
        }){
            id
            title
            type
            worker {
                firstName
                lastName
            }
        }
    }
`;

export const GET_POST_BY_ID = gql`
    query GetPostById($id: String!) {
        getPostById(input: {
            id: $id
        }){
            id
            title
            type
            description
            worker {
                firstName
                lastName
            }
        }
    }
`;