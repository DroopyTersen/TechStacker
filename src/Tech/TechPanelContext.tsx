import React, { useState, useEffect, useMemo, useContext } from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import TechDetails from "./TechDetails";
import TechFormScreen from "./TechFormScreen";
const defaultValue: TechPanel = {
  isOpen: false,
  open: (val) => {
    console.log("I sholdn't be here");
  },
  techId: null,
  close: () => {},
  mode: "display",
};

const TechPanelContext = React.createContext(defaultValue);

export function TechDetailsPanel({ children }) {
  let [isOpen, setIsOpen] = useState(false);
  let [techId, setTechId] = useState(null);
  let [mode, setMode] = useState("display");
  const open = (id) => {
    setTechId(id);
    setIsOpen(true);
    console.log("open -> id", id);
  };
  const close = () => {
    setTechId(null);
    setIsOpen(false);
    setMode("display");
  };
  return (
    <TechPanelContext.Provider value={{ isOpen, open, close, techId, mode }}>
      {children}
      <Panel isOpen={isOpen} onDismiss={() => close()} type={PanelType.large} isLightDismiss={true}>
        {mode === "display" && <TechDetails techId={techId} onEdit={() => setMode("edit")} />}
        {mode === "edit" && (
          <TechFormScreen
            techId={techId}
            onCancel={() => setMode("display")}
            onSuccess={() => setMode("display")}
          />
        )}
      </Panel>
    </TechPanelContext.Provider>
  );
}

export function useTechDetailsPanel() {
  return useContext(TechPanelContext);
}

export interface TechPanel {
  isOpen: boolean;
  techId: number;
  mode: string;
  open: (techId: number) => void;
  close: () => void;
}
