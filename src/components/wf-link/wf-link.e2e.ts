import { newE2EPage } from '@stencil/core/testing';

describe('wf-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-link></wf-link>');
    const element = await page.find('wf-link');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to content', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-link>Go to</wf-link>');
    const element = await page.find('wf-link');
    expect(element.textContent).toEqual(`Go to`);
  });
});
