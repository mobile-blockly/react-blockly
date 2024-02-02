import type { HtmlRenderType } from '../types';

export function htmlRender(params?: HtmlRenderType): string {
  const { style, script, editor, packages } = params ?? {};
  return `
<html>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'>
${style ?? ''}
</head>
<body>
  ${editor ?? ''}
  ${script ?? ''}
  ${packages ?? ''}
</body>
</html>
`;
}
