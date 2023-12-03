import React from 'react';

import { BlocklyEditor } from '@react-blockly/web';

import ConfigFiles from './content';

function App() {
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
    <BlocklyEditor
      className={'editor'}
      workspaceConfiguration={workspaceConfiguration}
      initial={ConfigFiles.INITIAL_JSON}
    />
  );
}

export { App };
