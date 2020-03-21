import React, { useState, useEffect } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const initApollo = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });

  return client;
};

export default function ApolloSetup({ children }) {
  let [client, setClient] = useState(() => initApollo());

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
