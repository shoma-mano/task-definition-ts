import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      input: "src/index.ts",
    },
  ],
  declaration: true,
  rollup: {
    resolve: {},
    commonjs: {},
    emitCJS: true,
    esbuild: {},
  },
  failOnWarn: false,
});
