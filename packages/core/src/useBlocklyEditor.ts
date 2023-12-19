import { useRef } from 'react';

import Blockly, { WorkspaceSvg } from 'blockly';
import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';

import { importFromJson } from './importFromJson';
import { importFromXml } from './importFromXml';
import type {
  BlocklyInfoType,
  BlocklyInitType,
  BlocklyNewStateType,
  BlocklyStateType,
  UseBlocklyEditorType,
} from './types';

const useBlocklyEditor = (
  params?: null | UseBlocklyEditorType,
): BlocklyInfoType => {
  const {
    workspaceConfiguration,
    initial,
    onError,
    onInject,
    onChange,
    onDispose,
    platform = 'web',
  } = params ?? {};
  const editorRef = useRef<any>(null);
  const workspaceRef = useRef<WorkspaceSvg | null>(null);
  const stateRef = useRef<BlocklyStateType>(BlocklyState());
  const toolboxConfigRef = useRef<ToolboxDefinition | null>(null);
  const readOnlyRef = useRef<boolean>(false);

  function init(params?: null | BlocklyInitType) {
    if (!editorRef.current || toolboxConfigRef.current || platform !== 'web') {
      return;
    }

    const workspace = Blockly.inject(
      editorRef.current,
      params?.workspaceConfiguration ?? workspaceConfiguration ?? undefined,
    );

    if (workspace) {
      workspaceRef.current = workspace;
      toolboxConfigRef.current = (params?.workspaceConfiguration?.toolbox ||
        workspaceConfiguration?.toolbox || {
          contents: [],
        }) as ToolboxDefinition;
      readOnlyRef.current = !!(
        params?.workspaceConfiguration?.readOnly ||
        workspaceConfiguration?.readOnly
      );
      _onCallback(onInject, {
        workspace,
        ...stateRef.current,
      });
      _setState(params?.initial || initial);
      workspace.addChangeListener(listener);
    }
  }

  function dispose() {
    if (workspaceRef.current) {
      workspaceRef.current.removeChangeListener(listener);
      workspaceRef.current.dispose();
      _onCallback(onDispose, {
        workspace: workspaceRef.current,
        ...stateRef.current,
      });
      workspaceRef.current = null;
      toolboxConfigRef.current = null;
      stateRef.current = BlocklyState();
      readOnlyRef.current = false;
    }
  }

  function listener(event: Blockly.Events.Abstract) {
    if (!event.isUiEvent && workspaceRef.current) {
      _saveData();
    }
  }

  function updateToolboxConfig(
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) {
    try {
      if (cb && toolboxConfigRef.current) {
        const configuration: ToolboxDefinition = cb(toolboxConfigRef.current);
        if (configuration && workspaceRef.current && !readOnlyRef.current) {
          toolboxConfigRef.current = configuration;
          workspaceRef.current.updateToolbox(configuration);
        }
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function updateState(cb: (state: BlocklyStateType) => BlocklyNewStateType) {
    try {
      if (cb) {
        const newState: BlocklyNewStateType = cb(stateRef.current);
        _setState(newState);
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function state(): BlocklyStateType {
    return stateRef.current;
  }

  function BlocklyState(state?: BlocklyStateType): BlocklyStateType {
    return {
      xml:
        state?.xml ||
        '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      json: state?.json || {},
    } as BlocklyStateType;
  }

  function _setState(newState?: null | string | object) {
    if (workspaceRef.current) {
      if (typeof newState === 'string') {
        importFromXml(newState as string, workspaceRef.current, onError);
      } else if (newState && typeof newState === 'object') {
        importFromJson(newState as object, workspaceRef.current, onError);
      }
      _saveData();
    }
  }

  function _saveData(): boolean {
    try {
      if (workspaceRef.current) {
        const newXml = Blockly.Xml.domToText(
          Blockly.Xml.workspaceToDom(workspaceRef.current),
        );
        if (newXml !== stateRef.current.xml) {
          stateRef.current = BlocklyState({
            xml: newXml,
            json: Blockly.serialization.workspaces.save(workspaceRef.current),
          });
          _onCallback(onChange, {
            workspace: workspaceRef.current,
            ...stateRef.current,
          });
          return true;
        }
      }
      return false;
    } catch (err) {
      _onCallback(onError, err);
      return false;
    }
  }

  function _onCallback(cb?: (arg?: any) => void, arg?: any) {
    if (cb) {
      cb(arg);
    }
  }

  return {
    editorRef,
    init,
    dispose,
    state,
    updateToolboxConfig,
    updateState,
  };
};

export { useBlocklyEditor };
