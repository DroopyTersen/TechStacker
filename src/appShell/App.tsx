import React from "react";
import ApolloSetup from "../graphql/ApolloSetup";
import Router from "./router/Router";
import styled from "styled-components";
import TechScreen from "../Tech/TechScreen";

function App({}: AppProps) {
  return (
    <StyledApp>
      <ApolloSetup>
        <Router>
          <TechScreen path="/tech" />
          <Screen path="/stacks">
            <h1>Stacks</h1>
          </Screen>
          <Screen path="/">
            <h1>Home</h1>

            <p>This is a test</p>
          </Screen>
        </Router>
      </ApolloSetup>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  font-size: 15px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: -0.04em;
    margin: 0;
  }
  h1 {
    font-size: 3.1em;
  }
  h2 {
    font-size: 2.2em;
    font-weight: 300;
  }
  h3 {
    font-size: 1.6em;
    line-height: 1.35;
  }
  h4 {
    font-size: 1.35em;
    letter-spacing: -0.05em;
    line-height: 1.5;
  }
  h5 {
    font-size: 1.15rem;
    letter-spacing: 0;
    line-height: 1.4;
  }
  p {
    margin-top: 0;
  }
`;
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
