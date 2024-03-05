import { Component, h } from '@stencil/core';

@Component({
  tag: 'wf-checkbox',
  styleUrl: 'wf-checkbox.css',
})
export class WfCheckbox {
  render() {
    return (
      <label>
        <input type="checkbox" />
        <slot>Checkbox</slot>
      </label>
    );
  }
}
