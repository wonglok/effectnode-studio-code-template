/* "procedral" */
import React, { useRef, useEffect } from "react";

function ProcedralElements({ relay }) {
  const ref = useRef();

  useEffect(() => {
    relay.pulse({
      type: "add",
      group: ref.current,
    });

    return () => {
      relay.pulse({
        type: "remove",
        group: ref.current,
      });
    };
  });

  return <group ref={ref}></group>;
}

export const box = async ({ ...relay }) => {
  relay.stream(0, ({ type, done }) => {
    if (type === "mount") {
      done(<ProcedralElements key={"box"} relay={relay}></ProcedralElements>);
    }
  });
};
