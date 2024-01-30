import { Component, h } from '@stencil/core';

@Component({
  tag: 'wf-hr',
  styleUrl: 'wf-hr.css',
  shadow: true,
})
export class WfHr {
  render() {
    return <hr />;
  }
}
