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

function TechCard({ tech }: TechCardProps) {
  let tags = tech.tags.map((t) => ({ label: t.title }));
  let { setFilter } = useTechFilter();
  tags.unshift({ label: tech.category.slug });
  let detailsPanel = useTechDetailsPanel();
  let [rating, setRating] = React.useState(null);

  let onDetailsClick = (e) => {
    e.preventDefault();
    console.log("HERE", tech.Id);
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
      <Card.Footer>
        <Rating value={rating} onChange={setRating} />
      </Card.Footer>
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
