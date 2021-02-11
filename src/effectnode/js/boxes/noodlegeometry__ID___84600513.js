import { IcosahedronBufferGeometry } from "three";
export const box = ({ ...relay }) => {
  let setup = () => {
    relay.pulse({
      geometry: new IcosahedronBufferGeometry(10, 2),
    });
  };

  setup();

  return {
    name: "geo",
  };
};
