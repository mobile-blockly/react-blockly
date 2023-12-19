import Blockly from 'blockly';

export interface BlocklyInitType {
  workspaceConfiguration?: null | Blockly.BlocklyOptions;
  initial?: null | string | object;
}
