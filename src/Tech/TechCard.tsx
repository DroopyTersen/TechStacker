import React from "react";
import { Category, Tech } from "../data/interfaces";
import styled from "styled-components";
import Thumbnail from "../ui-toolkit/components/primitives/Thumbnail";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
import Card from "../ui-toolkit/components/Card/Card";
import { useTechDetailsPanel } from "./TechPanelContext";
import Link from "../ui-toolkit/components/primitives/Link";
function TechCard({ tech }: TechCardProps) {
  let tags = tech.tags.map((t) => ({ label: t.title }));
  tags.unshift({ label: tech.category.slug });
  let detailsPanel = useTechDetailsPanel();
  let onDetailsClick = (e) => {
    e.preventDefault();
    console.log("HERE", tech.Id);
    detailsPanel.open(tech.Id);
  };
  return (
    <Card centered>
      <Card.Image size={90}>
        <BackgroundImage src={tech.Logo} style={{ width: "60px", height: "60px" }} />
      </Card.Image>
      <Card.Tags tags={tags}></Card.Tags>
      <Link href="#" onClick={onDetailsClick}>
        <h3 className="tech-title">{tech.Title}</h3>
      </Link>
    </Card>
  );
}

export default React.memo(TechCard);

export interface TechCardProps {
  tech: Tech;
}

const StyledCard = styled(Card)`
  position: relative;
  a {
    color: #0f0;
  }
  a:hover {
    color: #f00;
  }
`;
