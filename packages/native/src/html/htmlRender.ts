import { htmlScript } from './htmlScript';
import { htmlStyle } from './htmlStyle';
import type { HtmlRenderType } from '../types';

export function htmlRender(params: HtmlRenderType): string {
  return `
<html>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'>
${htmlStyle(params.style)}
</head>
<body>
  <div class='wrapper'>
    <div id='root' class='wrap-container'></div>
  </div>
  ${htmlScript(params)}
  <script src='https://unpkg.com/blockly/blockly.min.js' defer></script>
</body>
</html>
`;
}
