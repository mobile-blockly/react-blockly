import React, { memo, type PropsWithChildren, useEffect } from 'react';
import { Platform, View } from 'react-native';

import { useBlocklyEditor, useBlocklyNativeEditor } from '@react-blockly/core';
import { WebView } from 'react-native-webview';

import type { BlocklyEditorType } from '../types';

function EditorComponent(props: BlocklyEditorType) {
  const webEditor = useBlocklyEditor({
    ...props,
    platform: Platform.OS,
  });
  const nativeEditor = useBlocklyNativeEditor({
    ...props,
    platform: Platform.OS,
  });

  useEffect(() => {
    webEditor.init();

    return () => {
      webEditor.dispose();
      nativeEditor.dispose();
    };
  }, []);

  function onLoadEnd() {
    nativeEditor.init();
  }

  return Platform.OS === 'web' ? (
    <View
      style={[{ flex: 1 }, props.containerStyle]}
      ref={webEditor.editorRef}
    />
  ) : (
    <WebView
      style={[{ flex: 1 }, props.containerStyle]}
      ref={nativeEditor.editorRef}
      originWhitelist={['*']}
      source={{
        html: nativeEditor.htmlRender({
          style: props.style,
          script: props.script,
          editor: props.editor,
          packages: props.packages,
        }),
      }}
      onMessage={nativeEditor.onMessage}
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
