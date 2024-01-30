import { newSpecPage } from '@stencil/core/testing';
import { WfTitle } from './wf-title';

describe('wf-title', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfTitle],
      html: '<wf-title></wf-title>',
    });
    expect(root).toEqualHtml(`
      <wf-title>
        <mock:shadow-root>
          <h1>
            <slot></slot>
          </h1>
        </mock:shadow-root>
      </wf-title>
    `);
  });

  it('renders tag', async () => {
    const { root } = await newSpecPage({
      components: [WfTitle],
      html: '<wf-title tag="h2"></wf-title>',
    });
    expect(root).toEqualHtml(`
      <wf-title tag="h2">
        <mock:shadow-root>
          <h2>
            <slot></slot>
          </h2>
        </mock:shadow-root>
      </wf-title>
    `);
  });
});
