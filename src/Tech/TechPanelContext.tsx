import React, { useState, useEffect, useMemo, useContext } from "react";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import TechDetails from "./TechDetails";
const defaultValue: TechPanel = {
  isOpen: false,
  open: (val) => {
    console.log("I sholdn't be here");
  },
  techId: null,
  close: () => {},
};

const TechPanelContext = React.createContext(defaultValue);

export function TechDetailsPanel({ children }) {
  let [isOpen, setIsOpen] = useState(false);
  let [techId, setTechId] = useState(null);
  const open = (id) => {
    setTechId(id);
    setIsOpen(true);
    console.log("open -> id", id);
  };
  const close = () => {
    setTechId(null);
    setIsOpen(false);
  };
  return (
    <TechPanelContext.Provider value={{ isOpen, open, close, techId }}>
      {children}
      <Panel
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        type={PanelType.large}
        isLightDismiss={true}
      >
        <TechDetails id={techId} />
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
  open: (techId: number) => void;
  close: () => void;
}
