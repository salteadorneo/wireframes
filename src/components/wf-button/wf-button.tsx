import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-button',
  styleUrl: 'wf-button.css',
  shadow: true,
})
export class WfButton {
  @Prop() backgroundColor?: string;
  @Prop() color?: string;
  @Prop() borderColor?: string;
  @Prop() variant?: 'sm' | 'md' | 'lg' | 'xl';

  render() {
    return (
      <button
        class={this.variant}
        style={{
          background: this.backgroundColor,
          color: this.color,
          borderColor: this.borderColor,
        }}
      >
        <slot>Button</slot>
      </button>
    );
  }
}
