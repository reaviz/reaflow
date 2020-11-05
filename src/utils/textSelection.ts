/**
 * Toggle the text selection of the body.
 */
export function toggleTextSelection(allowSelection: boolean) {
  const style = allowSelection ? '' : 'none';
  [
    '-webkit-touch-callout',
    '-webkit-user-select',
    '-khtml-user-select',
    '-moz-user-select',
    '-ms-user-select',
    'user-select'
  ].forEach((prop) => (document.body.style[prop] = style));
}
