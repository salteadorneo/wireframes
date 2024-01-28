import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-link',
  styleUrl: 'wf-link.css',
  shadow: true,
})
export class WfLink {
  @Prop() href?: string;
  @Prop() target?: string;

  render() {
    return (
      <a href={this.href} target={this.target}>
        <slot>Link</slot>
      </a>
    );
  }
}
