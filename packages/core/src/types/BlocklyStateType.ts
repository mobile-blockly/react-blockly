import * as Blockly from 'blockly';

export interface BlocklyStateType {
  xml: string;
  json: object;
}

export interface BlocklyCbStateType extends BlocklyStateType {
  workspace?: null | Blockly.WorkspaceSvg;
  dart: string;
  js: string;
  lua: string;
  php: string;
  python: string;
}

export type BlocklyNewStateType = object;
