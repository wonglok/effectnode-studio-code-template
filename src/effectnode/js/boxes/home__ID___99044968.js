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

// import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Color, PMREMGenerator, sRGBEncoding, UnsignedByteType } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "@react-three/drei";

function Background({ onUserData }) {
  let { scene, gl } = useThree();

  useEffect(() => {
    return onUserData(({ bgColor }) => {
      scene.background = new Color(bgColor || "#000000");
    });
  }, []);

  useEffect(() => {
    let hdri = require("../../assets/room.hdr").default;
    const pmremGenerator = new PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader()
      .setDataType(UnsignedByteType) // alt: FloatType, HalfFloatType
      .load(hdri, (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        envMap.encoding = sRGBEncoding;
        scene.environment = envMap;
        // scene.background = envMap;
      });
  }, []);

  return <group></group>;
}

function EffectNode({ relay, ...props }) {
  let [element, mountElement] = useState([]);

  useEffect(() => {
    relay.pulse({
      type: "mount",
      done: (newItem) => {
        mountElement((s) => {
          return [...s, newItem];
        });
      },
    });
  }, []);

  return <group {...props}>{element}</group>;
}

export const box = (relay) => {
  // console.log(relay);
  relay.stream(0, ({ type, done }) => {
    if (type === "mount") {
      done({
        path: "/",
        page: () => (
          <Canvas
            colorManagement={true}
            pixelRatio={window.devicePixelRatio || 1.0}
            camera={{ position: [0, 0, -50] }}
            onCreated={({ gl }) => {
              gl.outputEncoding = sRGBEncoding;
            }}
          >
            <EffectNode relay={relay}></EffectNode>
            <Background onUserData={relay.onUserData}></Background>
            {/* <ProcedralElements relay={relay}></ProcedralElements> */}
            <OrbitControls />
            <ambientLight intensity={1.0} />
          </Canvas>
        ),
      });
      /*

        */
    }
  });
};
