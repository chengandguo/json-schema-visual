# Version 2.0.5(2024.04.16)

### Features:

1.When import json data to generate schema, you can't use `null` data, for the one defines null which
can only be null. This is meaningless

2.add `nullable` switch box to advanced settings.
eg: when you want to define a field which can be null.You can define like this.
Here you can also use combination types like `type: ["string", null]`, but this needs more validation

```JSON
{
  "type": "number",
  "title": "age",
  "nullable": true
}
```
