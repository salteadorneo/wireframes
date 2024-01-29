import { newSpecPage } from '@stencil/core/testing';
import { WfP } from './wf-p';

describe('wf-p', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfP],
      html: '<wf-p></wf-p>',
    });
    expect(root).toEqualHtml(`
      <wf-p>
        <mock:shadow-root>
          <p>
            <slot></slot>
          </p>
        </mock:shadow-root>
      </wf-p>
    `);
  });
});
