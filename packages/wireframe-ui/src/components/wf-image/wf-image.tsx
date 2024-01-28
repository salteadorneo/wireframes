import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-image',
  styleUrl: 'wf-image.css',
  shadow: true,
})
export class WfImage {
  @Prop() width?: string = 'auto';
  @Prop() height?: string = 'auto';
  @Prop() aspectRatio?: string = "1";

  render() {
    return (
      <div
        style={{
          width: this.width,
          height: this.height,
          aspectRatio: this.aspectRatio,
        }} />
    )
  }
} 