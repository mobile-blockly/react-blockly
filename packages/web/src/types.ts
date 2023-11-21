import type { UseBlocklyEditorType } from '@react-blockly/core';

export interface BlocklyWebEditorType extends UseBlocklyEditorType {
  className?: string;
  forceData?: any;
}
