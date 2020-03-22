import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Category } from "../data/interfaces";
import TechCategory from "./TechCategory";

export default function TechScreen({ path = "" }) {
  let { data, error, loading } = useQuery<{ categories: Category[] }>(QUERY);
  if (loading) return null;
  if (error) return <Error error={error} />;

  return (
    <StyledScreen>
      <div className="header">
        <h1>Tech</h1>
      </div>
      <div className="left">
        <div>
          <ul>
            {data.categories.map((category) => (
              <li>
                <a href={"#" + category.slug}>{category.Title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="main">
        <div>
          {data.categories.map((c) => (
            <TechCategory category={c} />
          ))}
        </div>
      </div>
    </StyledScreen>
  );
}

function Loading() {
  return null;
}
function Error({ error }) {
  console.log("Tech Screen Error", error);
  return <div>Uh oh something went wrong!</div>;
}

const StyledScreen = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 75px 1fr;
  grid-template-areas: "header header" "left main";
  .header {
    grid-area: header;
    position: sticky;
    top: 0;
  }

  .left {
    grid-area: left;
    > div {
      position: sticky;
      top: 75px;
    }
  }

  .main {
    grid-area: main;
    overflow: hidden;
  }
`;

const QUERY = gql`
  query GetTechnologiesByCategory {
    categories {
      Title
      Id
      Position
      Icon
      slug
      technologies {
        Title
        Id
        Logo
        Link
        slug
        tags {
          title
        }
        category {
          Title
          Icon
          slug
        }
      }
    }
  }
`;
