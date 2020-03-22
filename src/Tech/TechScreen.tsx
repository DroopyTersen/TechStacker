import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Category } from "../data/interfaces";
import TechCategory from "./TechCategory";
import { TechFilterProvider, useTechFilter } from "./TechFilterContext";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TechDetailsPanel } from "./TechPanelContext";
import Link from "../ui-toolkit/components/primitives/Link";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
export default function TechScreen({ path = "" }) {
  let { data, error, loading } = useQuery<{ categories: Category[] }>(QUERY);
  if (loading) return null;
  if (error) return <Error error={error} />;
  return (
    <StyledScreen>
      <TechFilterProvider>
        <TechDetailsPanel>
          <Header />
          <div className="left">
            <nav>
              <label>Categories</label>
              <ul>
                {data.categories.map((category) => (
                  <li>
                    <Link href={"#" + category.slug}>{category.Title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="main">
            <div>
              {data.categories.map((c) => (
                <TechCategory category={c} />
              ))}
            </div>
          </div>
        </TechDetailsPanel>
      </TechFilterProvider>
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

function Header() {
  let { filter, setFilter } = useTechFilter();
  return (
    <StyledHeader className="flex-row screen-header">
      <div className="flex-row" style={{ justifyContent: "flex-start" }}>
        <BackgroundImage
          src={
            "https://myskyline365.sharepoint.com/sites/TechStacker/SiteAssets/__sitelogo__js-dna.png"
          }
          style={{ width: "40px", height: "40px", marginRight: "5px" }}
        />
        <h1 className="screen-title">
          Tech<span>Tracker</span>
        </h1>
      </div>
      <div className="search">
        <SearchBox
          value={filter}
          onChange={(newVal) => setFilter(newVal)}
          placeholder="Filter..."
          autoFocus={true}
        />
      </div>
      <div className="actions">
        <PrimaryButton iconProps={{ iconName: "Add" }}>Add Tech</PrimaryButton>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  flex-wrap: wrap;
  margin-right: -20px;
  h1.screen-title {
    font-size: 1.5em;
    font-weight: 400;
    font-family: monospace;
    color: #217189;
    span {
      color: #9f9962;
    }
  }
  > * {
    box-sizing: border-box;
    flex: 1 1 30%;
    margin-right: 20px;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledScreen = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 75px 1fr;
  grid-template-areas: "header header" "left main";
  .screen-header {
    grid-area: header;
    position: sticky;
    top: 0;
    background: linear-gradient(0deg, transparent 0%, #fff 50%);
    z-index: 1;
  }

  .left {
    grid-area: left;
    padding-top: 20px;
    > nav {
      position: sticky;
      top: 95px;
    }
    nav ul {
      margin: 5px 0;
      padding-left: 25px;
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
      Description
      Icon
      slug
      technologies {
        Title
        Id
        Logo
        Link
        Tagline
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
