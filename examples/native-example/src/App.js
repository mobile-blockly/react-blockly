import React from 'react';
import { StyleSheet } from 'react-native';

import { BlocklyEditor } from '@react-blockly/native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <BlocklyEditor
        workspaceConfiguration={workspaceConfiguration}
        initial={ConfigFiles.INITIAL_JSON}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
