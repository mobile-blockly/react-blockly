import { WorkspaceSvg } from 'blockly';

export interface BlocklyStateType {
  xml: string;
  json: object;
}

export interface BlocklyCbStateType extends BlocklyStateType {
  workspace?: WorkspaceSvg;
}

export type BlocklyNewStateType = object;
