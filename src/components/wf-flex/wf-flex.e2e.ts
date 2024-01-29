import { newE2EPage } from '@stencil/core/testing';

describe('wf-flex', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-flex></wf-flex>');
    const element = await page.find('wf-flex');
    expect(element).toHaveClass('hydrated');
  });
});
