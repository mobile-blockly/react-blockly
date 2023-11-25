import React, { memo, type PropsWithChildren } from 'react';
import { Platform, View } from 'react-native';

import { useBlocklyEditor, useBlocklyNativeEditor } from '@react-blockly/core';
import { WebView } from 'react-native-webview';

import type { BlocklyEditorType } from '../types';

function EditorComponent(props: BlocklyEditorType) {
  const { editorRef: editorWebRef } = useBlocklyEditor({
    ...props,
    platform: Platform.OS,
  });
  const {
    editorRef: editorNativeRef,
    onMessage,
    onLoadEnd,
    htmlRender,
  } = useBlocklyNativeEditor({
    ...props,
    platform: Platform.OS,
  });

  return Platform.OS === 'web' ? (
    <View style={[{ flex: 1 }, props.style]} ref={editorWebRef} />
  ) : (
    <WebView
      style={[{ flex: 1 }, props.style]}
      ref={editorNativeRef}
      originWhitelist={['*']}
      source={{
        html: htmlRender(),
      }}
      onMessage={onMessage}
      onLoadEnd={onLoadEnd}
    />
  );
}

function propsAreEqual(
  prevProps: Readonly<PropsWithChildren<BlocklyEditorType>>,
  nextProps: Readonly<PropsWithChildren<BlocklyEditorType>>,
) {
  return prevProps.forceData === nextProps.forceData;
}

export const BlocklyEditor = memo(
  EditorComponent,
  propsAreEqual,
) as React.ComponentType<BlocklyEditorType>;
