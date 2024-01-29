import { newSpecPage } from '@stencil/core/testing';
import { WfTabs } from './wf-tabs';

describe('wf-tabs', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfTabs],
      html: '<wf-tabs></wf-tabs>',
    });
    expect(root).toEqualHtml(`
      <wf-tabs>
        <mock:shadow-root>
          <div class="header">
            <slot name="header"></slot>
          </div>
          <div class="content">
            <slot name="content"></slot>
          </div>
        </mock:shadow-root>
      </wf-tabs>
    `);
  });
});
