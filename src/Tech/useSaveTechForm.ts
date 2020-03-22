import React, { useReducer, useEffect } from "react";
import { Tech } from "../data/interfaces";
import { useLinkPreview } from "../data/linkPreview";

export enum Status {
  LoadingLinkPreview = "loading-link-preview",
  Incomplete = "incomplete",
  Valid = "valid",
  Saving = "saving",
  Error = "error",
  Success = "success",
}

interface State {
  item: Tech;
  status: Status;
}

const getDefaultState = (initial: Tech) => {
  return {
    item: initial,
    status: validate(initial) ? Status.Valid : Status.Incomplete,
  };
};
const validate = (item: Tech) => {
  return item.Title && item.CategoryId;
};

function reducer(state: State, action: any): State {
  let item: Tech = null;
  switch (action.type) {
    case "link-preview-start":
      return {
        ...state,
        status: Status.LoadingLinkPreview,
      };
    case "link-preview-success":
      console.log("Link Preview", action.linkPreview);
      item = {
        ...state.item,
        Tagline: state.item.Tagline || action.linkPreview.description || action.linkPreview.title,
        Logo: state.item.Logo || action.linkPreview.image,
        Title: state.item.Title || action.linkPreview.title,
      };
      return {
        ...state,
        item,
        status: validate(item) ? Status.Valid : Status.Incomplete,
      };
    case "link-preview-error":
      return {
        ...state,
        item: state.item,
        status: validate(state.item) ? Status.Valid : Status.Incomplete,
      };
    case "update":
      item = {
        ...state.item,
        [action.key]: action.value,
      };
      return {
        ...state,
        item,
        status: validate(item) ? Status.Valid : Status.Incomplete,
      };
    case "sync":
      console.log("SYNC", action.item);
      item = {
        ...action.item,
        ...state.item,
      };
      return {
        ...state,
        item,
        status: validate(item) ? Status.Valid : Status.Incomplete,
      };
    case "save-start":
      return {
        ...state,
        status: Status.Saving,
      };
    case "save-success":
      return {
        ...state,
        item: {
          ...state.item,
          ...action.item,
        },
        status: Status.Valid,
      };
    case "save-error":
      return {
        ...state,
        status: Status.Error,
      };
  }
}

export interface FormProps {
  initial: Tech;
}
export default function useSaveTechForm(initial: Tech, onSave: (item: Tech) => Promise<any>) {
  let [state, dispatch] = useReducer(reducer, getDefaultState(initial));

  useLinkPreview(state.item.Link, {
    onStart: () => dispatch({ type: "link-preview-start" }),
    onError: () => dispatch({ type: "link-preview-error" }),
    onSuccess: (linkPreview) => dispatch({ type: "link-preview-success", linkPreview }),
    // skipCheck: () => !!state.item.Logo || !!state.item.Tagline,
  });

  const save = async () => {
    console.log("Save Called", state);
    if (state.status === Status.Valid) {
      dispatch({ type: "save-start" });
    }
    try {
      let result = await onSave(state.item);
      console.log("save -> result", result);
      dispatch({ type: "save-sucess" });
      return result;
    } catch (error) {
      console.log("Save Error", error);
      dispatch({ type: "save-error", error });
    }
  };

  return {
    ...state,
    update: (key: string, value: any) => dispatch({ type: "update", key, value }),
    save,
    sync: (item: Tech) => dispatch({ type: "sync", item }),
  };
}
