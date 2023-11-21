import type { HtmlScriptType } from '../types';

export function htmlScript({
  workspaceConfiguration,
  toolboxConfiguration,
  script = '',
}: HtmlScriptType): string {
  const workspaceConfig = JSON.stringify(workspaceConfiguration).replace(
    /^\{|}$/g,
    '',
  );
  const toolboxConfig = JSON.stringify(toolboxConfiguration);

  return `
<script>
(window.onload = () => {
  if (!Blockly) {
    return;
  }

  Blockly.inject(document.querySelector('#root'), {
    toolbox: ${toolboxConfig},
    ${workspaceConfig}
  });

  function postData(data) {
    try {
      if (window.ReactNativeWebView && data) {
        const dataString = JSON.stringify(data);
        window.ReactNativeWebView.postMessage(dataString);
      }
      } catch (e) {
        alert(e);
    }
  }

  function handleEvent(message) {
    try {
      const data = JSON.parse(message.data);
    } catch (e) {
      alert(e);
    }
  }
  document.addEventListener("message", handleEvent);

  ${script}
})();
</script>
`;
}
