import React from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

type ComposeRefCallback<T> = (node: T) => void;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
export const setRef = <T>(ref: PossibleRef<T>, value: T): void => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    // eslint-disable-next-line no-param-reassign
    (ref as React.MutableRefObject<T>).current = value;
  }
};

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
export const composeRefs = <T>(...refs: PossibleRef<T>[]): ComposeRefCallback<T> => (node: T): void => refs.forEach((ref) => setRef(ref, node));

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
export const useComposedRefs = <T>(...refs: PossibleRef<T>[]): ComposeRefCallback<T> => React.useCallback(composeRefs(...refs), refs);
