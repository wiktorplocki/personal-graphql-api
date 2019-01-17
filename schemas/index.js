const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Blog {
    _id: ID!
    title: String!
    body: String!
    hidden: Boolean!
  }
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

  input BlogInput {
    title: String!
    body: String!
    hidden: Boolean
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
    password: String
  }

  type RootQuery {
    blogs: [Blog!]!
    singleBlog(blogId: ID!): Blog!
    technologies: [Technology!]!
    singleTechnology(techId: ID!): Technology!
    projects: [Project!]!
    singleProject(projectId: ID!): Project!
    users: [User!]!
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createBlog(blogInput: BlogInput): Blog!
    removeBlog(blogId: ID!): Blog!
    createTechnology(technologyInput: TechnologyInput): Technology!
    removeTechnology(technologyId: ID!): Technology!
    createProject(projectInput: ProjectInput): Project!
    removeProject(projectId: ID!): Project!
    createUser(userInput: UserInput): User!
    removeUser(userId: ID!): User!
    addTechnologyToProject(projectId: ID!, techToProjectInput: String!): Project!
    removeTechnologyFromProject(projectId: ID!, techToProjectInput: String!): Project!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
