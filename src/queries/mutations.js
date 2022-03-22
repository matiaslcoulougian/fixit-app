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
    ) {
        register(input: {
            email: $email,
            phoneNumber: $phoneNumber,
            password: $password,
            firstName: $firstName,
            lastName: $lastName,
            dateOfBirth: $dateOfBirth,
            address: $address
        }) {
            id
            email
            firstName
            lastName
            dateOfBirth
      }
    }
`;