import { writeFileSync } from 'fs';
import callerPath from 'caller-path';

const defineTaskDefinition = (props, distPath) => {
  console.log("defineTaskDefinition");
  const callerFile = callerPath();
  if (!callerFile) {
    throw new Error("Cannot find caller file");
  }
  distPath = distPath ?? callerFile.replace(".ts", ".json");
  console.log(`Writing to ${distPath}`);
  const json = JSON.stringify(props, null, 2);
  writeFileSync(distPath, json);
};

export { defineTaskDefinition };
