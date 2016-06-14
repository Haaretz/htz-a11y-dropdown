# ACCESSIBLE DROPDOWN MENU

A simple accessible dropdown menu, with keyboard and screen-reader accessibility in mind.

### Installation
```bash
jspm install github:haaretz/htz-a11y-dropdown
```

### Usage
```js
import dropdown from 'htz-a11y-dropdown';

const foo = document.getElementById('foo');
const bar = dropdown(foo[, expandOnHover, toggleElemClass, menuElemClass]);
```

### Params
|Param|Type|Default|Description|
|---|---|---|---|
|wrapper|HTMLElement| &nbsp;--- |The element containing the toggle element and the dropdown menu itself|
|expandOnHover|Boolean|`false`|Indicates if dropdown expands when toggle element is hovered or focused. When false, the dropdown will expand when the toggle element is clicked|
|toggleElemClass|String|`'js-dropdown-toggle'`|The class used for identifying the toggle element (usually an `a` or `button`)|
|menuElemClass|String|`'js-dropdown-menu'`|The class used for identifying the dropdown menu element (Usually a `ul`)|

### API
|Function|Description|
|---|---|
|showDropdown()|Reveal dropdown|
|hideDropdown()|Hide dropdown|
|toggleDropdown|Toggle dropdown visibility|


### EVENTS
|Event Name|Description|Properties|
|---|---|---|
|dropdown:show|Fired when a dropdown menu is being revealed| `details.toggleElem` - The toggle element.<br/>`details.menuElem` - The dropdown menu element.
|dropdown:hide|Fired when a dropdown menu is being hidden| `details.toggleElem` - The toggle element.<br/>`details.menuElem` - The dropdown menu element.

