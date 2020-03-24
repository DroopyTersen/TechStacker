import React from "react";
import { Category, Tech } from "../data/interfaces";
import styled from "styled-components";
import Thumbnail from "../ui-toolkit/components/primitives/Thumbnail";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
import Card from "../ui-toolkit/components/Card/Card";
import { useTechDetailsPanel } from "./TechPanelContext";
import Link from "../ui-toolkit/components/primitives/Link";
import { useTechFilter } from "./TechFilterContext";
import Rating from "../components/inputs/Rating";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import useDebounce, { useDebouncedEffect } from "../ui-toolkit/hooks/useDebounce";

function TechCard({ tech }: TechCardProps) {
  let [rateTech] = useMutation(MUTATION);

  let tags = tech.tags.map((t) => ({ label: t.title }));
  let { setFilter } = useTechFilter();
  tags.unshift({ label: tech.category.slug });
  let detailsPanel = useTechDetailsPanel();
  let [rating, setRating] = React.useState(tech.currentUserRating);

  const handeRating = (value) => {
    if (value) value = parseInt(value + "", 10);
    setRating(value);
    rateTech({
      variables: {
        rating: {
          techId: parseInt(tech.Id + "", 10),
          value,
        },
      },
    });
  };

  let onDetailsClick = (e) => {
    e.preventDefault();
    detailsPanel.open(tech.Id);
  };
  return (
    <StyledCard centered>
      <Card.Image
        title="See Details"
        url={"#"}
        className="tech-image"
        size={90}
        onClick={onDetailsClick}
      >
        <BackgroundImage src={tech.Logo} style={{ width: "60px", height: "60px" }} />
      </Card.Image>
      <Card.Tags>
        <Card.Tag>{tech.category.slug}</Card.Tag>
        {tech.tags.map((tag) => (
          <Card.Tag
            url="#"
            onClick={(e) => {
              e.preventDefault();
              setFilter(tag.title);
            }}
          >
            {tag.title}
          </Card.Tag>
        ))}
      </Card.Tags>
      <Card.Title className="tech-title" title="See Details" url="#" onClick={onDetailsClick}>
        {tech.Title}
      </Card.Title>

      <Card.Description shave={60}>{tech.Tagline}</Card.Description>
      <StyledCardFooter>
        <Rating value={rating} onChange={handeRating} />
        <AverageRating
          value={tech.averageRating}
          count={tech.ratings.filter((r) => r.value > 0).length}
        />
      </StyledCardFooter>
    </StyledCard>
  );
}

export default React.memo(TechCard);

export interface TechCardProps {
  tech: Tech;
}

const StyledCard = styled(Card)`
  position: relative;
  .tech-image.card-image {
    margin: 0px auto;
  }
  .tech-image:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const MUTATION = gql`
  mutation RateTech($rating: RatingInput) {
    rateTech(rating: $rating) {
      Id
    }
  }
`;

function AverageRating({ value, count }) {
  let cssClass = "blank";
  if (value < 2.75) cssClass = "bad";
  if (value >= 2.5 && value < 3.75) cssClass = "okay";
  if (value >= 3.75) cssClass = "good";
  return (
    <StyledAverageRating>
      <div>
        <span className={"big " + cssClass}>{value || "?"}</span>
        <span className="small">/5</span>
      </div>
      <div className="small count">{count} votes</div>
    </StyledAverageRating>
  );
}

const StyledCardFooter = styled(Card.Footer)`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 0;
`;

const StyledAverageRating = styled.div`
  text-align: right;
  .big {
    font-size: 24px;
    letter-spacing: -1px;
  }
  .count {
    position: relative;
    top: -5px;
  }
  .blank {
    color: #999;
  }
  .good {
    color: #44b05c;
  }
  .okay {
    color: #8d7f11;
  }
  .bad {
    color: #c83b18;
  }
  .small {
    font-size: 12px;
    color: #999;
  }
`;
