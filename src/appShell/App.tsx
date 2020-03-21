import React from "react";
import ApolloSetup from "../graphql/ApolloSetup";
import Router from "./router/Router";

function App({}: AppProps) {
  return (
    <ApolloSetup>
      <Router>
        <Screen path="/stacks/new">
          <h1 className="ms-fontSize-42">Create New Stack</h1>
        </Screen>
        <Screen path="/tech">
          <h1 className="ms-fontSize-42">Tech</h1>
        </Screen>
        <Screen path="/stacks">
          <h1>Stacks</h1>
        </Screen>
        <Screen path="/">
          <h1>Home</h1>
        </Screen>
      </Router>
    </ApolloSetup>
  );
}

export interface ScreenProps {
  path?: string;
}

function Screen({ path = "", children }) {
  return <>{children}</>;
}

export default React.memo(App);

export interface AppProps {
  //props
}
