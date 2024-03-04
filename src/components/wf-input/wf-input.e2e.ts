import { newE2EPage } from '@stencil/core/testing';

describe('wf-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-input></wf-input>');
    const element = await page.find('wf-input');
    expect(element).toHaveClass('hydrated');
  });
});
