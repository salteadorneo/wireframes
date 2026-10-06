# wf-flex

Flexbox layout.

## Properties

| Property         | Attribute         | Description                                 | Type                                                                                            | Default     |
| ---------------- | ----------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------- |
| `alignItems`     | `align-items`     | Cross-axis alignment                        | `"flex-start" \| "center" \| "flex-end" \| "stretch" \| "baseline"`                             | `undefined` |
| `justifyContent` | `justify-content` | Main-axis distribution                      | `"flex-start" \| "center" \| "flex-end" \| "space-between" \| "space-around" \| "space-evenly"` | `undefined` |
| `gap`            | `gap`             | Space between items                         | `string`                                                                                        | `undefined` |
| `margin`         | `margin`          | Outer margin                                | `string`                                                                                        | `undefined` |
| `height`         | `height`          | Height                                      | `string`                                                                                        | `undefined` |
| `flexDirection`  | `flex-direction`  | Main axis direction, e.g. `row` or `column` | `string`                                                                                        | `undefined` |
| `flexWrap`       | `flex-wrap`       | Whether items wrap onto several lines       | `"wrap" \| "nowrap" \| "wrap-reverse"`                                                          | `undefined` |

## Slots

| Slot | Description |
| ---- | ----------- |
|      | Flex items  |
