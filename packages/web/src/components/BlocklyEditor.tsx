import React, { memo, useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { useBlocklyEditor } from '@react-blockly/core';

import type { BlocklyWebEditorType } from '../types';

function EditorComponent(props: BlocklyWebEditorType) {
  const { className } = props;
  const { editorRef, init, dispose } = useBlocklyEditor(props);

  useEffect(() => {
    init();

    return () => {
      dispose();
    };
  }, []);

  return <div className={className} ref={editorRef}></div>;
}

function propsAreEqual(
  prevProps: Readonly<PropsWithChildren<BlocklyWebEditorType>>,
  nextProps: Readonly<PropsWithChildren<BlocklyWebEditorType>>,
) {
  return prevProps.forceData === nextProps.forceData;
}

export const BlocklyEditor = memo(
  EditorComponent,
  propsAreEqual,
) as React.ComponentType<BlocklyWebEditorType>;
