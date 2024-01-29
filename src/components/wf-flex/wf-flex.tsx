import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-flex',
  styleUrl: 'wf-flex.css',
  shadow: true,
})
export class WfFlex {
  @Prop() alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  @Prop() justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  @Prop() gap?: string;
  @Prop() margin?: string;
  @Prop() height?: string;
  @Prop() flexDirection?: string;

  render() {
    return (
      <div
        style={{
          flexDirection: this.flexDirection,
          justifyContent: this.justifyContent,
          alignItems: this.alignItems,
          gap: this.gap,
          margin: this.margin,
          height: this.height,
        }}
      >
        <slot />
      </div>
    );
  }
}
