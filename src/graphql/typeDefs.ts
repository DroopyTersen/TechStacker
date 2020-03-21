import { gql } from "apollo-boost";

export default gql`
  type Query {
    categories: [Category]
  }
  type Category {
    Id: ID!
    Title: String!
    """
    Is it at the top or bottom of the stack? Lower numbers are shown first.
    """
    Position: Int!
    # technologies: [Tech!]
    Description: String
  }

  type Tech {
    id: ID!
    title: String
    comments: [Comment]
    categories: [Category]
    link: String
    logo: String
  }

  type User {
    id: ID!
    name: String!
    photo: String
    comments: [Comment]
  }

  type Comment {
    id: ID!
    message: String
    author: User
    tech: Tech
    techId: Int
    stackId: Int
    authroId: Int
    stack: Stack
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
