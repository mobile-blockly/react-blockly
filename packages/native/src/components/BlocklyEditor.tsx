import React, { memo, useRef } from 'react';
import { Platform, View } from 'react-native';

import { useBlocklyEditor } from '@react-blockly/core';
import { WebView } from 'react-native-webview';

import { htmlRender } from '../html/htmlRender';
import type { BlocklyEditorType } from '../types';

function EditorComponent(props: BlocklyEditorType) {
  const { style, workspaceConfiguration, toolboxConfiguration, initial } =
    props;
  const { editorRef: editorWebRef } = useBlocklyEditor({
    ...props,
    platform: Platform.OS,
  });
  const editorRef = useRef(null);

  const params = {
    workspaceConfiguration,
    toolboxConfiguration,
    initial,
  };

  return Platform.OS === 'web' ? (
    <View style={[{ flex: 1 }, style]} ref={editorWebRef} />
  ) : (
    <WebView
      style={[{ flex: 1 }, style]}
      ref={editorRef}
      originWhitelist={['*']}
      source={{
        html: htmlRender(params),
      }}
      onMessage={e => {
        const { event, arg } = JSON.parse(e.nativeEvent?.data);
        console.log(event, arg);
      }}
    />
  );
}

function propsAreEqual() {
  return true;
}

export const BlocklyEditor = memo(
  EditorComponent,
  propsAreEqual,
) as React.ComponentType<BlocklyEditorType>;
