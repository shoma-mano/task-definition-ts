# task-definition-ts

A TypeScript-based ecs task definition generator.

![alt text](https://raw.githubusercontent.com/shoma-mano/task-definition-ts/main/image.png)

## Installation

```bash
pnpm add -D task-definition-ts
```

## Usage

1. Create an `taskdefinition.ts` file.

```typescript
import { defineTaskDefinition } from "task-definition-ts";

defineTaskDefinition(
  {
    // Your task definition goes here
  },
  // The default output directory is the same as where this file is located
  "path/to/taskdefinition",
);
```

2. Run the script to generate taskdefinition.json

```bash
npx tsx taskdefenition.ts
```

# Contributing

This package generates AWS ECS Task Definitions using TypeScript. Please note that the types used in this project were auto-generated by giving docs info to AI, so there might be some inaccuracies or missing definitions.

If you find any issues or improvements, feel free to open a pull request (PR) to help us improve the package.
