import { newSpecPage } from '@stencil/core/testing';
import { WfGrid } from './wf-grid';

describe('wf-grid', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfGrid],
      html: '<wf-grid></wf-grid>',
    });
    expect(root).toEqualHtml(`
      <wf-grid>
        <mock:shadow-root>
          <div>
            <slot></slot>
          </div>
        </mock:shadow-root>
      </wf-grid>
    `);
  });
});
