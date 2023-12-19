import React, { useCallback } from 'react';

import { BlocklyEditor } from '@react-blockly/web';

import { ComponentWithHook } from './ComponentWithHook';
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

  const onInject = useCallback(({ workspace, xml, json }) => {
    console.log('onInject', workspace, xml, json);
  }, []);

  const onChange = useCallback(({ xml, json }) => {
    console.log('onChange', xml, json);
  }, []);

  const onDispose = useCallback(({ workspace, xml, json }) => {
    console.log('onDispose', workspace, xml, json);
  }, []);

  const onError = useCallback(error => {
    console.log('onError', error);
  }, []);

  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
      <div style={{ flexGrow: 1 }}>
        <BlocklyEditor
          className={'editor'}
          workspaceConfiguration={workspaceConfiguration}
          initial={ConfigFiles.INITIAL_XML}
          onInject={onInject}
          onChange={onChange}
          onDispose={onDispose}
          onError={onError}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <ComponentWithHook
          workspaceConfiguration={workspaceConfiguration}
          onInject={onInject}
          onChange={onChange}
          onDispose={onDispose}
          onError={onError}
        />
      </div>
    </div>
  );
}

export { App };
