import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Tech } from "../data/interfaces";
import Tags from "../ui-toolkit/components/primitives/Tags";
import Persona from "../ui-toolkit/components/Persona/Persona";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Link from "../ui-toolkit/components/primitives/Link";
function TechDetails({ id = 0 }) {
  let { data, error, loading } = useQuery<{ tech: Tech }>(QUERY, {
    variables: { id: parseInt(id + "", 10) },
  });
  if (loading) return null;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  let tech = data.tech;
  return (
    <StyledDetails>
      <div className="flex-row details-header">
        <div className="flex-row">
          <Link href={tech.Link}>
            <BackgroundImage
              src={tech.Logo}
              style={{ width: "60px", height: "60px", marginRight: "15px" }}
            />
          </Link>
          <Link href={tech.Link}>
            <h1>{tech.Title}</h1>
          </Link>
        </div>

        <Persona
          photoSize="35px"
          photo={tech.modifiedBy.photo}
          title={tech.modifiedBy.name}
          subTitle={new Date(tech.Modified).toLocaleDateString()}
        />
      </div>
      {tech.Link && (
        <div>
          <Link className="link" href={tech.Link}>
            {tech.Link}
          </Link>
        </div>
      )}
      <div>
        <ReactMarkdown source={tech.Description} />
      </div>
    </StyledDetails>
  );
}

export default React.memo(TechDetails);
const StyledDetails = styled.div`
  .details-header {
    flex-wrap: wrap;
  }
  .link {
    font-family: monospace;
  }
`;
const QUERY = gql`
  query GetTechDetails($id: Int!) {
    tech(id: $id) {
      Id
      Title
      Description
      Link
      Logo
      Created
      Modified
      modifiedBy {
        id
        name
        email
        photo
      }
      tags {
        title
      }
    }
  }
`;
