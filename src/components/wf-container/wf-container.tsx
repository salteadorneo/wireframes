import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-container',
  styleUrl: 'wf-container.css',
  shadow: true,
})
export class WfContainer {
  @Prop() width?: string;
  @Prop() padding?: string;

  render() {
    return (
      <Host
        style={{
          width: this.width,
          padding: this.padding,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
