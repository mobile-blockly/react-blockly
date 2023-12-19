import { type MutableRefObject } from 'react';

import { type ToolboxDefinition } from 'blockly/core/utils/toolbox';

import type { BlocklyInitType } from './BlocklyInitType';
import type { BlocklyNewStateType, BlocklyStateType } from './BlocklyStateType';

export interface BlocklyInfoType {
  editorRef: MutableRefObject<any>;
  init: (params?: BlocklyInitType) => void;
  dispose: () => void;
  state: () => BlocklyStateType;
  updateToolboxConfig: (
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) => void;
  updateState: (cb: (state: BlocklyStateType) => BlocklyNewStateType) => void;
}
