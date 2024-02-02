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

[BlocklyOptions interface](https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface)

```js
import { BlocklyEditor } from '@react-blockly/web';

// ...

function onChange({xml, json, dart, js, lua, php, python}) {
}

// ...

<BlocklyEditor
  workspaceConfiguration={workspaceConfiguration}  // null | Blockly.BlocklyOptions;
  initial={initial}                                // null | string | object;
  onError={onError}                                // null | (error: any) => void;
  onInject={onInject}                              // null | (state: BlocklyCbStateType) => void;
  onDispose={onDispose}                            // null | (state: BlocklyCbStateType) => void;
  onChange={onChange}                              // null | (state: BlocklyCbStateType) => void;
/>
```
