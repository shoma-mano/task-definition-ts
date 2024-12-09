'use strict';

const fs = require('fs');
const callerPath = require('caller-path');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const callerPath__default = /*#__PURE__*/_interopDefaultCompat(callerPath);

const defineTaskDefinition = (props, distPath) => {
  console.log("defineTaskDefinition");
  const callerFile = callerPath__default();
  if (!callerFile) {
    throw new Error("Cannot find caller file");
  }
  distPath = distPath ?? callerFile.replace(".ts", ".json");
  console.log(`Writing to ${distPath}`);
  const json = JSON.stringify(props, null, 2);
  fs.writeFileSync(distPath, json);
};

exports.defineTaskDefinition = defineTaskDefinition;
