import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Tech } from "../data/interfaces";
import Tags, { Tag } from "../ui-toolkit/components/primitives/Tags";
import Persona from "../ui-toolkit/components/Persona/Persona";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Link from "../ui-toolkit/components/primitives/Link";
import { IconButton, PrimaryButton, Button } from "office-ui-fabric-react/lib/Button";
import { useRouter } from "../appShell/router/Router";
import { useApolloQuery } from "../graphql/ApolloSetup";
import Grid from "../ui-toolkit/components/Grid/Grid";

function TechDetails({ techId = 0, onEdit }) {
  let { navigate } = useRouter();
  let { data, error, loading } = useApolloQuery<{ tech: Tech }>(QUERY, {
    id: parseInt(techId + "", 10),
  });
  if (loading) return null;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  let tech = data.tech;

  return (
    <StyledDetails>
      <div className="flex-row details-header">
        <div className="flex-row">
          <Link href={tech.Link} title={tech.Link}>
            <BackgroundImage
              src={tech.Logo}
              style={{ width: "60px", height: "60px", marginRight: "15px" }}
            />
          </Link>
          <Link href={tech.Link} title={tech.Link}>
            <h1>{tech.Title}</h1>
          </Link>
          {/* <IconButton
            iconProps={{ iconName: "Edit" }}
            onClick={() => (onEdit ? onEdit(techId) : navigate("/tech/edit", { techId }))}
            title="Edit"
          /> */}
        </div>

        <div className="flex-row" style={{ justifyContent: "flex-end" }}>
          {/* <BackgroundImage
            src={tech.category.Icon}
            title={tech.category.Title}
            style={{ width: "40px", height: "40px" }}
          /> */}
          <Button
            iconProps={{ iconName: "Edit" }}
            onClick={() => (onEdit ? onEdit(techId) : navigate("/tech/edit", { techId }))}
            title="Edit"
          >
            Edit
          </Button>
          {/* <Persona
            photoSize="35px"
            photo={tech.modifiedBy.photo}
            title={tech.modifiedBy.name}
            subTitle={new Date(tech.Created).toLocaleDateString()}
          /> */}
        </div>
      </div>
      {tech.Link && (
        <div>
          <Link className="link" href={tech.Link}>
            {tech.Link}
          </Link>
        </div>
      )}
      <Tags tags={[{ label: tech.category.slug }, ...tech.tags.map((t) => ({ label: t.title }))]} />
      <p>{tech.Tagline}</p>

      <h3>Description</h3>
      <div>
        <ReactMarkdown source={tech.Description} />
      </div>
      <h3>Skyline Opinions</h3>
      <Grid size={"200px"}>
        {tech.ratings
          .filter((r) => r.value > 0)
          .map((rating) => (
            <Persona
              photoSize={"40px"}
              title={rating.label}
              subTitle={rating.user.name}
              photo={rating.user.photo}
            />
          ))}
      </Grid>
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
      Tagline
      Logo
      Created
      Modified
      category {
        Title
        slug
        Icon
      }
      modifiedBy {
        id
        name
        email
        photo
      }
      ratings {
        user {
          name
          id
          photo
        }
        value
        label
      }
      tags {
        title
      }
    }
  }
`;
