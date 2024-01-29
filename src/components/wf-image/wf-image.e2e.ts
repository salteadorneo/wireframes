import { newE2EPage } from '@stencil/core/testing';

describe('wf-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-image></wf-image>');
    const element = await page.find('wf-image');
    expect(element).toHaveClass('hydrated');
  });
});
