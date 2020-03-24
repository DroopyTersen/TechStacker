import { gql } from "apollo-boost";

export default gql`
  type Query {
    categories: [Category]
    technologies: [Tech]
    tech(id: Int!): Tech
    users: [User]
    tags: [Tag]
    currentUser: User
  }
  type Mutation {
    saveTech(tech: SaveTechInput): Tech
    rateTech(rating: RatingInput): Tech
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
    Icon: String
    slug: String
  }

  type Tag {
    title: ID!
    technologies: [Tech]
  }
  type Tech {
    Id: ID!
    Title: String
    Link: String
    Logo: String
    Description: String
    Tagline: String
    Created: String
    Modified: String
    CategoryId: Int
    Tags: String
    comments: [Comment]
    category: Category
    sortOrder: Float
    createdBy: User
    modifiedBy: User
    slug: String
    tags: [Tag]
    ratings: [Rating]
    averageRating: Float
    currentUserRating: Int
  }

  input SaveTechInput {
    Id: Int
    Title: String!
    CategoryId: Int!
    Tagline: String
    Logo: String
    Link: String
    Tags: String
    Description: String
  }

  type Rating {
    value: Int
    userId: Int
    user: User
  }

  input RatingInput {
    techId: Int
    value: Int
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

  type Comment {
    Id: ID!
    Message: String
    author: User
    tech: Tech
    stack: Stack
    TechId: Int
    StackId: Int
    AuthorId: Int
  }
  type Stack {
    Id: ID!
    Title: String!
    Description: String
    author: User!
    technologies: [Tech!]
    comments: [Comment]
  }
`;
