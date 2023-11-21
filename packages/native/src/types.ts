import type { UseBlocklyEditorType } from '@react-blockly/core';
import Blockly from 'blockly';
import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';

export interface BlocklyEditorType extends UseBlocklyEditorType {
  style?: object | Array<object>;
  forceData?: any;
}

export interface HtmlScriptType {
  workspaceConfiguration: Blockly.BlocklyOptions;
  toolboxConfiguration: ToolboxDefinition;
  script?: string;
}

export interface HtmlRenderType extends HtmlScriptType {
  style?: string;
}
