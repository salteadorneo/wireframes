import { Component, Prop, h, Element, Listen, State } from '@stencil/core';

@Component({
  tag: 'wf-tabs',
  styleUrl: 'wf-tabs.css',
  shadow: true,
})
export class WfTabs {
  @Prop() names?: string;

  @Element() host: HTMLElement;

  componentDidLoad() {
    const tabsHeaderEl = Array.from(this.host.querySelectorAll('wf-tab-header')) as any[];
    const [tabHeaderEl] = tabsHeaderEl;
    if (!tabHeaderEl) return;
    tabHeaderEl.getChild().then(tabHeader => {
      tabHeader.select();
    });

    const tabsContentEl = Array.from(this.host.querySelectorAll('wf-tab-content')) as any[];
    const [tabContentEl] = tabsContentEl;
    tabContentEl.getChild().then(tabContent => {
      tabContent.select();
    });
  }

  @State()
  current: string = '';

  @Listen('selected')
  onSelectedTab(event: CustomEvent) {
    this.current = event.detail.name;

    const tabsHeaderEl = Array.from(this.host.querySelectorAll('wf-tab-header')) as any[];
    tabsHeaderEl.forEach(tabHeaderEl => {
      tabHeaderEl.getChild().then(tabHeader => {
        tabHeader.unselect();
        if (tabHeader.name === this.current) {
          tabHeader.select();
        }
      });
    });

    const tabsContentEl = Array.from(this.host.querySelectorAll('wf-tab-content')) as any[];
    tabsContentEl.forEach(tabContentEl => {
      tabContentEl.getChild().then(tabContent => {
        tabContent.unselect();
        if (tabContent.name === this.current) {
          tabContent.select();
        }
      });
    });
  }

  render() {
    return [
      <div class="header">
        <slot name="header" />
      </div>,
      <div class="content">
        <slot name="content" />
      </div>,
    ];
  }
}
