import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'wf-link',
  styleUrl: 'wf-link.css',
  shadow: true,
})
export class WfLink {
  @Prop() href?: string = '#';

  render() {
    return (
      <a href={this.href}>
        <slot>Link</slot>
      </a>
    );
  }
}
