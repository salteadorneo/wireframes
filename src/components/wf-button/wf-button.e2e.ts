import { newE2EPage } from '@stencil/core/testing';

describe('wf-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-button></wf-button>');
    const element = await page.find('wf-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-button>Test</wf-button>');
    const element = await page.find('wf-button');
    expect(element.textContent).toEqual(`Test`);
  });
});
