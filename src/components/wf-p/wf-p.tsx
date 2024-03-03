import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-p',
  styleUrl: 'wf-p.css',
  shadow: true,
})
export class WfP {
  /**
  * Size of the font
  */
  @Prop() fontSize?: string;
  /**
  * Text align
  */
  @Prop() textAlign?: 'left' | 'center' | 'right' | 'justify';

  render() {
    return (
      <p
        style={{
          fontSize: this.fontSize,
          textAlign: this.textAlign,
        }}
      >
        <slot />
      </p>
    );
  }
}
