# Installation

To add @react-blockly/core to a React app that uses npm, run:

```sh
npm install @react-blockly/core
```

To add @react-blockly/core to a React app that uses yarn, run:

```sh
yarn add @react-blockly/core
```

## Usage

```js
import { useBlocklyEditor } from '@react-blockly/core';

// ...

const myEditor = useBlocklyEditor( // type UseBlocklyEditorType;
  workspaceConfiguration,          // Blockly.BlocklyOptions;
  toolboxConfiguration,            // ToolboxDefinition;
  initial,                         // null | string | object;
  platform,                        // null | string; (default 'web')
  onError,                         // null | (error: any) => void;
  onInject,                        // null | (workspace: WorkspaceSvg) => void;
  onDispose,                       // null | (workspace: WorkspaceSvg) => void;
  onChange);                      /** null | (state: {
                                   *    workspace, // WorkspaceSvg
                                   *    xml,       // string
                                   *    json,      // object
                                   *  }) => void;
                                   */

const {
  workspace,                       // WorkspaceSvg | null;
  xml,                             // string | null;
  json,                            // object | null;
  editorRef,                       // MutableRefObject<any>;
  toolboxConfig,                   // ToolboxDefinition;
  updateState,                    /** (cb: (
                                   *    state: BlocklyStateType
                                   *  ) => string | object) => void;
                                   */
  updateToolboxConfig,            /** (cb: (
                                   *    configuration: ToolboxDefinition
                                   *  ) => ToolboxDefinition) => void;
                                   */
} = myEditor;

// render web component
<div className={'my-class'} ref={editorRef}></div>

// or render native component (only for web browsers)
<View style={{flex: 1}} ref={editorRef}/>
```
