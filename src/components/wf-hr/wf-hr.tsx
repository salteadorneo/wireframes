import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'wf-hr',
  styleUrl: 'wf-hr.css',
  shadow: true,
})
export class WfHr {
  @Prop() width?: string;

  render() {
    return <hr style={{
      width: this.width,
    }} />;
  }
}
