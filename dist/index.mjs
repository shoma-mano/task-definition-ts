import { writeFileSync } from 'fs';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

// Call this function in a another function to find out the file from
// which that function was called from. (Inspects the v8 stack trace)
//
// Inspired by http://stackoverflow.com/questions/13227489
var getCallerFile = function getCallerFile(position) {
    if (position === void 0) { position = 2; }
    if (position >= Error.stackTraceLimit) {
        throw new TypeError('getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `' + position + '` and Error.stackTraceLimit was: `' + Error.stackTraceLimit + '`');
    }
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var stack = new Error().stack;
    Error.prepareStackTrace = oldPrepareStackTrace;
    if (stack !== null && typeof stack === 'object') {
        // stack[0] holds this file
        // stack[1] holds where this function was called
        // stack[2] holds the file we're interested in
        return stack[position] ? stack[position].getFileName() : undefined;
    }
};


const getCallerFile$1 = /*@__PURE__*/getDefaultExportFromCjs(getCallerFile);

const defineTaskDefinition = (props, distPath) => {
  console.log("defineTaskDefinition");
  const callerFile = getCallerFile$1();
  if (!callerFile) {
    throw new Error("Cannot find caller file");
  }
  distPath = distPath ?? callerFile.replace(".ts", ".json");
  console.log(`Writing to ${distPath}`);
  const json = JSON.stringify(props, null, 2);
  writeFileSync(distPath, json);
};

export { defineTaskDefinition };
