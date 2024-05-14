import { useRef } from 'react';

import * as Blockly from 'blockly';
import type { WebViewMessageEvent } from 'react-native-webview';

import {
  htmlEditor,
  htmlPackages,
  htmlRender,
  htmlScript,
  htmlStyle,
} from './html';
import type {
  BlocklyCbStateType,
  BlocklyCodeType,
  BlocklyInitType,
  BlocklyNativeInfoType,
  BlocklyNewStateType,
  BlocklyStateType,
  HtmlRenderType,
  UseBlocklyNativeEditorType,
} from './types';

const useBlocklyNativeEditor = (
  params?: null | UseBlocklyNativeEditorType,
): BlocklyNativeInfoType => {
  const {
    workspaceConfiguration,
    initial,
    onError,
    onInject,
    onChange,
    onDispose,
    platform = 'ios',
  } = params ?? {};
  const editorRef = useRef<any>(null);
  const stateRef = useRef<BlocklyStateType>(BlocklyState());
  const toolboxConfigRef =
    useRef<Blockly.utils.toolbox.ToolboxDefinition | null>(null);
  const readOnlyRef = useRef<boolean>(false);
  const codeRef = useRef<BlocklyCodeType>({
    dart: '',
    js: '',
    lua: '',
    php: '',
    python: '',
  });

  function init(params?: null | BlocklyInitType) {
    if (
      !editorRef.current ||
      toolboxConfigRef.current ||
      platform === 'web' ||
      !platform
    ) {
      return;
    }

    readOnlyRef.current = !!(
      params?.workspaceConfiguration?.readOnly ||
      workspaceConfiguration?.readOnly
    );
    postData('init', {
      workspaceConfiguration:
        params?.workspaceConfiguration || workspaceConfiguration,
      initial: params?.initial || initial,
    });
  }

  function dispose() {
    if (toolboxConfigRef.current) {
      postData('dispose');
      _onCallback(onDispose, _getData());
      stateRef.current = BlocklyState();
      toolboxConfigRef.current = null;
      readOnlyRef.current = false;
    }
  }

  function onMessage(e: WebViewMessageEvent) {
    try {
      const { event, data } = JSON.parse(e.nativeEvent.data);
      switch (event) {
        case 'onInject':
          stateRef.current = BlocklyState(data);
          _onCallback(onInject, _getData());
          break;
        case 'onChange':
          stateRef.current = BlocklyState(data);
          _saveCode(data);
          _onCallback(onChange, _getData());
          break;
        case 'onError':
          _onCallback(onError, data);
          break;
        case 'toolboxConfig':
          toolboxConfigRef.current =
            data as Blockly.utils.toolbox.ToolboxDefinition;
          break;
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function updateToolboxConfig(
    cb: (
      configuration: Blockly.utils.toolbox.ToolboxDefinition,
    ) => Blockly.utils.toolbox.ToolboxDefinition,
  ) {
    try {
      if (cb && toolboxConfigRef.current) {
        const configuration: Blockly.utils.toolbox.ToolboxDefinition = cb(
          toolboxConfigRef.current,
        );
        if (configuration && !readOnlyRef.current) {
          postData('updateToolboxConfig', configuration);
        }
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function updateState(cb: (state: BlocklyStateType) => BlocklyNewStateType) {
    try {
      if (cb) {
        const newState: BlocklyNewStateType = cb(stateRef.current);
        postData('updateState', newState);
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function state(): BlocklyStateType {
    return stateRef.current;
  }

  function code(): BlocklyCodeType {
    return codeRef.current;
  }

  function BlocklyState(state?: BlocklyStateType): BlocklyStateType {
    return {
      xml:
        state?.xml ||
        '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      json: state?.json || {},
    } as BlocklyStateType;
  }

  function editorRender(params?: null | HtmlRenderType) {
    const { style, script, editor, packages } = params ?? {};

    return platform === 'web'
      ? ''
      : htmlRender({
          style: htmlStyle(style),
          script: htmlScript(script),
          editor: editor ?? htmlEditor(),
          packages: htmlPackages(packages),
        });
  }

  function postData(event: string, data?: any) {
    try {
      if (editorRef.current && event) {
        const dataString = JSON.stringify({ event, data });
        editorRef.current.postMessage(dataString);
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function runJS(code: string) {
    postData('eval', code);
  }

  function _saveCode(data?: BlocklyCbStateType) {
    codeRef.current = {
      dart: data?.dart || '',
      js: data?.js || '',
      lua: data?.lua || '',
      php: data?.php || '',
      python: data?.python || '',
    };
  }

  function _getData(): BlocklyCbStateType {
    return {
      ...stateRef.current,
      ...codeRef.current,
    };
  }

  function _onCallback(cb?: (arg?: any) => void, arg?: any) {
    if (cb) {
      cb(arg);
    }
  }

  return {
    editorRef,
    init,
    dispose,
    state,
    code,
    onMessage,
    htmlRender: editorRender,
    updateToolboxConfig,
    updateState,
    postData,
    runJS,
  };
};

export { useBlocklyNativeEditor };
