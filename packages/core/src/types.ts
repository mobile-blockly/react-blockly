import { type MutableRefObject } from 'react';

import Blockly, { WorkspaceSvg } from 'blockly';
import { type ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { type WebViewMessageEvent } from 'react-native-webview';

export interface UseBlocklyEditorType {
  workspaceConfiguration?: Blockly.BlocklyOptions;
  platform?: string;
  initial?: string | object;
  onError?: (error: any) => void;
  onInject?: (state: BlocklyCbStateType) => void;
  onDispose?: (state: BlocklyCbStateType) => void;
  onChange?: (state: BlocklyStateType) => void;
}

export interface UseBlocklyNativeEditorType extends UseBlocklyEditorType {
  onInject?: (state: BlocklyStateType) => void;
  onDispose?: (state: BlocklyStateType) => void;
}

export interface BlocklyInfoType {
  editorRef: MutableRefObject<any>;
  init: (params?: BlocklyInitType) => void;
  dispose: () => void;
  state: () => BlocklyStateType;
  updateToolboxConfig: (
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) => void;
  updateState: (cb: (state: BlocklyStateType) => BlocklyNewStateType) => void;
}

export interface BlocklyNativeInfoType extends BlocklyInfoType {
  onMessage: (e: WebViewMessageEvent) => void;
  htmlRender: (params?: HtmlRenderType) => string;
}

export interface BlocklyStateType {
  xml: string;
  json: object;
}

export interface BlocklyCbStateType extends BlocklyStateType {
  workspace?: WorkspaceSvg;
}

export type BlocklyNewStateType = object;

export interface HtmlRenderType {
  script?: string;
  style?: string;
}

export interface BlocklyInitType {
  workspaceConfiguration?: Blockly.BlocklyOptions;
  initial?: string | object;
}
