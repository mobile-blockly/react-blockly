import type { MutableRefObject } from 'react';

import * as Blockly from 'blockly';

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
    cb: (
      configuration: Blockly.utils.toolbox.ToolboxDefinition,
    ) => Blockly.utils.toolbox.ToolboxDefinition,
  ) => void;
  updateState: (cb: (state: BlocklyStateType) => BlocklyNewStateType) => void;
}
