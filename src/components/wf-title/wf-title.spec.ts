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
        <h1></h1>
      </wf-title>
    `);
  });

  it('renders tag', async () => {
    const { root } = await newSpecPage({
      components: [WfTitle],
      html: '<wf-title tag="h2">Hello</wf-title>',
    });
    expect(root).toEqualHtml(`
      <wf-title tag="h2">
        <h2>Hello</h2>
      </wf-title>
    `);
  });
});
