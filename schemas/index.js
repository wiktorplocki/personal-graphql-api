const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Technology {
    _id: ID!
    label: String!
  }
  type Project {
    _id: ID!
    name: String!
    client: String!
    description: String!
    technologies: [Technology!]!
  }
  type User {
    _id: ID!
    email: String!
    password: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiry: Int!
  }

  input TechnologyInput {
    label: String!
  }
  input ProjectInput {
    name: String!
    client: String!
    description: String!
  }
  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    technologies: [Technology!]!
    projects: [Project!]!
    users: [User!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createTechnology(technologyInput: TechnologyInput): Technology
    createProject(projectInput: ProjectInput): Project
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
