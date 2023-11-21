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
  };

  return (
    <BlocklyEditor
      className={'editor'}
      workspaceConfiguration={workspaceConfiguration}
      toolboxConfiguration={ConfigFiles.INITIAL_TOOLBOX_JSON}
      initial={ConfigFiles.INITIAL_XML}
    />
  );
}

export { App };
