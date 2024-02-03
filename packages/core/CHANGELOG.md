# Change Log

All notable changes to this project will be documented in this file.

# [1.7.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.6.0...@react-blockly/core@1.7.0) (2024-02-03)

### Features

* add js eval event
* add native runJS method

<details><summary>Click to see the code</summary>

```js
const myEditor = useBlocklyNativeEditor();

myEditor.runJS('alert(editor.state().xml)');
```

</details>

# [1.6.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.5.0...@react-blockly/core@1.6.0) (2024-02-02)

### Features

* add BlocklyCodeType
* add htmlPackages
* add postData method
* add code method

<details><summary>Click to see the code</summary>

```js
const myEditor = useBlocklyEditor({
  onChange,
});

const {
  editorRef,
  init,
  dispose,
  state,              // () => BlocklyStateType;
  code,               // () => BlocklyCodeType;
} = myEditor;

const myNativeEditor = useBlocklyNativeEditor({
  onChange,
});

const {xml, json} = state();
const {dart, js, lua, php, python} = code();

function onChange({xml, json, dart, js, lua, php, python}) {
}
```

```js
const myEditor = useBlocklyNativeEditor({
  onChange,
});

const {
  editorRef,
  init,
  dispose,
  state,              // () => BlocklyStateType;
  code,               // () => BlocklyCodeType;
  postData,           // (event: string, data?: any) => void;
} = myEditor;

const {xml, json} = state();
const {dart, js, lua, php, python} = code();

function onChange({xml, json, dart, js, lua, php, python}) {
}
```

</details>

# [1.5.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.4.0...@react-blockly/core@1.5.0) (2023-12-19)

### Features

* add htmlEditor
* add nullToUndefined - null safety

# [1.4.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.3.0...@react-blockly/core@1.4.0) (2023-12-04)

### Bug Fixes

* fix `init`

### Features

* add method `dispose`

<details><summary>Click to see the code</summary>

```js
const {
  editorRef,
  init,
  dispose,
} = useBlocklyEditor({
  // it is not required
  workspaceConfiguration,
  initial,
});

useEffect(() => {
  init({
    // if you need to override
    workspaceConfiguration: newWorkspaceConfig,
    initial: newInitial,
  });

  return () => {
    dispose();
  };
}, []);
```

</details>

### BREAKING CHANGES

* remove `onLoadEnd` from `useBlocklyNativeEditor`
* remove `auto init` from `useBlocklyEditor` and `useBlocklyNativeEditor`

# [1.3.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.2.0...@react-blockly/core@1.3.0) (2023-12-03)

### Bug Fixes

* fix htmlScript
* fix toolboxConfig

### BREAKING CHANGES

* `workspaceConfiguration` is not required for `init`
* remove `toolboxConfiguration` from `useBlocklyEditor` and `useBlocklyNativeEditor`

<details><summary>Click to see the code</summary>

```js
const workspaceConfiguration = {
  // ...
  toolbox: toolboxConfiguration,
};

const {
  editorRef,
  init,
  state,
} = useBlocklyEditor({
  workspaceConfiguration,
  initial,
});

// or if you need to do init later
useEffect(() => {
  init({
    workspaceConfiguration,
    initial,
  });
}, []);
```

</details>

# [1.2.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.1.0...@react-blockly/core@1.2.0) (2023-12-01)

### Features

* `workspaceConfiguration, toolboxConfiguration` is not required for `useBlocklyEditor` and `useBlocklyNativeEditor`
* add methods `init, state`

<details><summary>Click to see the code</summary>

```js
const {
  editorRef,
  init,
  state,
} = useBlocklyEditor({
  workspaceConfiguration,
  toolboxConfiguration,
  initial,
});

// or if you need to do init later
useEffect(() => {
  init({
    workspaceConfiguration,
    toolboxConfiguration,
    initial,
  });
}, []);
```

</details>

# [1.1.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.0.1...@react-blockly/core@1.1.0) (2023-11-21)

### Bug Fixes

* fix updateToolboxConfig
* fix type `editorRef: MutableRefObject<any>`

### Features

* add htmlRender
* add htmlStyle
* add htmlScript
* add useBlocklyNativeEditor

<details><summary>Click to see the code</summary>

```js
const myEditor = useBlocklyNativeEditor({
  workspaceConfiguration,
  toolboxConfiguration,
  initial,
  onError,
  onInject,
  onChange,
  onDispose,
  platform,
});

const {
  editorRef,
  updateToolboxConfig,
  updateState,
  onMessage,
  onLoadEnd,
  htmlRender,
} = myEditor;
```

</details>

### BREAKING CHANGES
* remove `workspace, xml, json` from `useBlocklyEditor`

# 1.0.0 (2023-11-20)

### Features

* add importFromXml
* add importFromJson
* add useBlocklyEditor

<details><summary>Click to see the code</summary>

```js
const myEditor = useBlocklyEditor({
  workspaceConfiguration,
  toolboxConfiguration,
  initial,
  onError,
  onInject,
  onChange,
  onDispose,
  platform,
});

const {
  workspace,
  xml,
  json,
  editorRef,
  toolboxConfig,
  updateToolboxConfig,
  updateState,
} = myEditor;
```

</details>

### Code Refactoring

* drop `useEffect, useRef` in `useBlocklyEditor`
