import { useRef } from 'react';

import * as Blockly from 'blockly';
import { dartGenerator } from 'blockly/dart';
import { javascriptGenerator } from 'blockly/javascript';
import { luaGenerator } from 'blockly/lua';
import { phpGenerator } from 'blockly/php';
import { pythonGenerator } from 'blockly/python';

import { importFromJson, importFromXml, nullToUndefined } from './helpers';
import type {
  BlocklyCbStateType,
  BlocklyCodeType,
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
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const stateRef = useRef<BlocklyStateType>(BlocklyState());
  const toolboxConfigRef =
    useRef<Blockly.utils.toolbox.ToolboxDefinition | null>(null);
  const readOnlyRef = useRef<boolean>(false);
  const codeRef = useRef<BlocklyCodeType>({
    dart: '',
    js: '',
    lua: '',
    php: '',
    python: '',
  });

  function init(params?: null | BlocklyInitType) {
    if (!editorRef.current || toolboxConfigRef.current || platform !== 'web') {
      return;
    }

    const workspace = Blockly.inject(
      editorRef.current,
      nullToUndefined(params?.workspaceConfiguration ?? workspaceConfiguration),
    );

    if (workspace) {
      workspaceRef.current = workspace;
      toolboxConfigRef.current = (params?.workspaceConfiguration?.toolbox ||
        workspaceConfiguration?.toolbox || {
          contents: [],
        }) as Blockly.utils.toolbox.ToolboxDefinition;
      readOnlyRef.current = !!(
        params?.workspaceConfiguration?.readOnly ||
        workspaceConfiguration?.readOnly
      );
      _onCallback(onInject, _getData());
      _setState(params?.initial || initial);
      workspace.addChangeListener(listener);
    }
  }

  function dispose() {
    if (workspaceRef.current) {
      workspaceRef.current.removeChangeListener(listener);
      workspaceRef.current.dispose();
      _onCallback(onDispose, _getData());
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
    cb: (
      configuration: Blockly.utils.toolbox.ToolboxDefinition,
    ) => Blockly.utils.toolbox.ToolboxDefinition,
  ) {
    try {
      if (cb && toolboxConfigRef.current) {
        const configuration: Blockly.utils.toolbox.ToolboxDefinition = cb(
          toolboxConfigRef.current,
        );
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

  function code(): BlocklyCodeType {
    return codeRef.current;
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
          _saveCode();
          _onCallback(onChange, _getData());
          return true;
        }
      }
      return false;
    } catch (err) {
      _onCallback(onError, err);
      return false;
    }
  }

  function _saveCode() {
    if (workspaceRef.current) {
      codeRef.current = {
        dart: dartGenerator.workspaceToCode(workspaceRef.current!),
        js: javascriptGenerator.workspaceToCode(workspaceRef.current!),
        lua: luaGenerator.workspaceToCode(workspaceRef.current!),
        php: phpGenerator.workspaceToCode(workspaceRef.current!),
        python: pythonGenerator.workspaceToCode(workspaceRef.current!),
      };
    }
  }

  function _getData(): BlocklyCbStateType {
    return {
      workspace: workspaceRef.current,
      ...stateRef.current,
      ...codeRef.current,
    } as BlocklyCbStateType;
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
    code,
    updateToolboxConfig,
    updateState,
  };
};

export { useBlocklyEditor };
