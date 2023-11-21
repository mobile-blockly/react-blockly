import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BlocklyEditor } from '@react-blockly/native';

import ConfigFiles from './content';

export function App() {
  const workspaceConfiguration = {
    grid: {
      spacing: 20,
      length: 3,
      colour: '#ccc',
      snap: true,
    },
  };

  return (
    <View style={styles.container}>
      <BlocklyEditor
        workspaceConfiguration={workspaceConfiguration}
        toolboxConfiguration={ConfigFiles.INITIAL_TOOLBOX_JSON}
        initial={ConfigFiles.INITIAL_XML}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
