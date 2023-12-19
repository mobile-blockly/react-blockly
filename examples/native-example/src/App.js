import React, { useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';

import { BlocklyEditor } from '@react-blockly/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ComponentWithHook } from './ComponentWithHook';
import ConfigFiles from './content';

export function App() {
  const workspaceConfiguration = {
    grid: {
      spacing: 20,
      length: 3,
      colour: '#ccc',
      snap: true,
    },
    toolbox: ConfigFiles.INITIAL_TOOLBOX_JSON,
    // null safety example
    collapse: null,
    comments: null,
    css: null,
    disable: null,
    horizontalLayout: null,
    maxBlocks: null,
    maxInstances: null,
    media: null,
    modalInputs: null,
    move: null,
    oneBasedIndex: null,
    readOnly: null,
    renderer: null,
    rendererOverrides: null,
    rtl: null,
    scrollbars: null,
    sounds: null,
    theme: null,
    toolboxPosition: null,
    trashcan: null,
    maxTrashcanContents: null,
    plugins: null,
    zoom: null,
    parentWorkspace: null,
  };

  const onInject = useCallback(({ xml, json }) => {
    console.log('onInject', xml, JSON.stringify(json));
  }, []);

  const onChange = useCallback(({ xml, json }) => {
    console.log('onChange', xml, JSON.stringify(json));
  }, []);

  const onDispose = useCallback(({ xml, json }) => {
    console.log('onDispose', xml, JSON.stringify(json));
  }, []);

  const onError = useCallback(error => {
    console.log('onError', error?.toString());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'web' ? (
        // android, ios and web editor
        <BlocklyEditor
          style={{ background: '#fff' }}
          workspaceConfiguration={workspaceConfiguration}
          initial={ConfigFiles.INITIAL_XML}
          onInject={onInject}
          onChange={onChange}
          onDispose={onDispose}
          onError={onError}
        />
      ) : (
        // only android and ios editor
        <ComponentWithHook
          workspaceConfiguration={workspaceConfiguration}
          onInject={onInject}
          onChange={onChange}
          onDispose={onDispose}
          onError={onError}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
