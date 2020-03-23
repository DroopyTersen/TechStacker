import React from "react";
import { useRouter } from "../appShell/router/Router";
import TechForm from "./TechForm";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { Tech } from "../data/interfaces";
import { IconButton } from "office-ui-fabric-react/lib/Button";

export default function TechFormScreen({ techId, onCancel, onSuccess }: TechFormScreen) {
  let {
    currentRoute: { data: qsParams },
    navigate,
  } = useRouter();
  let link = qsParams.Link || "";

  let Id = techId || qsParams.techId || null;
  let { data, error, loading } = useQuery<{ tech: Tech }>(QUERY, {
    variables: { id: parseInt(Id + "", 10) },
  });

  let initial: any = {
    Title: "",
    Link: link,
  };

  if (data && data.tech) {
    initial = data.tech;
  }
  let screenTitle = initial.Id ? "Edit Tech" : "Add New Tech";
  console.log("initial", initial);
  onSuccess = onSuccess || ((item) => navigate("/tech", { techId: item.Id }));
  return (
    <div>
      <div className="flex-row flex-start">
        {onCancel && (
          <IconButton iconProps={{ iconName: "Back" }} onClick={onCancel} title="Back" />
        )}
        <h1>{screenTitle}</h1>
      </div>
      <TechForm
        onCancel={onCancel || (() => navigate("/tech"))}
        onSuccess={onSuccess}
        key={initial.Id}
        initial={initial}
      />
    </div>
  );
}

export interface TechFormScreen {
  path?: string;
  techId?: number;
  onSuccess?: (item: Tech) => void;
  onCancel?: () => void;
}

const QUERY = gql`
  query GetTechForm($id: Int!) {
    tech(id: $id) {
      Id
      Title
      Description
      Link
      Logo
      Tagline
      Tags
      CategoryId
    }
  }
`;
