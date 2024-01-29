import { newSpecPage } from '@stencil/core/testing';
import { WfLink } from './wf-link';

describe('wf-link', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfLink],
      html: '<wf-link></wf-link>',
    });
    expect(root).toEqualHtml(`
      <wf-link>
        <mock:shadow-root>
          <a>
            <slot>Link</slot>
          </a>
        </mock:shadow-root>
      </wf-link>
    `);
  });
});
