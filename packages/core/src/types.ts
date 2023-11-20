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
