import { newE2EPage } from '@stencil/core/testing';

describe('wf-lorem', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-lorem></wf-lorem>');
    const element = await page.find('wf-lorem');
    expect(element).toHaveClass('hydrated');
  });
});
