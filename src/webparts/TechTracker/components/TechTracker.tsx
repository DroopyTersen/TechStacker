import React from "react";
import SPScript from "spscript";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import PortalsThemeProvider from "../../../ui-toolkit/components/PortalsThemeProvider/PortalsThemeProvider";
import App from "../../../appShell/App";
import { removeElement } from "../../../ui-toolkit/core/utils/domUtils";
function TechTracker(props: TechTrackerProps) {
  useSharePointStyleOverrides(props.webpart.displayMode);
  return (
    <PortalsThemeProvider theme={props.webpart.theme}>
      <App />
    </PortalsThemeProvider>
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

let useSharePointStyleOverrides = function(mode: DisplayMode) {
  React.useLayoutEffect(() => {
    let styleTag = document.createElement("style");
    styleTag.innerText = css;
    styleTag.id = "sp-overrides";
    if (mode === DisplayMode.Read) {
      styleTag.innerText += displayModeCSS;
    }

    document.head.appendChild(styleTag);
    return () => {
      removeElement(document.getElementById("sp-overrides"));
    };
  }, []);
};

let displayModeCSS = `

.SPPageChrome-app .commandBarWrapper {
  display:none;
}
`;
let css = `

div.ControlZone {
  margin: 0;
  padding: 0px 20px;
}
.menu-TopNav {
  display:none !important;
}
div[data-automation-id='pageHeader'] {
  display:none;
}
div[data-automationid='SiteHeader'] {
  display:none;
}
.Canvas .CanvasZone {
  padding-right: 0;
}
`;
