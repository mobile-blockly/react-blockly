import React from 'react';

import { useBlocklyEditor } from '@react-blockly/core';

import ConfigFiles from './content';

function ComponentWithHook() {
  const workspaceConfiguration = {
    grid: {
      spacing: 20,
      length: 3,
      colour: '#ccc',
      snap: true,
    },
    toolbox: ConfigFiles.INITIAL_TOOLBOX_JSON,
  };

  const { editorRef } = useBlocklyEditor({
    workspaceConfiguration,
    initial: ConfigFiles.INITIAL_JSON,
  });

  return <div className="editor" ref={editorRef}></div>;
}

export { ComponentWithHook };
