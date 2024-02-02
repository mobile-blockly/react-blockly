import { type MutableRefObject } from 'react';

import { type ToolboxDefinition } from 'blockly/core/utils/toolbox';

import type { BlocklyCodeType } from './BlocklyCodeType';
import type { BlocklyInitType } from './BlocklyInitType';
import type { BlocklyNewStateType, BlocklyStateType } from './BlocklyStateType';

export interface BlocklyInfoType {
  editorRef: MutableRefObject<any>;
  init: (params?: BlocklyInitType) => void;
  dispose: () => void;
  state: () => BlocklyStateType;
  code: () => BlocklyCodeType;
  updateToolboxConfig: (
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) => void;
  updateState: (cb: (state: BlocklyStateType) => BlocklyNewStateType) => void;
}
