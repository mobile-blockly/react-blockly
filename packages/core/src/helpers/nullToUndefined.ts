export function nullToUndefined(data?: any, defaultData?: any): any {
  if (data === null || typeof data === 'undefined') {
    return defaultData;
  } else if (Array.isArray(data)) {
    return data.map(item => nullToUndefined(item, defaultData?.[0]));
  } else if (typeof data === 'object') {
    const tempObj: object = {};
    for (const key in data) {
      // @ts-ignore
      tempObj[key] = nullToUndefined(data[key], defaultData?.[key]);
    }
    return tempObj;
  } else {
    return data;
  }
}
