import { Component, Prop, h, Event, EventEmitter, State, Method } from '@stencil/core';

@Component({
  tag: 'wf-tab-header',
  styleUrl: 'wf-tab-header.css',
  shadow: true,
})
export class WfTabHeader {
  @Prop() name?: string;

  id: string = crypto.randomUUID();

  @Method()
  async getChild() {
    return {
      select: this.select.bind(this),
      unselect: this.unselect.bind(this),
      name: this.name,
    };
  }

  @Event()
  selected: EventEmitter;

  onClick() {
    this.selected.emit(this);
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
    const classes = {
      selected: this.isSelected,
    };

    return (
      <div class={classes} onClick={this.onClick.bind(this)}>
        <slot />
      </div>
    );
  }
}
