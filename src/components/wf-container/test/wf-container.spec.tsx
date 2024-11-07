import { newSpecPage } from '@stencil/core/testing';
import { WfContainer } from '../wf-container';

describe('wf-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [WfContainer],
      html: `<wf-container></wf-container>`,
    });
    expect(page.root).toEqualHtml(`
      <wf-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </wf-container>
    `);
  });
});
