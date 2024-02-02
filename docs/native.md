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
npx expo install @react-blockly/native
```

## Usage

[BlocklyOptions interface](https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface)

```js
import { BlocklyEditor } from '@react-blockly/native';

// ...

function onChange({xml, json, dart, js, lua, php, python}) {
}

// ...

<BlocklyEditor
  style={{backgroundColor: '#fff'}}                // null | object | Array<object>
  workspaceConfiguration={workspaceConfiguration}  // null | Blockly.BlocklyOptions;
  initial={initial}                                // null | string | object;
  onError={onError}                                // null | (error: any) => void;
  onInject={onInject}                              // null | (state: BlocklyCbStateType) => void;
  onDispose={onDispose}                            // null | (state: BlocklyCbStateType) => void;
  onChange={onChange}                              // null | (state: BlocklyCbStateType) => void;
/>
```
