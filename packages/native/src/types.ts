import type { UseBlocklyNativeEditorType } from '@react-blockly/core';

export interface BlocklyEditorType extends UseBlocklyNativeEditorType {
  containerStyle?: object | Array<object>;
  forceData?: any;
  script?: null | string;
  style?: null | string;
  editor?: null | string;
  packages?: null | string;
}
