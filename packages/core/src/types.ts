import type { MutableRefObject } from 'react';

import Blockly, { WorkspaceSvg } from 'blockly';
import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';

export interface UseBlocklyEditorType {
  workspaceConfiguration: Blockly.BlocklyOptions;
  toolboxConfiguration: ToolboxDefinition;
  platform?: string;
  initial?: string | object;
  onError?: (error: any) => void;
  onInject?: (workspace: WorkspaceSvg) => void;
  onDispose?: (workspace: WorkspaceSvg) => void;
  onChange?: (state: {
    workspace: WorkspaceSvg;
    xml: string;
    json: object;
  }) => void;
}

export interface BlocklyInfoType {
  workspace: WorkspaceSvg | null;
  xml: string | null;
  json: object | null;
  editorRef: MutableRefObject<any>;
  toolboxConfig: ToolboxDefinition;
  updateToolboxConfig: (
    cb?: (configuration?: ToolboxDefinition) => ToolboxDefinition,
  ) => void;
  updateState: (cb?: (state: BlocklyStateType) => string | object) => void;
}

export interface BlocklyStateType {
  xml: string;
  json: object;
}

export type BlocklyNewStateType = string | object;
