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

export const RATE_WORKER = gql`
    mutation RateWorker($input: RateWorkerInput!){
        rateWorker(input: $input){
            id
            stars
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

export const RESPOND_BUDGET = gql`
    mutation RespondBudget($input: RespondBudgetInput!){
        respondBudget(input: $input){
            id
            amount
            customer{
                firstName
            }
        }
    }
`;

export const REJECT_BUDGET = gql`
    mutation RejectBudget($input: RejectBudgetInput!){
        rejectBudget(input: $input){
            id
        }
    }
`;

export const FINISH_BUDGET = gql`
    mutation FinishBudget($input: FinishBudgetInput!) {
        finishBudget(input: $input) {
            id
        }
    }
`;



export const CONFIRM_BUDGET = gql`
    mutation ConfirmBudget($input: ConfirmBudgetInput!) {
        confirmBudget(input: $input) {
            id
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
            status
        }
    }
`;



export const UPDATE_JOB_POSTS = gql`
    mutation UpdateJobPosts($input: UpdateJobPostInput!){
        updateJobPost(input: $input){
            success
        }   
    }
`;

export const REQUEST_BUDGET = gql`
    mutation RequestBudget($input: RequestBudgetInput!) {
        requestBudget(input: $input){
            id
            description
            status
            imageKeys
        }
    }
`;

export const PAY_BUDGET = gql`
    mutation PayBudget($input: PayBudgetInput!) {
        payBudget(input: $input){
            id
            description
            status
        }
    }
`;

export const ADD_WORKER_IMAGE = gql`
    mutation AddWorkerImage($input: AddWorkerImageInput!) {
        addWorkerImage(input: $input){
            ok
        }
    }
`;
