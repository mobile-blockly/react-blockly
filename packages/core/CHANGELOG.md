# Change Log

All notable changes to this project will be documented in this file.

# [1.3.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.2.0...@react-blockly/core@1.3.0) (2023-12-03)

### Bug Fixes

* fix htmlScript
* fix toolboxConfig

### BREAKING CHANGES

* `workspaceConfiguration` is not required for `init`
* remove `toolboxConfiguration` from `useBlocklyEditor` and `useBlocklyNativeEditor`

```js
const workspaceConfiguration = {
  // ...
  toolbox: toolboxConfiguration,
}

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

# [1.2.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.1.0...@react-blockly/core@1.2.0) (2023-12-01)

### Features

* `workspaceConfiguration, toolboxConfiguration` is not required for `useBlocklyEditor` and `useBlocklyNativeEditor`
* add methods `init, state`

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

# [1.1.0](https://github.com/SerSerch/react-blockly/compare/@react-blockly/core@1.0.1...@react-blockly/core@1.1.0) (2023-11-21)

### Bug Fixes

* fix updateToolboxConfig
* fix type `editorRef: MutableRefObject<any>`

### Features

* add htmlRender
* add htmlStyle
* add htmlScript
* add useBlocklyNativeEditor

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

### BREAKING CHANGES
* remove `workspace, xml, json` from `useBlocklyEditor`

# 1.0.0 (2023-11-20)

### Features

* add importFromXml
* add importFromJson
* add useBlocklyEditor

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

### Code Refactoring

* drop `useEffect, useRef` in `useBlocklyEditor`
