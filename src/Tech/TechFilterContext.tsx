import React, { useState, useEffect, useMemo, useContext } from "react";

const defaultValues: TechFilter = {
  // DefaultValues
  filter: "",
  setFilter: (val) => {},
};

const TechFilterContext = React.createContext(defaultValues);

export function TechFilterProvider({ children }) {
  let [filter, setFilter] = useState("");
  return (
    <TechFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </TechFilterContext.Provider>
  );
}

export function useTechFilter() {
  return useContext(TechFilterContext);
}

export interface TechFilter {
  filter: string;
  setFilter: (string) => void;
}
