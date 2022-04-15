import {gql} from "@apollo/client";

export const REGISTER = gql`
    mutation Register(
        $email: String!
        $phoneNumber: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: Date!
        $address: String!
        $isWorker: Boolean!
    ) {
        register(input: {
            email: $email,
            phoneNumber: $phoneNumber,
            password: $password,
            firstName: $firstName,
            lastName: $lastName,
            dateOfBirth: $dateOfBirth,
            address: $address
            isWorker: $isWorker
        }) {
            id
            email
            firstName
            lastName
            dateOfBirth
            role
      }
    }
`;

export const LOGIN = gql`
    mutation Login($credential: String!, $password: String!) {
        login(input: {
            credential: $credential,
            password: $password
        }){
          user {
              id
              firstName
              role
            }
            accessToken
        
          }
    }
`;

export const CREATE_JOB_POST = gql`
    mutation CreateJobPost($title: String!, $description: String!, $type: String!) {
        createJobPost(input: {
            title: $title,
            description: $description,
            type: $type
        }){
            id
            description
            isActive
        }
    }
`;
