# Installation

To add @react-blockly/web to a React web app that uses npm, run:

```sh
npm install @react-blockly/web
```

To add @react-blockly/web to a React web app that uses yarn, run:

```sh
yarn add @react-blockly/web
```

## Usage

```js
import { BlocklyEditor } from '@react-blockly/web';

// ...

<BlocklyEditor
  workspaceConfiguration={workspaceConfiguration} // Blockly.BlocklyOptions;
  toolboxConfiguration={toolboxConfiguration}     // ToolboxDefinition;
  initial={initial}                               // null | string | object;
/>
```
