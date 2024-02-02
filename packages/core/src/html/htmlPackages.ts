export function htmlPackages(packages?: null | string): string {
  return `
  <script src='https://unpkg.com/blockly/blockly.min.js' defer></script>
  <script src="https://unpkg.com/blockly/javascript_compressed" defer></script>
  <script src="https://unpkg.com/blockly/python_compressed" defer></script>
  <script src="https://unpkg.com/blockly/php_compressed" defer></script>
  <script src="https://unpkg.com/blockly/lua_compressed" defer></script>
  <script src="https://unpkg.com/blockly/dart_compressed" defer></script>
  ${packages ?? ''}
`;
}
