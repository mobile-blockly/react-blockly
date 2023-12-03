import { useEffect, useRef } from 'react';

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

const useBlocklyEditor = ({
  workspaceConfiguration,
  initial,
  onError,
  onInject,
  onChange,
  onDispose,
  platform = 'web',
}: UseBlocklyEditorType): BlocklyInfoType => {
  const editorRef = useRef<any>(null);
  const workspaceRef = useRef<WorkspaceSvg | null>(null);
  const xmlRef = useRef<string>(
    '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
  );
  const jsonRef = useRef<object>({});
  const toolboxConfigRef = useRef<ToolboxDefinition | null>(null);
  const readOnly = useRef<boolean>(false);

  useEffect(() => {
    if (workspaceConfiguration) {
      init({ workspaceConfiguration, initial });
    }

    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.removeChangeListener(listener);
        workspaceRef.current.dispose();
        _onCallback(onDispose, {
          workspace: workspaceRef.current,
          xml: xmlRef.current,
          json: jsonRef.current,
        });
      }
    };
  }, []);

  function init({ workspaceConfiguration, initial }: BlocklyInitType) {
    if (!editorRef.current || toolboxConfigRef.current || platform !== 'web') {
      return;
    }

    const workspace = Blockly.inject(editorRef.current, workspaceConfiguration);

    if (workspace) {
      workspaceRef.current = workspace;
      toolboxConfigRef.current = (workspaceConfiguration?.toolbox ||
        {}) as ToolboxDefinition;
      readOnly.current = !!workspaceConfiguration?.readOnly;
      _onCallback(onInject, {
        workspace,
        xml: xmlRef.current,
        json: jsonRef.current,
      });
      _setState(initial);
      workspace.addChangeListener(listener);
    }
  }

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

  function _saveData(workspace: WorkspaceSvg): boolean {
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
      if (cb && toolboxConfigRef.current) {
        const configuration: ToolboxDefinition = cb(toolboxConfigRef.current);
        if (configuration && workspaceRef.current && !readOnly.current) {
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

  function state(): BlocklyStateType {
    return {
      xml: xmlRef.current,
      json: jsonRef.current,
    };
  }

  return {
    editorRef,
    init,
    state,
    updateToolboxConfig,
    updateState,
  };
};

export { useBlocklyEditor };
