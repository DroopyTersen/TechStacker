import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Category } from "../../data/interfaces";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  let { data } = useQuery<{ categories: Category[] }>(QUERY);

  let options = [];
  if (data && data.categories) {
    // options = data.categories.map((c) => ({ key: c.Id + "", text: c.Title }));
    options = data.categories.map((c) => ({
      key: c.Id + "",
      text: c.Title,
      imageSrc: c.Icon,
      selectedImageSrc: c.Icon,
      imageSize: { width: "70px", height: "70px" },
    }));
  }

  return (
    <ChoiceGroup
      required
      options={options}
      label="Category"
      selectedKey={value + ""}
      placeholder="Choose a category"
      onChange={(e, option: any) => onChange(parseInt(option.key + "", 10))}
    />
  );
}

export default React.memo(CategoryPicker);

export interface CategoryPickerProps {
  value: number;
  onChange: (categoryId: number) => void;
}
const QUERY = gql`
  query GetCategoryOptions {
    categories {
      Id
      Title
      Icon
    }
  }
`;
