function renderComponent(component, code) {
  document.querySelector(`#components`).innerHTML += `<section id="${component}" class="container">
  <wf-title tag="h3">${capitalizeFirstLetter(component)}</wf-title>
  <wf-tabs>
  <wf-tab-header slot="header" name="preview">Preview</wf-tab-header>
  <wf-tab-header slot="header" name="code">Code</wf-tab-header>
  <wf-tab-content slot="content" name="preview">
    <section class="components">${code}</section>
  </wf-tab-content>
  <wf-tab-content slot="content" name="code">
  <pre><code class="language-html"></code></pre>
  </wf-tab-content>
  </wf-tabs>
  </section>`
  document.querySelector(`#${component} code`).textContent = code.replace(/%3C/g, '<').replace(/%3E/g, '>');

  fetch(`components/wf-${component}/readme.md`)
    .then(response => response.ok ? response.text() : '')
    .then(text => {
      text = text.split('\n').slice(1).join('\n');
      text = text.replace(/^(#+) /gm, '$1## ');
      text = text.replace(/`undefined`/g, '');
      text = text.replace(/`/g, '');
      text = text.replace(/"/g, '');
      document.querySelector(`#${component}`).insertAdjacentHTML('beforeend', marked.parse(text));
    });
}

renderComponent('badge', `<wf-flex align-items="center" gap="1rem" flex-wrap="wrap">
  <wf-badge variant="sm"></wf-badge>
  <wf-badge>New</wf-badge>
  <wf-badge variant="lg">Beta</wf-badge>
  <wf-badge variant="xl">Pro</wf-badge>
</wf-flex>`);

renderComponent('button', `<wf-button variant="sm"></wf-button>
<wf-button></wf-button>
<wf-button variant="lg"></wf-button>
<wf-button variant="xl"></wf-button>`);

renderComponent('checkbox', `<wf-checkbox></wf-checkbox>`);

renderComponent('container', `<wf-container width="150px" padding="24px"></wf-container>`);

renderComponent('flex', `<wf-flex gap="2rem">
  <wf-image width="50px"></wf-image>
  <wf-image width="50px"></wf-image>
  <wf-image width="50px"></wf-image>
</wf-flex>`);

renderComponent('grid', `<wf-grid gap="2rem">
  <wf-image width="50px"></wf-image>
  <wf-image width="50px"></wf-image>
  <wf-image width="50px"></wf-image>
</wf-grid>`);

renderComponent('hr', `<wf-hr width="220px"></wf-hr>`);

renderComponent('image', `<wf-flex align-items="end" gap="1rem" flex-wrap="wrap">
  <wf-image width="200px"></wf-image>

  <wf-image aspect-ratio="16/9" width="200px"></wf-image>

  <wf-image aspect-ratio="16/9" width="200px" text="Image"></wf-image>

  <wf-image border-radius="50%" height="100px"></wf-image>

  <wf-image border-radius="50%" height="48px" text="User"></wf-image>
</wf-flex>`);

renderComponent('input', `<wf-input placeholder="Placeholder" width="210px"></wf-input>`)

renderComponent('link', `<wf-link></wf-link>`);

renderComponent('lorem', `<wf-lorem words="250"></wf-lorem>`);

renderComponent('p', `<wf-p>Default text</wf-p>`);

renderComponent('progress', `<wf-grid gap="1rem" style="width:260px;">
  <wf-progress value="25"></wf-progress>
  <wf-progress value="60" variant="lg"></wf-progress>
  <wf-progress></wf-progress>
</wf-grid>`);

renderComponent('radio', `<wf-radio name="plan" checked>Free</wf-radio>
<wf-radio name="plan">Pro</wf-radio>`);

renderComponent('radio-group', `<wf-radio-group>
  <wf-radio value="small" checked>Small</wf-radio>
  <wf-radio value="medium">Medium</wf-radio>
  <wf-radio value="large">Large</wf-radio>
</wf-radio-group>

<wf-radio-group direction="row" gap="1.5rem">
  <wf-radio value="yes" checked>Yes</wf-radio>
  <wf-radio value="no">No</wf-radio>
</wf-radio-group>`);

renderComponent('select', `<wf-select placeholder="Select an option" width="210px"></wf-select>

<wf-select options="Spain,France,Italy" width="210px"></wf-select>`);

renderComponent('slider', `<wf-slider value="40" width="220px"></wf-slider>`);

renderComponent('table', `<wf-table rows="4" cols="3" header width="360px"></wf-table>`);

renderComponent('tabs', `<wf-tabs>
  <wf-tab-header slot="header" name="tab1">Tab 1</wf-tab-header>
  <wf-tab-header slot="header" name="tab2">Tab 2</wf-tab-header>
  <wf-tab-header slot="header" name="tab3">Tab 3</wf-tab-header>
  <wf-tab-content slot="content" name="tab1">
    <wf-p>
      Content for tab 1
    </wf-p>
  </wf-tab-content>
  <wf-tab-content slot="content" name="tab2">
    <wf-p>
      Description for tab 2
    </wf-p>
  </wf-tab-content>
  <wf-tab-content slot="content" name="tab3">
    <wf-p>
      Another content for tab 3
    </wf-p>
  </wf-tab-content>
</wf-tabs>`)

renderComponent('textarea', `<wf-textarea placeholder="Write a message" rows="4" width="260px"></wf-textarea>`);

renderComponent('title', `<wf-title tag="h4">Default title</wf-title>
  
<wf-title tag="h4" variant="sm">Title variant</wf-title>

<wf-title tag="h4" variant="md">Title variant</wf-title>

<wf-title tag="h4" variant="lg">Title variant</wf-title>

<wf-title tag="h4" variant="xl">Title variant</wf-title>`);

renderComponent('video', `<wf-video width="300px"></wf-video>`);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}