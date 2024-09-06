import { writeFileSync } from "fs";
import getCallerFile from "get-caller-file";
export const defineTaskDefinition = (props, distPath) => {
  console.log("defineTaskDefinition");
  const callerFile = getCallerFile();
  if (!callerFile) {
    throw new Error("Cannot find caller file");
  }
  distPath = distPath ?? callerFile.replace(".ts", ".json");
  console.log(`Writing to ${distPath}`);
  const json = JSON.stringify(props, null, 2);
  writeFileSync(distPath, json);
};
export * from "./interface.mjs";
