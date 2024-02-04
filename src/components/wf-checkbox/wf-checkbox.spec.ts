import { newSpecPage } from '@stencil/core/testing';
import { WfCheckbox } from './wf-checkbox';

describe('wf-checkbox', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WfCheckbox],
      html: '<wf-checkbox></wf-checkbox>',
    });
    expect(root).toEqualHtml(`
      <wf-checkbox>
        <mock:shadow-root>
          <label>
            <input type="checkbox" />
            <slot>Checkbox</slot>
          </label>
        </mock:shadow-root>
      </wf-checkbox>
    `);
  });
});
