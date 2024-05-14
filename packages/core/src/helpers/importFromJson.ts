import * as Blockly from 'blockly';

function importFromJson(
  json: object,
  workspace: Blockly.WorkspaceSvg,
  onError?: (error: any) => void,
) {
  try {
    Blockly.serialization.workspaces.load(json, workspace);
    return true;
  } catch (e) {
    if (onError) {
      onError(e);
    }
    return false;
  }
}

export { importFromJson };
