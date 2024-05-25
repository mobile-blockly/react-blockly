import * as Blockly from 'blockly/core';

export interface BlocklyInitType {
  workspaceConfiguration?: null | Blockly.BlocklyOptions;
  initial?: null | string | object;
}
