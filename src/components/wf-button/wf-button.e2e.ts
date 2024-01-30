import { newE2EPage } from '@stencil/core/testing';

describe('wf-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-button></wf-button>');
    const element = await page.find('wf-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to content', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-button>Test</wf-button>');
    const element = await page.find('wf-button');
    expect(element.textContent).toEqual(`Test`);
  });

  it('renders variant', async () => {
    const page = await newE2EPage();

    await page.setContent('<wf-button variant="sm">Small</wf-button>');
    const element = await page.find('wf-button');
    expect(element.textContent).toEqual(`Small`);
  });
});
