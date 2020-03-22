import { useState, useEffect, useMemo, useContext } from "react";
import React from "react";
import useLocation from "./useLocation";

export const navigate = (path: string, data: any = {}) => {
  if (!data.techId) data.techId = "";
  updateUrl({ path, data });
};
export const getQueryStringData = function(): any {
  return location.search
    .slice(1)
    .split("&")
    .filter(Boolean)
    .reduce((data, paramStr) => {
      let [key, value] = paramStr.split("=");
      data[decodeURIComponent(key)] = decodeURIComponent(value) || "";
      return data;
    }, {});
};

export const getRouteFromUrl = function() {
  let qsParams = getQueryStringData();
  return {
    path: qsParams.route || "/",
    data: qsParams,
  } as Route;
};

export const CurrentRouteContext = React.createContext(getRouteFromUrl());

export function useRouter() {
  let currentRoute = useContext(CurrentRouteContext);
  // console.log("TCL: useRouter -> currentRoute", currentRoute);
  return { currentRoute, navigate };
}

function useCurrentRoute(): Route {
  let [route, setRoute] = useState(() => getRouteFromUrl());
  let { search } = useLocation();

  useEffect(() => {
    setRoute(getRouteFromUrl());
  }, [search]);

  return route;
}

export interface Route {
  path: string;
  data: any;
}

// Wrap your components with the Provider, use the data hook to get a value for the provider
export default function Router({ children }) {
  let currentRoute = useCurrentRoute();
  let contextValue = useMemo(() => currentRoute, [JSON.stringify(currentRoute)]);
  let matchFound = false;
  let filteredChildren = React.Children.map(children, (child) => {
    if (!child.props.path) return child;
    let isMatch = currentRoute.path.toLowerCase().indexOf(child.props.path.toLowerCase()) === 0;
    if (isMatch && !matchFound) {
      matchFound = true;
      return child;
    }
    return null;
  });
  return (
    <CurrentRouteContext.Provider value={contextValue}>
      <React.Fragment>{filteredChildren}</React.Fragment>
    </CurrentRouteContext.Provider>
  );
}

const handleLinkClick = (e, path, data) => {
  e.preventDefault();
  navigate(path, data);
};

export function Link({ path = "", className = "", children, data = {} }) {
  return (
    <a href="#" className={className} onClick={(e) => handleLinkClick(e, path, data)}>
      {children}
    </a>
  );
}

// EXAMPLE USAGE
// import React from "react";
// import Router from "./router/Router";
// import ScreenOne from "./screens/ScreenOne";
// import ScreenTwo from "./screens/ScreenTwo";
// import ScreenThree from "./screens/ScreenThree";
// import Nav from "./components/appShell/Nav";

// function App({}) {
//   return (
//       <div className="app">
//         <React.Suspense fallback={<div>Loading...</div>}>
//           <Router>
//             <Nav />
//             <ScreenTwo path="/assets/" />
//             <ScreenThree path="/locations/" />
//             <ScreenOne path="/" />
//             <div>
//               <h2>Footer</h2>
//             </div>
//           </Router>
//         </React.Suspense>
//       </div>
//   );
// }

export const updateUrl = function(route: Route) {
  let mergedData = {
    ...getQueryStringData(),
    route: route.path,
    ...route.data,
  };
  let querystring = Object.keys(mergedData)
    .map((key) => {
      if (!mergedData[key]) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(mergedData[key]);
    })
    .filter(Boolean)
    .join("&");

  updateUrlQueryString(querystring);
};

export const updateUrlQueryString = function(querystring: string) {
  let url = `${location.protocol}//${location.host}${location.pathname}?${querystring}`;
  window.history.pushState({}, "", url);
};
