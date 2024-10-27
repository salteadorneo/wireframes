import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-grid',
  styleUrl: 'wf-grid.css',
  shadow: true,
})
export class WfGrid {
  @Prop() alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  @Prop() justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  @Prop() justifyItems?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  @Prop() gap?: string;

  render() {
    return (
      <div
        class="grid"
        style={{
          alignItems: this.alignItems,
          justifyContent: this.justifyContent,
          justifyItems: this.justifyItems,
          gap: this.gap,
        }}
      >
        <slot />
      </div>
    );
  }
}
