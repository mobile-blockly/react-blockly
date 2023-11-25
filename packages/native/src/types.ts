import type { UseBlocklyNativeEditorType } from '@react-blockly/core';

export interface BlocklyEditorType extends UseBlocklyNativeEditorType {
  style?: object | Array<object>;
  forceData?: any;
}
