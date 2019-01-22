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
    client: String
    description: String!
    link: String
    technologies: [Technology!]!
  }
  type User {
    _id: ID!
    email: String!
    password: String
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
  input BlogUpdateInput{
    title: String
    body: String
    hidden: Boolean
  }
  input TechnologyInput {
    label: String!
  }
  input TechnologyUpdateInput {
    label: String
  }
  input ProjectInput {
    name: String!
    client: String
    description: String!
    link: String
  }
  input ProjectUpdateInput {
    name: String
    client: String
    description: String
    link: String
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
    updateBlog(blogId: ID!, blogInput: BlogInput): Blog!
    removeBlog(blogId: ID!): Blog
    createTechnology(technologyInput: TechnologyInput): Technology!
    updateTechnology(technologyId: ID!, technologyInput: TechnologyInput): Technology!
    removeTechnology(technologyId: ID!): Technology
    createProject(projectInput: ProjectInput): Project!
    updateProject(projectId: ID!, projectUpdateInput: ProjectUpdateInput): Project!
    removeProject(projectId: ID!): Project
    createUser(userInput: UserInput): User!
    removeUser(userId: ID!): User!
    addTechnologyToProject(projectId: ID!, techToProjectInput: String!): Project!
    addTechnologiesToProject(projectId: ID!, techToProjectInput: [String!]): Project!
    removeTechnologiesFromProject(projectId: ID!, techToProjectInput: [String!]): Project!
  }

  type RootSubscription {
    projectsFeed: [Project!]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
  }
`);
