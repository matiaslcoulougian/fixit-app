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
                id
                firstName
                lastName
                address
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
                address
            }
        }
    }
`;


export const GET_BUDGET_BY_CUSTOMER = gql`
    query GetBudgetByCustomer($input: GetBudgetByCustomerInput!){
        getBudgetByCustomer(input: $input){
            id
            job{
                worker{
                    firstName
                    lastName
                
                }
                title
            }
            status
            description
            details
            amount
            firstDateFrom
            firstDateTo
        }
    }
`;

export const GET_BUDGET_BY_WORKER = gql`
    query GetBudgetByWorker{
        getBudgetByWorker{
            id
            description
            status 
            
            job {
                title
            }
            customer {
                firstName
                lastName
            }
        }
    }
`;


export const GET_USER_TIME = gql`
    query GetUserTime($workerId: String!) {
        getUserTime(input: {
            workerId: $workerId
        }){
           time
        }
    }
`;

export const GET_RATING_AVERAGE = gql`
    query GetWorkerAvgRating($input: GetWorkerRatingsInput!) {
         getWorkerAvgRating(input: $input){
         average
         jobsDone
        }
    }
`;

export const GET_ME = gql`
    query GetMe {
        getMe {
            id
            firstName
            lastName
            address
            email
            role
        }
    }
`;

export const GET_WORKER_POSTS = gql`
    query GetWorkerPosts($workerId: String!) {
        getWorkerPosts(input: {
            workerId: $workerId
        }){
            id
            title
            type
            description
            status

        }
    }
    
`;