import { gql } from "apollo-boost";

export default gql`
  type Query {
    categories: [Category]
    technologies: [Tech]
    users: [User]
  }
  type Category {
    Id: ID!
    Title: String!
    """
    Is it at the top or bottom of the stack? Lower numbers are shown first.
    """
    Position: Int!
    technologies: [Tech!]
    Description: String
  }

  type Tech {
    Id: ID!
    Title: String
    Link: String
    Logo: String
    Created: String
    Modified: String
    categoryIds: [Int]
    comments: [Comment]
    categories: [Category]
    sortOrder: Float
    createdBy: User
    modifiedBy: User
  }

  type User {
    id: ID!
    email: String
    name: String!
    photo: String
    department: String
    jobTitle: String
    office: String
    comments: [Comment]
  }

  type Stack {
    id: ID!
    title: String!
    description: String
    author: User!
    technologies: [Tech!]
    comments: [Comment]
  }
`;
