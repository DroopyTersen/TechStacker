import React from "react";
import { Category } from "../data/interfaces";
import styled from "styled-components";
import Thumbnail from "../ui-toolkit/components/primitives/Thumbnail";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
import Grid from "../ui-toolkit/components/Grid/Grid";
import TechCard from "./TechCard";

function TechCategory({ category }: TechCategoryProps) {
  return (
    <StyledContainer>
      <div className="header">
        {/* <Thumbnail width="60px" shape="circle">
          <BackgroundImage src={category.Icon} />
        </Thumbnail> */}
        <h2 id={category.slug}>{category.Title}</h2>
      </div>
      <Grid size={"300px"}>
        {category.technologies.map((tech) => (
          <TechCard tech={tech} />
        ))}
      </Grid>
    </StyledContainer>
  );
}

export default React.memo(TechCategory);

export interface TechCategoryProps {
  category: Category;
}

const StyledContainer = styled.div`
  position: relative;
  padding: 20px 0;
  /* border-bottom: 1px solid #eee; */
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > * {
      margin-right: 20px;
    }
  }
`;
