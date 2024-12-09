'use strict';

const fs = require('fs');

const getCallerFile = () => {
  const position = 2;
  if (position >= Error.stackTraceLimit) {
    throw new TypeError(
      "getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `" + position + "` and Error.stackTraceLimit was: `" + Error.stackTraceLimit + "`"
    );
  }
  const oldPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack2) {
    return stack2;
  };
  const stack = new Error().stack;
  Error.prepareStackTrace = oldPrepareStackTrace;
  if (stack) {
    if (stack[1].getFileName() === stack[2].getFileName())
      return stack?.[3].getFileName().replace("file://", "");
    return stack[position] ? stack[position].getFileName().replace("file://", "") : void 0;
  }
};

const defineTaskDefinition = (props, distPath) => {
  console.log("defineTaskDefinition");
  const callerFile = getCallerFile();
  if (!callerFile) {
    throw new Error("Cannot find caller file");
  }
  distPath = distPath ?? callerFile.replace(".ts", ".json");
  console.log(`Writing to ${distPath}`);
  const json = JSON.stringify(props, null, 2);
  fs.writeFileSync(distPath, json);
};

exports.defineTaskDefinition = defineTaskDefinition;
