/* eslint-disable import/no-unresolved */
import dropdown from 'htz-a11y-dropdown';
/* eslint-enable import/no-unresolved */

const clickDropdown = dropdown(document.getElementById('noHover'));
const hoverDropdown = dropdown(document.getElementById('hover'), true);

export { clickDropdown, hoverDropdown };
