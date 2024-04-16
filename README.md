# Notice

this repo was forked from json-schema-editor-visual.
Fix `addFieldAction` & `addChildFieldAction` methods when add sibling node or add child node
I have also raised an issue to the Official team.

update: ref to changelog to see more details

# json-schema-editor-visual

A json-schema editor of high efficient and easy-to-use, base on React.

![avatar](json-schema-editor-visual.jpg)

## Usage

```
npm install json-schema-editor-visual
```

```js
const option = {};
import "antd/dist/antd.css";
require("json-schema-editor-visual/dist/main.css");
const schemaEditor = require("json-schema-editor-visual/dist/main.js");
const SchemaEditor = schemaEditor(option);

render(<SchemaEditor />, document.getElementById("root"));
```

## Option Object

| name   | desc                                 | default |
| ------ | ------------------------------------ | ------- |
| `lang` | language, support `en_US` or `zh_CN` | en_US   |

## SchemaEditor Props

| name         | type     | default | desc               |
| ------------ | -------- | ------- | ------------------ |
| `data`       | string   | null    | the data of editor |
| `onChange`   | function | null    |
| `showEditor` | boolean  | false   |

## Links

https://github.com/zyqwst/json-schema-editor-vue
