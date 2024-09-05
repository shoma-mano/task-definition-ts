import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      input: "src/",
      format: "esm",
    },
    {
      input: "src/",
      format: "cjs",
      ext: "cjs",
      declaration: true,
    },
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
});
