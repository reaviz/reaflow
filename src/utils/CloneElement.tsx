import { cloneElement } from 'react';

interface CloneElementProps {
  element: any;
  children?: any;
}

export function CloneElement<T extends Record<string, any>>({ children, element, ...rest }: CloneElementProps & Partial<T>) {
  if (element === null) {
    return children;
  }

  return cloneElement(element, {
    ...rest,
    children
  });
}
