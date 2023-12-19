import { useRef } from 'react';

import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { type WebViewMessageEvent } from 'react-native-webview';

import { htmlEditor } from './html/htmlEditor';
import { htmlRender } from './html/htmlRender';
import { htmlScript } from './html/htmlScript';
import { htmlStyle } from './html/htmlStyle';
import type {
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
  const toolboxConfigRef = useRef<ToolboxDefinition | null>(null);
  const readOnlyRef = useRef<boolean>(false);

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
    _postData('init', {
      workspaceConfiguration:
        params?.workspaceConfiguration || workspaceConfiguration,
      initial: params?.initial || initial,
    });
  }

  function dispose() {
    if (toolboxConfigRef.current) {
      _postData('dispose');
      _onCallback(onDispose, stateRef.current);
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
          _onCallback(onInject, stateRef.current);
          break;
        case 'onChange':
          stateRef.current = BlocklyState(data);
          _onCallback(onChange, stateRef.current);
          break;
        case 'onError':
          _onCallback(onError, data);
          break;
        case 'toolboxConfig':
          toolboxConfigRef.current = data as ToolboxDefinition;
          break;
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function updateToolboxConfig(
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) {
    try {
      if (cb && toolboxConfigRef.current) {
        const configuration: ToolboxDefinition = cb(toolboxConfigRef.current);
        if (configuration && !readOnlyRef.current) {
          _postData('updateToolboxConfig', configuration);
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
        _postData('updateState', newState);
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function state(): BlocklyStateType {
    return stateRef.current;
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
    const { style, script, editor } = params ?? {};

    return platform === 'web'
      ? ''
      : htmlRender({
          style: htmlStyle(style),
          script: htmlScript(script),
          editor: editor ?? htmlEditor(),
        });
  }

  function _postData(event: string, data?: any) {
    try {
      if (editorRef.current && event) {
        const dataString = JSON.stringify({ event, data });
        editorRef.current.postMessage(dataString);
      }
    } catch (err) {
      _onCallback(onError, err);
    }
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
    onMessage,
    htmlRender: editorRender,
    updateToolboxConfig,
    updateState,
  };
};

export { useBlocklyNativeEditor };
