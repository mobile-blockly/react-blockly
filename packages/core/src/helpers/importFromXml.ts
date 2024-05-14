import * as Blockly from 'blockly';

function importFromXml(
  xml: string,
  workspace: Blockly.WorkspaceSvg,
  onError?: (error: any) => void,
) {
  try {
    if (workspace.getAllBlocks(false).length > 0) return; // we won't load blocks again if they are already loaded
    Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(xml), workspace);
    return true;
  } catch (e) {
    if (onError) {
      onError(e);
    }
    return false;
  }
}

export { importFromXml };
