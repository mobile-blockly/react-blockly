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
  };

  const { editorRef } = useBlocklyEditor({
    workspaceConfiguration,
    toolboxConfiguration: ConfigFiles.INITIAL_TOOLBOX_JSON,
    initial: ConfigFiles.INITIAL_XML,
  });

  return <div className="editor" ref={editorRef}></div>;
}

export { ComponentWithHook };
