import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { useBlocklyNativeEditor } from '@react-blockly/core';
import { WebView } from 'react-native-webview';

import ConfigFiles from './content';

function ComponentWithHook(props) {
  const { workspaceConfiguration, onInject, onChange, onDispose, onError } =
    props;

  const {
    editorRef,
    init,
    dispose,
    state,
    updateState,
    updateToolboxConfig,
    htmlRender,
    onMessage,
  } = useBlocklyNativeEditor({
    workspaceConfiguration,
    initial: ConfigFiles.INITIAL_XML,
    onInject,
    onChange,
    onDispose,
    onError,
    platform: Platform.OS,
  });

  useEffect(() => {
    return () => {
      dispose();
    };
  }, []);

  const onLoadEnd = () => {
    // if you need to do init later
    testPromise({ timeout: 1000, data: ConfigFiles.INITIAL_JSON }).then(res => {
      init({
        // if you need to override
        // workspaceConfiguration: newWorkspaceConfig,
        initial: res,
      });
    });

    // change toolbox
    testPromise({ timeout: 3000 }).then(() => {
      updateToolboxConfig(prevConfig => ({
        ...prevConfig,
        contents: [
          ...prevConfig.contents,
          {
            kind: 'category',
            name: 'Dynamically added category',
            colour: 210,
            contents: [
              { kind: 'block', type: 'text' },
              {
                kind: 'block',
                blockxml:
                  '<block type="text_print"><value name="TEXT"><shadow type="text">abc</shadow></value></block>',
              },
            ],
          },
        ],
      }));
    });

    // change state
    testPromise({ timeout: 5000 }).then(() => {
      updateState(prevState => ({
        ...prevState.json,
        ...ConfigFiles.NEW_STATE,
      }));
    });

    // get state
    testPromise({ timeout: 7000 }).then(() => {
      console.log('state', JSON.stringify(state()));
    });
  };

  function testPromise({ data, timeout = 1000 }) {
    return new Promise(res => setTimeout(() => res(data), timeout));
  }

  return (
    <WebView
      style={{ flex: 1 }}
      ref={editorRef}
      originWhitelist={['*']}
      source={{
        html: htmlRender(),
      }}
      onMessage={onMessage}
      onLoadEnd={onLoadEnd}
    />
  );
}

export { ComponentWithHook };
