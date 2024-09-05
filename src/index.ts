import { basename, join } from "path";
import type { ECSTaskDefinition } from "./interface";
import { writeFileSync } from "fs";

export const defineTaskDefinition = (
  props: ECSTaskDefinition,
  distPath?: string,
) => {
  const fileName = basename(__filename).replace(".ts", ".json");
  distPath = distPath ?? join(__dirname, fileName);
  const json = JSON.stringify(props, null, 2);
  writeFileSync(distPath, json);
};
