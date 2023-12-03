# Installation

To add @react-blockly/native to a React native app that uses npm, run:

```sh
npm install @react-blockly/native
```

To add @react-blockly/native to a React native app that uses yarn, run:

```sh
yarn add @react-blockly/native
```

To add @react-blockly/native to an Expo Go app that uses expo, run:

```sh
expo install @react-blockly/native
```

## Usage

[BlocklyOptions interface](https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface)

```js
import { BlocklyEditor } from '@react-blockly/native';

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
