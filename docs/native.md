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

```js
import { BlocklyEditor } from '@react-blockly/native';

// ...

<BlocklyEditor
  workspaceConfiguration={workspaceConfiguration} // type UseBlocklyEditorType;
  toolboxConfiguration={toolboxConfiguration}     // ToolboxDefinition;
  initial={initial}                               // null | string | object;
/>
```
