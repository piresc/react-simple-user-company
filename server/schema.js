const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        name: String
        email: String
        company: Company
    }

    type Company {
        id: ID!
        name: String
        yearOfCreation: Int
        users: [User]
    }

    type Query {
        getUser(id: ID!): User
        getCompany(id: ID!): Company
    }

    type Mutation {
        createUser(name: String!, email: String!): User
        updateUser(id: ID!, name: String, email: String): User
        deleteUser(id: ID!): User
        createCompany(name: String!, yearOfCreation: Int!): Company
        updateCompany(id: ID!, name: String, yearOfCreation: Int): Company
        deleteCompany(id: ID!): Company
        addUserToCompany(userId: ID!, companyId: ID!): Company
        removeUserFromCompany(userId: ID!, companyId: ID!): Company
        removeAllUsersFromCompany(companyId: ID!): Company
    }
`;

module.exports = typeDefs;
