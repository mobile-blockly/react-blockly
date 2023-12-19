import Blockly, { WorkspaceSvg } from 'blockly';

function importFromJson(
  json: object,
  workspace: WorkspaceSvg,
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
