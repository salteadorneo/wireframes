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
    return (
      <div
        class={!this.text ? 'img empty' : 'img'}
        style={{
          width: this.width,
          height: this.height,
          aspectRatio: this.aspectRatio,
          borderRadius: this.borderRadius,
        }}
      >
        {this.text}
      </div>
    );
  }
}
