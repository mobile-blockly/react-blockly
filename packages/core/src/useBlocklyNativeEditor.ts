import { useEffect, useRef } from 'react';

import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { type WebViewMessageEvent } from 'react-native-webview';

import { htmlRender } from './html/htmlRender';
import { htmlScript } from './html/htmlScript';
import { htmlStyle } from './html/htmlStyle';
import type {
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
  const toolboxConfigurationRef = useRef(toolboxConfiguration);

  useEffect(() => {
    return () => {
      _onCallback(onDispose, {
        xml: xmlRef.current,
        json: jsonRef.current,
      });
    };
  }, []);

  // Workspace creation
  function onLoadEnd() {
    if (editorRef.current) {
      postData('init', {
        workspaceConfiguration,
        toolboxConfiguration,
        initial,
      });
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
          toolboxConfigurationRef.current = data;
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
    console.log('cd', cb);
    if (cb) {
      cb(arg);
    }
  }

  function updateToolboxConfig(
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) {
    try {
      if (cb) {
        const configuration: ToolboxDefinition = cb(
          toolboxConfigurationRef.current,
        );
        if (configuration) {
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

  return {
    editorRef,
    onMessage,
    onLoadEnd,
    htmlRender: _editorRender,
    updateToolboxConfig,
    updateState,
  };
};

export { useBlocklyNativeEditor };
