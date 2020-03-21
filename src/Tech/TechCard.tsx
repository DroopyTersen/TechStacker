import React from "react";
import { Category, Tech } from "../data/interfaces";
import styled from "styled-components";
import Thumbnail from "../ui-toolkit/components/primitives/Thumbnail";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
import Card from "../ui-toolkit/components/Card/Card";

function TechCard({ tech }: TechCardProps) {
  let image = tech.Logo || tech.category.Icon;
  let tags = tech.tags.map((t) => ({ label: t.title }));
  tags.unshift({ label: tech.category.Title });
  return (
    <Card centered>
      <Card.Image size={90}>
        <BackgroundImage src={image} style={{ width: "60px", height: "60px" }} />
      </Card.Image>
      <Card.Tags tags={tags}></Card.Tags>
      <Card.Title>{tech.Title}</Card.Title>
    </Card>
  );
}

export default React.memo(TechCard);

export interface TechCardProps {
  tech: Tech;
}

const StyledCard = styled(Card)`
  position: relative;
`;
