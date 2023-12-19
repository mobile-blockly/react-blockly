import type { HtmlEditorType } from '../types';

export function htmlEditor(params?: null | HtmlEditorType): string {
  const { content, classList } = params ?? {};

  return `
<div class='wrapper ${classList?.join(' ') ?? ''}'>
  ${content ?? ''}
  <div id='blocklyEditor' class='wrap-container'></div>
</div>
`;
}
