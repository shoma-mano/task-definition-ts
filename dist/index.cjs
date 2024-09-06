"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  defineTaskDefinition: true
};
exports.defineTaskDefinition = void 0;
var _fs = require("fs");
var _getCallerFile = _interopRequireDefault(require("get-caller-file"));
var _interface = require("./interface.cjs");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defineTaskDefinition = (props, distPath) => {
  console.log("defineTaskDefinition");
  const callerFile = (0, _getCallerFile.default)();
  if (!callerFile) {
    throw new Error("Cannot find caller file");
  }
  distPath = distPath ?? callerFile.replace(".ts", ".json");
  console.log(`Writing to ${distPath}`);
  const json = JSON.stringify(props, null, 2);
  (0, _fs.writeFileSync)(distPath, json);
};
exports.defineTaskDefinition = defineTaskDefinition;