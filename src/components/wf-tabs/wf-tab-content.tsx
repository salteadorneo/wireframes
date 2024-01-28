import { Component, Prop, h, State, Method } from '@stencil/core';

@Component({
  tag: 'wf-tab-content',
  shadow: true,
})
export class WfTabContent {
  @Prop() name?: string;

  @Method()
  async getChild() {
    return {
      select: this.select.bind(this),
      unselect: this.unselect.bind(this),
      name: this.name,
    };
  }

  @State()
  isSelected: boolean = false;

  unselect() {
    this.isSelected = false;
  }

  select() {
    this.isSelected = true;
  }

  render() {
    if (!this.isSelected) {
      return null;
    }
    return (
      <div>
        <slot />
      </div>
    );
  }
}
