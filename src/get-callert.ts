export const getCallerFile = () => {
  const position = 2;
  if (position >= Error.stackTraceLimit) {
    throw new TypeError(
      "getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `" +
        position +
        "` and Error.stackTraceLimit was: `" +
        Error.stackTraceLimit +
        "`",
    );
  }
  const oldPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  const stack = new Error().stack as any;
  Error.prepareStackTrace = oldPrepareStackTrace;
  if (stack) {
    if (stack[1].getFileName() === stack[2].getFileName())
      return stack?.[3].getFileName().replace("file://", "");
    return stack[position]
      ? (stack[position] as any).getFileName().replace("file://", "")
      : undefined;
  }
};
