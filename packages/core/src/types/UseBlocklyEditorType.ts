import Blockly from 'blockly';

import type { BlocklyCbStateType } from './BlocklyStateType';

export interface UseBlocklyEditorType {
  workspaceConfiguration?: null | Blockly.BlocklyOptions;
  platform?: null | string;
  initial?: null | string | object;
  onError?: (error: any) => void;
  onInject?: (state: BlocklyCbStateType) => void;
  onDispose?: (state: BlocklyCbStateType) => void;
  onChange?: (state: BlocklyCbStateType) => void;
}
