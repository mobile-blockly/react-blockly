import { type MutableRefObject } from 'react';

import Blockly, { WorkspaceSvg } from 'blockly';
import { type ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { type WebViewMessageEvent } from 'react-native-webview';
import {
  type WebViewErrorEvent,
  type WebViewNavigationEvent,
} from 'react-native-webview/lib/WebViewTypes';

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

export interface UseBlocklyNativeEditorType extends UseBlocklyEditorType {
  onInject?: (state: BlocklyStateType) => void;
  onDispose?: (state: BlocklyStateType) => void;
  onChange?: (state: BlocklyStateType) => void;
}

export interface BlocklyInfoType {
  editorRef: MutableRefObject<any>;
  updateToolboxConfig: (
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) => void;
  updateState: (cb: (state: BlocklyStateType) => string | object) => void;
}

export interface BlocklyNativeInfoType extends BlocklyInfoType {
  onMessage: (e: WebViewMessageEvent) => void;
  onLoadEnd: (e: WebViewNavigationEvent | WebViewErrorEvent) => void;
  htmlRender: (params?: HtmlRenderType) => string;
}

export interface BlocklyStateType {
  xml: string;
  json: object;
}

export interface BlocklyCbStateType extends BlocklyStateType {
  workspace: WorkspaceSvg | null;
}

export type BlocklyNewStateType = string | object;

export interface HtmlRenderType {
  script?: string;
  style?: string;
}
