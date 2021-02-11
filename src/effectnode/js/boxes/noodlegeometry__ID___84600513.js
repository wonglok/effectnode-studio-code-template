import { IcosahedronBufferGeometry } from "three";
export const box = ({ pulse, onUserData }) => {
  pulse({
    geometry: new IcosahedronBufferGeometry(10, 2),
  });

  return {
    name: "geo",
  };
};
