import { newSpecPage } from '@stencil/core/testing';
import { WfInput } from './wf-input';

describe('wf-input', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfInput],
      html: '<wf-input></wf-input>',
    });
    expect(root).toEqualHtml(`
      <wf-input>
        <mock:shadow-root>
          <input>
        </mock:shadow-root>
      </wf-input>
    `);
  });
});
