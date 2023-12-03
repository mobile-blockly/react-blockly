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

<BlocklyEditor
  workspaceConfiguration={workspaceConfiguration}  // null | Blockly.BlocklyOptions;
  initial={initial}                                // null | string | object;
  onError={onError}                                // null | (error: any) => void;
  onInject={onInject}                              // null | (state: BlocklyStateType) => void;
  onDispose={onDispose}                            // null | (state: BlocklyStateType) => void;
  onChange={onChange}                              // null | (state: BlocklyStateType) => void;
/>
```
