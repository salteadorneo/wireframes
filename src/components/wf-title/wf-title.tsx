import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-title',
  styleUrl: 'wf-title.css',
  shadow: true,
})
export class WfTitle {
  @Prop() variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
  @Prop() fontWeight?: string;
  @Prop() textAlign?: string;

  render() {
    return (
      <this.variant
        style={{
          fontWeight: this.fontWeight,
          textAlign: this.textAlign,
        }}
      >
        <slot />
      </this.variant>
    );
  }
}
