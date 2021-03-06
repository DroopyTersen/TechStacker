import React from "react";
import ApolloSetup from "../graphql/ApolloSetup";
import Router from "./router/Router";
import styled, { createGlobalStyle } from "styled-components";
import TechScreen from "../Tech/TechScreen";
import TechFormScreen from "../Tech/TechFormScreen";

function App({}: AppProps) {
  return (
    <StyledApp>
      <GlobalStyle />
      <ApolloSetup>
        <Router>
          <TechFormScreen path="/tech/new" />
          <TechFormScreen path="/tech/edit" />
          <TechScreen path="/tech" />

          <Screen path="/stacks">
            <h1>Stacks</h1>
          </Screen>
          <TechScreen path="/" />
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
const GlobalStyle = createGlobalStyle`
      .flex-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position:relative;
      }
      .flex-start {
          justify-content: flex-start;
          margin-right: -10px;
          >* {
              margin-right: 10px;
          }
      }
      .flex-center {
        justify-content: center;
          margin-left: -10px;
          >* {
              margin-left: 10px;
          }
      }
      .flex-end {
          justify-content: flex-end;
          margin-left: -10px;
          >* {
              margin-left: 10px;
          }
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
