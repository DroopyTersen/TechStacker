import React, { useReducer, useEffect } from "react";
import { Tech } from "../data/interfaces";
import useSaveTechForm, { Status } from "./useSaveTechForm";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton, Button } from "office-ui-fabric-react/lib/Button";
import styled from "styled-components";
import CateogoryPicker from "../components/inputs/CategoryPicker";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
const PLACEHOLDER_LOGO =
  "https://myskyline365.sharepoint.com/sites/TechStacker/SiteAssets/__sitelogo__js-dna.png";

export default function TechForm({ initial, onSuccess, onCancel }: TechFormProps) {
  let [saveTech] = useMutation(MUTATION);
  let { item, status, save, update, sync } = useSaveTechForm(initial, async () => {
    if (item.Id) {
      item.Id = parseInt(item.Id + "", 10);
    }
    let { data } = await saveTech({ variables: { tech: item } });
    console.log("SUCCESS", data);
    onSuccess(data.saveTech);
  });
  useEffect(() => {
    sync(initial);
  }, [initial]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMTI", item);
    save();
  };
  return (
    <StyledForm onSubmit={onSubmit}>
      <div className="flex-row flex-end form-actions-top">
        <Button onClick={onCancel}>Cancel</Button>
        <PrimaryButton disabled={status !== Status.Valid} type="submit">
          Save
        </PrimaryButton>
      </div>
      <Textbox name="Title" item={item} update={update} required />
      <Textbox name="Link" item={item} update={update} />
      <div className="logo-preview">
        <img src={item.Logo || PLACEHOLDER_LOGO} />
      </div>
      <Textbox name="Logo" item={item} update={update} />

      <Textbox name="Tagline" item={item} update={update} multiline />
      <Textbox name="Tags" item={item} update={update} description="Comma delimited list of tags" />
      <div className="form-control">
        <CateogoryPicker value={item.CategoryId} onChange={(id) => update("CategoryId", id)} />
      </div>
      <Textbox
        name="Description"
        item={item}
        update={update}
        multiline
        autoAdjustHeight
        placeholder={`## Write in Markdown
        
**Pros**
      
- Thing One
- Thing Two

**Cons**

- Thing One
- Thing Two`}
      />
      <div className="flex-row flex-end form-actions-bottom">
        <Button onClick={onCancel}>Cancel</Button>
        <PrimaryButton disabled={status !== Status.Valid} type="submit">
          Save
        </PrimaryButton>
      </div>
    </StyledForm>
  );
}

function Textbox({ name, item, update, label = "", ...rest }) {
  let val = item[name] || "";
  return (
    <div className="form-control">
      <TextField
        name={name}
        label={label || name}
        value={val}
        onChange={(e, newVal) => update(name, newVal)}
        {...rest}
      />
    </div>
  );
}

const StyledForm = styled.form`
  position: relative;
  max-width: 600px;
  /* margin-top: -55px; */
  .form-control {
    margin-bottom: 12px;
  }
  .logo-preview {
    text-align: center;
    img {
      max-width: 100%;
      height: 120px;
    }
  }
  @media only screen and (min-width: 640px) {
    .form-actions-top {
      position: absolute;
      display: inline-block;
      top: -55px;
      right: 0;
      margin-bottom: 20px;
    }
  }
`;

interface TechFormProps {
  initial: Tech;
  onSuccess: (item: Tech) => void;
  onCancel: () => void;
}

const MUTATION = gql`
  mutation SaveTech($tech: SaveTechInput) {
    saveTech(tech: $tech) {
      Id
    }
  }
`;
