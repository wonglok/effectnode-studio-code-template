class Shader {
  static share() {
    return /* glsl */ `

    `;
  }
}

/* "shared-spec" */
export const box = ({ ...relay }) => {
  let config = {};
  relay.pulse({
    config,
    Shader,
  });
};
