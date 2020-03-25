import React from "react";
import { Category } from "../data/interfaces";
import styled from "styled-components";
import Thumbnail from "../ui-toolkit/components/primitives/Thumbnail";
import BackgroundImage from "../ui-toolkit/components/primitives/BackgroundImage";
import Grid from "../ui-toolkit/components/Grid/Grid";
import TechCard from "./TechCard";
import { useTechFilter } from "./TechFilterContext";
import { filterTech } from "../data/dataUtils";

function TechCategory({ category }: TechCategoryProps) {
  console.log("TechCategory -> TechCategory", category.Title);
  let { filter } = useTechFilter();
  let technologies = filterTech(category.technologies, filter);
  if (!technologies.length) return null;
  return (
    <StyledContainer>
      <div className="category-header">
        {/* <Thumbnail width="60px" shape="circle">
          <BackgroundImage src={category.Icon} />
        </Thumbnail> */}
        <h2 id={category.slug}>{category.Title}</h2>
      </div>

      {!!technologies.length && (
        <Grid size={"350px"}>
          {technologies.map((tech) => (
            <TechCard key={tech.Id} tech={tech} />
          ))}
        </Grid>
      )}
      {!technologies.length && <div>No results</div>}
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
  .category-header {
    display: flex;
    align-items: center;
    h2 {
      /* Workaround to get the scroll to anchor tags to work */
      margin-top: -75px;
      padding-top: 75px;
    }
    margin-bottom: 20px;
    > * {
      margin-right: 20px;
    }
  }
`;
