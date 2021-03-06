import {gql} from "@apollo/client";

export const GET_POSTS_BY_TYPE = gql`
    query GetPostsByType($input: GetPostsByTypeInput!) {
        getPostsByType(input: $input){
            id
            title
            type
            worker {
                id
                firstName
                lastName
                address
                profileUrl
            }
        }
    }
`;

export const GET_WORKER_RATINGS = gql`
    query GetWorkerRatings($input: GetWorkerRatingsInput!){
        getWorkerRatings(input: $input){
            stars
            comment
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
                id
                firstName
                lastName
                address
                profileUrl
            }
        }
    }
`;


export const GET_BUDGET_BY_CUSTOMER = gql`
    query GetBudgetByCustomer($input: GetBudgetByStatusInput!){
        getBudgetByCustomer(input: $input){
            id
            job{
                worker{
                    firstName
                    lastName
                    id
                }
                title
                type
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
    query GetBudgetByWorker($input: GetBudgetByStatusInput!){
        getBudgetByWorker(input: $input){
            id
            description
            status 
            createdAt
            time
            firstDateFrom
            firstDateTo
            declineMessage
            amount
            dateAgreed
            job {
                title
                type
            }
            customer {
                firstName
                lastName
                lat
                lon
            }
        }
    }
`;


export const GET_USER_TIME = gql`
    query GetUserTime($input: GetUserTimeInput!) {
        getUserTimes(input: $input){
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
            balance
            profileUrl
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

export const GET_BUDGET_IMAGE_URLS = gql`
     query GetBudgetImageUrls($input: GetBudgetImageUrlsInput!) {
             getBudgetImageUrls(input: $input){
             imageUrls
            }
        }
`;