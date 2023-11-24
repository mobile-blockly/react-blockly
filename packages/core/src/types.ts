import type { MutableRefObject } from 'react';

import Blockly, { WorkspaceSvg } from 'blockly';
import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';

export interface UseBlocklyEditorType {
  workspaceConfiguration: Blockly.BlocklyOptions;
  toolboxConfiguration: ToolboxDefinition;
  platform?: string;
  initial?: string | object;
  onError?: (error: any) => void;
  onInject?: (state: BlocklyCbStateType) => void;
  onDispose?: (state: BlocklyCbStateType) => void;
  onChange?: (state: BlocklyCbStateType) => void;
}

export interface BlocklyInfoType {
  editorRef: MutableRefObject<any>;
  updateToolboxConfig: (
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) => void;
  updateState: (cb: (state: BlocklyStateType) => string | object) => void;
}

export interface BlocklyStateType {
  xml: string;
  json: object;
}

export interface BlocklyCbStateType extends BlocklyStateType {
  workspace: WorkspaceSvg | null;
}

export type BlocklyNewStateType = string | object;
