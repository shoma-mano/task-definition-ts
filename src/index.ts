import type { ECSTaskDefinition } from "./interface";
import { writeFileSync } from "fs";
import getCallerFile from "get-caller-file";
export const defineTaskDefinition = (
  props: ECSTaskDefinition,
  distPath?: string,
) => {
  const callerFile = getCallerFile();
  if (!callerFile) {
    throw new Error("Cannot find caller file");
  }
  distPath = distPath ?? (callerFile.replace(".ts", ".json") as string);
  const json = JSON.stringify(props, null, 2);
  writeFileSync(distPath, json);
};
