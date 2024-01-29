import { newE2EPage } from '@stencil/core/testing';

describe('wf-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-tabs></wf-tabs>');
    const element = await page.find('wf-tabs');
    expect(element).toHaveClass('hydrated');
  });

  it('renders tab header', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-tab-header></wf-tab-header>');
    const element = await page.find('wf-tab-header');
    expect(element).toHaveClass('hydrated');
  });

  it('renders tab content', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-tab-content></wf-tab-content>');
    const element = await page.find('wf-tab-content');
    expect(element).toHaveClass('hydrated');
  });
});
