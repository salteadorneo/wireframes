import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-video',
  styleUrl: 'wf-video.css',
  shadow: true,
})
export class WfVideo {
  @Prop() width?: string = 'auto';
  @Prop() height?: string = 'auto';
  @Prop() aspectRatio?: string = '16 / 9';

  render() {
    return (
      <div
        style={{
          width: this.width,
          height: this.height,
          aspectRatio: this.aspectRatio,
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=".1" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
      </div>
    );
  }
}
