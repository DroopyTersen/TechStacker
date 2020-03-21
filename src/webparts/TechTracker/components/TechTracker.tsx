import React from "react";
import SPScript from "spscript";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import PortalsThemeProvider from "../../../ui-toolkit/components/PortalsThemeProvider/PortalsThemeProvider";
import ApolloSetup from "./ApolloSetup";

function TechTracker(props: TechTrackerProps) {
  return (
    <ApolloSetup>
      <PortalsThemeProvider theme={props.webpart.theme}>
        <WebPartTitle
          {...props.webpart}
          updateProperty={(val) => props.webpart.updateProperty("title", val)}
        />
      </PortalsThemeProvider>
    </ApolloSetup>
  );
}
export default React.memo(TechTracker);

export interface TechTrackerProps {
  webpart: {
    title: string;
    displayMode: DisplayMode;
    updateProperty: (key: string, value: string) => void;
    webUrl: string;
    theme: IReadonlyTheme;
  };
}
