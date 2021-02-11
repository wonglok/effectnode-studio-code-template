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
//
import { Mesh } from "three";

export const box = async ({ ...relay }) => {
  let mesh = new Mesh();

  relay.clean(() => {
    if (mesh.geometry && mesh.geometry.dispose) {
      mesh.geometry.dispose();
    }
    if (mesh.material && mesh.material.dispose) {
      mesh.material.dispose();
    }
    if (mesh.dispose) {
      mesh.dispose();
    }
  });

  relay.stream(0, ({ geometry }) => {
    mesh.geometry = geometry;
  });

  relay.stream(1, ({ material }) => {
    mesh.material = material;
  });

  relay.stream(2, ({ type, group }) => {
    if (type === "add") {
      group.add(mesh);
    }
    if (type === "remove") {
      group.remove(mesh);
    }
  });
};
