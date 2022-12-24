export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getValue = <T>(source: unknown, key: string, defaultValue: T): T => {
  if (!source || typeof source === 'number') return defaultValue;
  // eslint-disable-next-line no-prototype-builtins
  if (source.hasOwnProperty(key)) return source[key] as T;
  if (key.indexOf('.') !== -1) {
    const keys = key.split('.');
    let parent = source;
    let value = defaultValue;

    //  Use for loop here so we can break early
    for (let i = 0; i < keys.length; i++) {
      // eslint-disable-next-line no-prototype-builtins
      if (parent.hasOwnProperty(keys[i])) {
        //  Yes it has a key property, let's carry on down
        value = parent[keys[i]] as T;

        parent = parent[keys[i]] as Record<string, unknown>;
      } else {
        //  Can't go any further, so reset to default
        value = defaultValue;
        break;
      }
    }
    return value;
  }
  return defaultValue;
};

export const isShallowEqual = (
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
  compare?: (a: Record<string, unknown>, b: Record<string, unknown>) => boolean,
  compareContext?: Record<string, unknown>,
): boolean => {
  let ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    const valueA = objA[key];
    const valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && !Object.is(valueA, valueB))) {
      return false;
    }
  }

  return true;
};
