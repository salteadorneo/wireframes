import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-button',
  styleUrl: 'wf-button.css',
  shadow: true,
})
export class WfButton {
  @Prop() backgroundColor?: string = 'white';
  @Prop() color?: string = 'black';
  @Prop() borderColor?: string = 'black';

  render() {
    return (
      <button
        style={{
          background: this.backgroundColor,
          color: this.color,
          borderColor: this.borderColor
        }}
      >
        <slot>Button</slot>
      </button>
    )
  }
}
