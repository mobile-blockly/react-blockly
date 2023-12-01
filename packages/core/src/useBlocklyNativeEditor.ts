import { useEffect, useRef } from 'react';

import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { type WebViewMessageEvent } from 'react-native-webview';

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

const useBlocklyNativeEditor = ({
  workspaceConfiguration,
  toolboxConfiguration,
  initial,
  onError,
  onInject,
  onChange,
  onDispose,
  platform = 'ios',
}: UseBlocklyNativeEditorType): BlocklyNativeInfoType => {
  const editorRef = useRef<any>(null);
  const xmlRef = useRef<string>(
    '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
  );
  const jsonRef = useRef<object>({});
  const toolboxConfigRef = useRef<ToolboxDefinition | null>(null);
  const readOnly = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      if (toolboxConfigRef.current) {
        _onCallback(onDispose, {
          xml: xmlRef.current,
          json: jsonRef.current,
        });
      }
    };
  }, []);

  function init({
    workspaceConfiguration,
    toolboxConfiguration,
    initial,
  }: BlocklyInitType) {
    if (
      !editorRef.current ||
      toolboxConfigRef.current ||
      platform === 'web' ||
      !workspaceConfiguration ||
      !toolboxConfiguration
    ) {
      return;
    }

    readOnly.current = !!workspaceConfiguration.readOnly;
    postData('init', {
      workspaceConfiguration,
      toolboxConfiguration,
      initial,
    });
  }

  function onLoadEnd() {
    if (workspaceConfiguration && toolboxConfiguration) {
      init({ workspaceConfiguration, toolboxConfiguration, initial });
    }
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

  function onMessage(e: WebViewMessageEvent) {
    try {
      const { event, data } = JSON.parse(e.nativeEvent.data);
      switch (event) {
        case 'onInject':
          xmlRef.current = data.xml;
          jsonRef.current = data.json;
          _onCallback(onInject, data);
          break;
        case 'onChange':
          xmlRef.current = data.xml;
          jsonRef.current = data.json;
          _onCallback(onChange, data);
          break;
        case 'onDispose':
          _onCallback(onDispose, data);
          break;
        case 'onError':
          _onCallback(onError, data);
          break;
        case 'toolboxConfig':
          toolboxConfigRef.current = data;
          break;
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function _editorRender(params: HtmlRenderType = {}) {
    const { style, script } = params;

    return platform === 'web'
      ? ''
      : htmlRender({
          style: htmlStyle(style),
          script: htmlScript(script),
        });
  }

  function _onCallback(cb?: (arg?: any) => void, arg?: any) {
    if (cb) {
      cb(arg);
    }
  }

  function updateToolboxConfig(
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) {
    try {
      if (cb && toolboxConfigRef.current) {
        const configuration: ToolboxDefinition = cb(toolboxConfigRef.current);
        if (configuration && !readOnly.current) {
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
        const newState: BlocklyNewStateType = cb({
          xml: xmlRef.current,
          json: jsonRef.current,
        });
        postData('updateState', newState);
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function state(): BlocklyStateType {
    return {
      xml: xmlRef.current,
      json: jsonRef.current,
    };
  }

  return {
    editorRef,
    init,
    state,
    onMessage,
    onLoadEnd,
    htmlRender: _editorRender,
    updateToolboxConfig,
    updateState,
  };
};

export { useBlocklyNativeEditor };
