import { useEffect, useRef } from 'react';

import Blockly, { Workspace, WorkspaceSvg } from 'blockly';
import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';

import { importFromJson } from './importFromJson';
import { importFromXml } from './importFromXml';
import type {
  BlocklyInfoType,
  BlocklyNewStateType,
  BlocklyStateType,
  UseBlocklyEditorType,
} from './types';

const useBlocklyEditor = ({
  workspaceConfiguration,
  toolboxConfiguration,
  initial,
  onError,
  onInject,
  onChange,
  onDispose,
  platform = 'web',
}: UseBlocklyEditorType): BlocklyInfoType => {
  const editorRef = useRef<any>(null);
  const workspaceRef = useRef<WorkspaceSvg | null>(null);
  const xmlRef = useRef<string | null>(null);
  const jsonRef = useRef<object | null>(null);
  const workspaceConfigurationRef = useRef(workspaceConfiguration);
  const toolboxConfigurationRef = useRef(toolboxConfiguration);

  // Workspace creation
  useEffect(() => {
    if (!editorRef.current || platform !== 'web') {
      return;
    }
    const workspace = Blockly.inject(editorRef.current, {
      ...workspaceConfigurationRef.current,
      toolbox: toolboxConfigurationRef.current,
    });
    workspaceRef.current = workspace;

    _onCallback(onInject, workspace);
    _setState(initial);
    workspace.addChangeListener(listener);

    // Dispose of the workspace when our div ref goes away (Equivalent to didComponentUnmount)
    return () => {
      workspace.removeChangeListener(listener);
      workspace.dispose();
      _onCallback(onDispose, workspace);
    };
    // eslint-disable-next-line
  }, []);

  function listener(event: Blockly.Events.Abstract) {
    if (!event.isUiEvent && workspaceRef.current) {
      _saveData(workspaceRef.current);
    }
  }

  function _onCallback(cb?: (arg?: any) => void, arg?: any) {
    if (cb) {
      cb(arg);
    }
  }

  function _saveData(workspace: Workspace): boolean {
    try {
      const newXml = Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(workspace),
      );
      if (newXml !== xmlRef.current) {
        xmlRef.current = newXml;
        jsonRef.current = Blockly.serialization.workspaces.save(workspace);
        _onCallback(onChange, {
          workspace,
          xml: xmlRef.current,
          json: jsonRef.current,
        });
        return true;
      }
      return false;
    } catch (err) {
      _onCallback(onError, err);
      return false;
    }
  }

  function _setState(newState?: string | object) {
    if (newState && workspaceRef.current) {
      if (typeof newState === 'string') {
        importFromXml(newState as string, workspaceRef.current, onError);
      } else if (typeof newState === 'object') {
        importFromJson(newState as object, workspaceRef.current, onError);
      }
      _saveData(workspaceRef.current);
    }
  }

  function updateToolboxConfig(
    cb: (configuration: ToolboxDefinition) => ToolboxDefinition,
  ) {
    try {
      if (cb) {
        const configuration: ToolboxDefinition = cb(
          toolboxConfigurationRef.current,
        );
        if (
          configuration &&
          workspaceRef.current &&
          !workspaceConfigurationRef.current.readOnly
        ) {
          toolboxConfigurationRef.current = configuration;
          workspaceRef.current.updateToolbox(configuration);
        }
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  function updateState(cb: (state: BlocklyStateType) => BlocklyNewStateType) {
    try {
      if (cb && xmlRef.current && jsonRef.current) {
        const newState: BlocklyNewStateType = cb({
          xml: xmlRef.current,
          json: jsonRef.current,
        });
        _setState(newState);
      }
    } catch (err) {
      _onCallback(onError, err);
    }
  }

  return {
    workspace: workspaceRef.current,
    xml: xmlRef.current,
    json: jsonRef.current,
    editorRef,
    toolboxConfig: toolboxConfigurationRef.current as ToolboxDefinition,
    updateToolboxConfig,
    updateState,
  };
};

export { useBlocklyEditor };
