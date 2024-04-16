import _ from "underscore";

export const JSONPATH_JOIN_CHAR = ".";
export const lang = "en_US";
export const format = [
  { name: "date-time" },
  { name: "date" },
  { name: "email" },
  { name: "hostname" },
  { name: "ipv4" },
  { name: "ipv6" },
  { name: "uri" },
];
export const SCHEMA_TYPE = [
  "string",
  "number",
  "array",
  "object",
  "boolean",
  "integer",
];
export const defaultSchema = {
  string: {
    type: "string",
  },
  number: {
    type: "number",
  },
  array: {
    type: "array",
    items: {
      type: "string",
    },
  },
  object: {
    type: "object",
    properties: {},
  },
  boolean: {
    type: "boolean",
  },
  integer: {
    type: "integer",
  },
};

// 防抖函数，减少高频触发的函数执行的频率
// 请在 constructor 里使用:

// this.func = debounce(this.func, 400);
export const debounce = (func, wait) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

export function getData(state, keys) {
  let curState = state;
  for (let i = 0; i < keys.length; i++) {
    curState = curState[keys[i]];
  }
  return curState;
}

export const setData = function (state, keys, value) {
  let curState = state;
  for (let i = 0; i < keys.length - 1; i++) {
    curState = curState[keys[i]];
  }
  curState[keys[keys.length - 1]] = value;
};

export const deleteData = function (state, keys) {
  let curState = state;
  for (let i = 0; i < keys.length - 1; i++) {
    curState = curState[keys[i]];
  }

  delete curState[keys[keys.length - 1]];
};

export const getParentKeys = function (keys) {
  if (keys.length === 1) return [];
  let arr = [].concat(keys);
  arr.splice(keys.length - 1, 1);
  return arr;
};

export const clearSomeFields = function (keys, data) {
  const newData = Object.assign({}, data);
  keys.forEach((key) => {
    delete newData[key];
  });
  return newData;
};

function getFieldstitle(data) {
  const requiredtitle = [];
  Object.keys(data).map((title) => {
    requiredtitle.push(title);
  });

  return requiredtitle;
}

export function handleSchemaRequired(schema, checked) {
  // console.log(schema)
  if (schema.type === "object") {
    let requiredtitle = getFieldstitle(schema.properties);

    // schema.required = checked ? [].concat(requiredtitle) : [];
    if (checked) {
      schema.required = [].concat(requiredtitle);
    } else {
      delete schema.required;
    }

    handleObject(schema.properties, checked);
  } else if (schema.type === "array") {
    handleSchemaRequired(schema.items, checked);
  } else {
    return schema;
  }
}

function handleObject(properties, checked) {
  for (var key in properties) {
    if (properties[key].type === "array" || properties[key].type === "object")
      handleSchemaRequired(properties[key], checked);
  }
}

export function cloneObject(obj) {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      var newArr = [];
      obj.forEach(function (item, index) {
        newArr[index] = cloneObject(item);
      });
      return newArr;
    } else {
      var newObj = {};
      for (var key in obj) {
        newObj[key] = cloneObject(obj[key]);
      }
      return newObj;
    }
  } else {
    return obj;
  }
}

export const validateJsonFormat = (formData, path = "root", line = 0) => {
  const errors = [];
  const type = getDataType(formData);

  if (type === "undefined") {
    errors.push({
      type,
      value: formData,
      error: "无法识别的数据类型",
      path,
      line,
    });
  }

  if (type === "null") {
    errors.push({
      type,
      value: formData,
      error: "无法识别null对应的具体数据类型",
      path,
      line,
    });
  }

  if (type === "object") {
    line++;
    for (const [key, value] of Object.entries(formData)) {
      const result = validateJsonFormat(value, `${path}.${key}`, line);
      errors.push(...result);
      line = result.line;
      line++;
    }
  }

  if (type === "array") {
    line++;
    for (const [index, value] of formData.entries()) {
      const result = validateJsonFormat(value, `${path}[${index}]`, line);
      errors.push(...result);
      line = result.line;
      line++;
    }
  }

  errors.line = line;
  return errors;
};

export const getDataType = (data) => {
  if (typeof data === "boolean") {
    return "boolean";
  }

  if (typeof data === "string") {
    return "string";
  }

  if (typeof data === "number") {
    return "number";
  }

  if (Array.isArray(data)) {
    return "array";
  }

  if (data === null) {
    return "null";
  }

  if (typeof data === "object") {
    return "object";
  }

  return "undefined";
};
