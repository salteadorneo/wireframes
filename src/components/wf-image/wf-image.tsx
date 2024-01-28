import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-image',
  styleUrl: 'wf-image.css',
  shadow: true,
})
export class WfImage {
  @Prop() width?: string;
  @Prop() height?: string;
  @Prop() aspectRatio?: string;
  @Prop() text?: string;
  @Prop() borderRadius?: string;

  render() {
    const background = this.text
      ? 'var(--background, white)'
      : `linear-gradient(to top left,
          transparent 0%,
          transparent calc(50% - var(--line-width, 2px)),
          var(--line-color, black) 50%,
          transparent calc(50% + var(--line-width, 2px)),
          transparent 100%),
      linear-gradient(to top right,
          transparent 0%,
          transparent calc(50% - var(--line-width, 2px)),
          var(--line-color, black) 50%,
          transparent calc(50% + var(--line-width, 2px)),
          transparent 100%)`;

    return (
      <div
        style={{
          width: this.width,
          height: this.height,
          aspectRatio: this.aspectRatio,
          borderRadius: this.borderRadius,
          background,
        }}
      >
        {this.text}
      </div>
    );
  }
}
