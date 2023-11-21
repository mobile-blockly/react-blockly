import React, { memo, type PropsWithChildren } from 'react';

import { useBlocklyEditor } from '@react-blockly/core';

import type { BlocklyWebEditorType } from '../types';

function EditorComponent(props: BlocklyWebEditorType) {
  const { className } = props;
  const { editorRef } = useBlocklyEditor(props);

  return <div className={className} ref={editorRef}></div>;
}

function propsAreEqual(
  prevProps: Readonly<PropsWithChildren<BlocklyWebEditorType>>,
  nextProps: Readonly<PropsWithChildren<BlocklyWebEditorType>>,
) {
  return (
    prevProps.className === nextProps.className &&
    prevProps.forceData === nextProps.forceData
  );
}

export const BlocklyEditor = memo(
  EditorComponent,
  propsAreEqual,
) as React.ComponentType<BlocklyWebEditorType>;
