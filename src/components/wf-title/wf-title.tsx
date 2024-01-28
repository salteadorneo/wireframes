import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-title',
  styleUrl: 'wf-title.css',
  shadow: true,
})
export class WfP {
  @Prop() variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';

  render() {
    return (
      <this.variant>
        <slot />
      </this.variant>
    );
  }
}
