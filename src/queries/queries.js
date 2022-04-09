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