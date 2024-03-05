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
          <label>
            <input type="checkbox" />
            <slot-fb>Checkbox</slot-fb>
          </label>
      </wf-checkbox>
    `);
  });
});
