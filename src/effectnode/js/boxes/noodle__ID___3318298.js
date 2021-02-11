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

import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from "three";

export const box = async ({ ...relay }) => {
  let mesh = new Mesh(
    new BoxBufferGeometry(10, 10, 10),
    new MeshStandardMaterial({ color: 0xffffff })
  );

  relay.stream(0, ({ type, group }) => {
    if (type === "add") {
      console.log("install-mesh-to-group");
      group.add(mesh);
    }
    if (type === "remove") {
      console.log("remove-mesh-from-group");
      group.remove(mesh);
    }
  });

  relay.stream(1, ({ geometry }) => {
    mesh.geometry = geometry;
  });
  relay.stream(2, ({ material }) => {
    mesh.material = material;
  });
};
