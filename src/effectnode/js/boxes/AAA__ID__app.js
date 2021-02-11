/*
BoxScripts[box.moduleName].box({
  resources,
  domElement: mounter,
  pulse,
  inputAt,
  log: (v) => {
    console.log(JSON.stringify(v, null, 4));
  },
  graph: lowdb,
});
*/

import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function DynamicRoot({ relay }) {
  let [routes, addRoutes] = useState([]);

  useEffect(() => {
    relay.pulse({
      type: "mount",
      done: (v) => {
        addRoutes((s) => {
          if (v) {
            console.log(v.path);
            return [
              ...s,
              <Route key={`_route_` + v.path} path={v.path}>
                <v.page></v.page>
              </Route>,
            ]
              .slice()
              .sort((a, b) => {
                if (a.key >= b.key) {
                  return -1;
                } else if (b.key < a.key) {
                  return 1;
                } else {
                  return 0;
                }
              });
          } else {
            return [...s];
          }
        });
      },
    });
  }, []);

  return (
    <Router>
      <Switch>{routes}</Switch>
    </Router>
  );
}

export const box = ({ domElement, ...relay }) => {
  ReactDOM.render(<DynamicRoot relay={relay}></DynamicRoot>, domElement);
};
