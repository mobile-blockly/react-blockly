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

[BlocklyOptions interface](https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface)

```js
import { useBlocklyEditor } from '@react-blockly/core';

// ...

function onChange({xml, json, dart, js, lua, php, python}) {
}

const myEditor = useBlocklyEditor( // type UseBlocklyEditorType;
  workspaceConfiguration,          // null | Blockly.BlocklyOptions;
  initial,                         // null | string | object;
  platform,                        // null | string; (default 'web')
  onError,                         // null | (error: any) => void;
  onInject,                        // null | (state: BlocklyCbStateType) => void;
  onDispose,                       // null | (state: BlocklyCbStateType) => void;
  onChange,                        // null | (state: BlocklyCbStateType) => void;
);

const {
  editorRef,                       // MutableRefObject<any>;
  init,                            // (params?: null | BlocklyInitType) => void;
  dispose,                         // () => void;
  state,                           // () => BlocklyStateType;
  code,                            // () => BlocklyCodeType;
  updateState,                    /** (cb: (
                                   *    state: BlocklyStateType
                                   *  ) => object) => void;
                                   */
  updateToolboxConfig,            /** (cb: (
                                   *    configuration: ToolboxDefinition
                                   *  ) => ToolboxDefinition) => void;
                                   */
} = myEditor;

useEffect(() => {
  init();

  return () => {
    dispose();
  };
}, []);

// render web component
<div className={'my-class'} ref={editorRef}></div>

// or render native component (only for web browsers)
<View style={{flex: 1}} ref={editorRef}/>
```
<br/>

### Only for react native [WebView](https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md)

[BlocklyOptions interface](https://developers.google.com/blockly/reference/js/blockly.blocklyoptions_interface)

```js
import { WebView } from 'react-native-webview';
import { useBlocklyNativeEditor } from '@react-blockly/core';

// ...

function onChange({xml, json, dart, js, lua, php, python}) {
}

const myEditor = useBlocklyNativeEditor( // type UseBlocklyNativeEditorType;
  workspaceConfiguration,          // null | Blockly.BlocklyOptions;
  initial,                         // null | string | object;
  platform,                        // null | string; (default 'ios')
  onError,                         // null | (error: any) => void;
  onInject,                        // null | (state: BlocklyCbStateType) => void;
  onDispose,                       // null | (state: BlocklyCbStateType) => void;
  onChange,                        // null | (state: BlocklyCbStateType) => void;
);

const {
  editorRef,                       // MutableRefObject<any>;
  init,                            // (params?: null | BlocklyInitType) => void;
  dispose,                         // () => void;
  state,                           // () => BlocklyStateType;
  code,                            // () => BlocklyCodeType;
  htmlRender,                      // (params?: HtmlRenderType) => string;
  onMessage,                       // (e: WebViewMessageEvent) => void;
  postData,                        // (event: string, data?: any) => void;
  runJS,                           // (code: string) => void;
  updateState,                    /** (cb: (
                                   *    state: BlocklyStateType
                                   *  ) => object) => void;
                                   */
  updateToolboxConfig,            /** (cb: (
                                   *    configuration: ToolboxDefinition
                                   *  ) => ToolboxDefinition) => void;
                                   */
} = myEditor;

useEffect(() => {
  return () => {
    dispose();
  };
}, []);

// render only for native WebView component
<WebView
  style={{ flex: 1 }}
  ref={editorRef}
  originWhitelist={['*']}
  source={{
    html: htmlRender(),
  }}
  onMessage={onMessage}
  onLoadEnd={() => init()}
/>
```
