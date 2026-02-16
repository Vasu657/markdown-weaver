import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * We need to calculate the coordinates of the caret (or selection end) in the textarea
 * to position the floating menu. This is a simplified version of standard solutions.
 */
export function getCaretCoordinates(element: HTMLTextAreaElement, position: number) {
  const {
    top,
    left,
  } = element.getBoundingClientRect();

  // We'll create a mirror div to replicate the textarea's style and content
  const div = document.createElement('div');
  const style = window.getComputedStyle(element);

  // Copy relevant styles
  const properties = [
    'direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing',
    'tabSize', 'MozTabSize'
  ];

  properties.forEach(prop => {
    // @ts-ignore
    div.style[prop] = style[prop];
  });

  // Specific styles for the mirror div to ensure it behaves like the textarea but is invisible
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.whiteSpace = 'pre-wrap';
  div.style.wordWrap = 'break-word';
  div.style.top = '0';
  div.style.left = '0';

  // content up to caret
  const textContent = element.value.substring(0, position);
  const textNode = document.createTextNode(textContent);

  // We need a span to mark the end position
  const span = document.createElement('span');
  span.textContent = element.value.substring(position) || '.'; // Ensure span has height

  div.appendChild(textNode);
  div.appendChild(span);

  document.body.appendChild(div);

  const spanRect = span.getBoundingClientRect();
  const divRect = div.getBoundingClientRect();

  // Coordinates relative to the viewport
  // The span's position in the div + the textarea's position on screen
  // Actually, we need to calculate offset relative to the element (textarea), 
  // but since we want to position a fixed/absolute element on body, we might want client rects.

  // However, the mirror div is appended to body, but it's not positioned *at* the textarea. 
  // Wait, if we append to body with top=0, left=0, it's at 0,0 of body.

  // Better approach:
  // The span's offsetTop/Left tells us where the caret is *inside the text flow*.
  // We need to adjust for scroll of the textarea.

  const coordinates = {
    top: span.offsetTop + parseInt(style.borderTopWidth) - element.scrollTop,
    left: span.offsetLeft + parseInt(style.borderLeftWidth) - element.scrollLeft,
    height: parseInt(style.lineHeight) // approximate
  };

  document.body.removeChild(div);

  return coordinates;
}

