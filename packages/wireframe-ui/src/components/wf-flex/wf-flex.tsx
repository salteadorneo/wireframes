import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-flex',
  styleUrl: 'wf-flex.css',
  shadow: true,
})
export class WfFlex {
  @Prop() alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' = 'flex-start';
  @Prop() justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
  @Prop() gap?: string = '0px';

  render() {
    return (
      <div
        style={{
          justifyContent: this.justifyContent,
          alignItems: this.alignItems,
          gap: this.gap
        }}
      >
        <slot />
      </div>
    )
  }
}