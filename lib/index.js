import { defineWfButton } from './wf-button.js';
import { defineWfCheckbox } from './wf-checkbox.js';
import { defineWfContainer } from './wf-container.js';
import { defineWfFlex } from './wf-flex.js';
import { defineWfGrid } from './wf-grid.js';
import { defineWfHr } from './wf-hr.js';
import { defineWfImage } from './wf-image.js';
import { defineWfInput } from './wf-input.js';
import { defineWfLink } from './wf-link.js';
import { defineWfLorem } from './wf-lorem.js';
import { defineWfP } from './wf-p.js';
import { defineWfTabs } from './wf-tabs.js';
import { defineWfTitle } from './wf-title.js';
import { defineWfVideo } from './wf-video.js';

export { WfButton, defineWfButton } from './wf-button.js';
export { WfCheckbox, defineWfCheckbox } from './wf-checkbox.js';
export { WfContainer, defineWfContainer } from './wf-container.js';
export { WfFlex, defineWfFlex } from './wf-flex.js';
export { WfGrid, defineWfGrid } from './wf-grid.js';
export { WfHr, defineWfHr } from './wf-hr.js';
export { WfImage, defineWfImage } from './wf-image.js';
export { WfInput, defineWfInput } from './wf-input.js';
export { WfLink, defineWfLink } from './wf-link.js';
export { WfLorem, defineWfLorem } from './wf-lorem.js';
export { WfP, defineWfP } from './wf-p.js';
export { WfTabs, WfTabHeader, WfTabContent, defineWfTabs } from './wf-tabs.js';
export { WfTitle, defineWfTitle } from './wf-title.js';
export { WfVideo, defineWfVideo } from './wf-video.js';

export function defineCustomElements() {
  defineWfTabs();
  defineWfButton();
  defineWfCheckbox();
  defineWfContainer();
  defineWfFlex();
  defineWfGrid();
  defineWfHr();
  defineWfImage();
  defineWfInput();
  defineWfLink();
  defineWfLorem();
  defineWfP();
  defineWfTitle();
  defineWfVideo();
}

defineCustomElements();
