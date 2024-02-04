import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-title',
  styleUrl: 'wf-title.css',
})
export class WfTitle {
  @Prop() tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
  @Prop() fontWeight?: string;
  @Prop() textAlign?: string;
  @Prop() variant?: 'sm' | 'md' | 'lg' | 'xl';

  render() {
    return (
      <this.tag
        class={this.variant}
        style={{
          fontWeight: this.fontWeight,
          textAlign: this.textAlign,
        }}
      >
        <slot />
      </this.tag>
    );
  }
}
