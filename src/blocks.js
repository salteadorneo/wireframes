
function renderBlock(block, codes) {
  document.querySelector(`#blocks`).innerHTML += `<section id="${block}" class="container">
  <wf-title tag="h3">${capitalizeFirstLetter(block)}</wf-title>
  </section>`
  Object.keys(codes).forEach(key => {
    if (key != "default") {
      document.querySelector(`#${block}`).innerHTML += `<wf-title tag="h4">${capitalizeFirstLetter(key)}</wf-title>`
    }
    document.querySelector(`#${block}`).innerHTML += `<wf-tabs>
  <wf-tab-header slot="header" name="preview">Preview</wf-tab-header>
  <wf-tab-header slot="header" name="code">Code</wf-tab-header>
  <wf-tab-content slot="content" name="preview">
    <section class="components">${codes[key]}</section>
  </wf-tab-content>
  <wf-tab-content slot="content" name="code">
  <pre><code id="${key}" class="language-html"></code></pre>
  </wf-tab-content>
  </wf-tabs>`
    document.querySelector(`#${block} code#${key}`).textContent = codes[key].replace(/%3C/g, '<').replace(/%3E/g, '>');
  });
}

renderBlock('breadcrumb', {
  default: `<wf-flex gap="10px">
<wf-link>Home</wf-link> · 
<wf-link>Products</wf-link> · 
<wf-link>Category</wf-link> · 
<wf-link>Product</wf-link>
</wf-flex>`
});

renderBlock('cards', {
  vertical: `<wf-container padding="16px">
  <wf-image width="220px" aspect-ratio="16/9"></wf-image>
  <wf-title>Card</wf-title>
  <wf-p>Description for card</wf-p>
  <wf-button>Read more</wf-button>
</wf-container>`,
  horizontal: `<wf-container>
  <wf-flex flex-wrap="wrap">
    <wf-image height="180px" aspect-ratio="1/1"></wf-image>
    <div style="padding:8px 16px;">
      <wf-title>Card</wf-title>
      <wf-p>Description for card</wf-p>
      <wf-button>Read more</wf-button>
    </div>
  </wf-flex>
</wf-container>`
});

renderBlock('form', {
  default: `<wf-container width="320px" padding="24px">
  <wf-grid gap="20px">
    <wf-title tag="h4">Login</wf-title>
    <wf-input placeholder="Email"></wf-input>
    <wf-input placeholder="Password"></wf-input>
    <wf-checkbox>Remember me</wf-checkbox>
    <wf-button>Submit</wf-button>
  </wf-grid>
</wf-container>`
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}