# wf-tabs

Tabs. Use `wf-tab-header` elements in the `header` slot and `wf-tab-content` elements in the `content` slot.

## Properties

| Property | Attribute | Description            | Type     | Default     |
| -------- | --------- | ---------------------- | -------- | ----------- |
| `names`  | `names`   | Not used at the moment | `string` | `undefined` |

## Slots

| Slot      | Description               |
| --------- | ------------------------- |
| `header`  | `wf-tab-header` elements  |
| `content` | `wf-tab-content` elements |

### wf-tab-header

Tab header (`wf-tab-header`).

### Properties

| Property | Attribute | Description                                       | Type     | Default     |
| -------- | --------- | ------------------------------------------------- | -------- | ----------- |
| `name`   | `name`    | Name linking the header with its `wf-tab-content` | `string` | `undefined` |

### Slots

| Slot | Description |
| ---- | ----------- |
|      | Tab title   |

### wf-tab-content

Tab content (`wf-tab-content`).

### Properties

| Property | Attribute | Description                                       | Type     | Default     |
| -------- | --------- | ------------------------------------------------- | -------- | ----------- |
| `name`   | `name`    | Name linking the content with its `wf-tab-header` | `string` | `undefined` |

### Slots

| Slot | Description |
| ---- | ----------- |
|      | Tab content |
