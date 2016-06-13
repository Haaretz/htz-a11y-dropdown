/**
 *  HTZ ACCESSIBLE DROPDOWN MENU
 *
 * A simple dropdown menu with accessibilty in mind
 *
 * @module htz-a11y-dropdown
 * @license MIT
 */

import dispatchEvent from 'htz-dispatch-event';

/**
 * Initialize an accessible dropdown menu
 *
 * @param {HTMLElement} wrapper - The element containing the toggle element
 *    and the dropdown menu itself.
 * @param {Boolean} [expandOnHover=false] - Indicates if dropdown expands when
 *    toggle element is hovered or focused. When false, the dropdown will expand
 *    when the toggle element is clicked.
 * @param {String} [toggleElemClass='js-dropdown-toggle'] - The class used for
 *    identifying the toggle element (usually an `a` or `button`).
 * @param {String} [menuElemClass='js-dropdown-menu'] - The class used for
 *    identifying the dropdown menu element (Usually a `ul`).
 *
 * @return {module:htz-a11y-dropdown~API} - Public API
 */
export default function dropdown(
  wrapper,
  expandOnHover = false,
  toggleElemClass = 'js-dropdown-toggle',
  menuElemClass = 'js-dropdown-menu'
) {
  const blurEvent = window.focusout ? 'focusout' : 'blur';

  // HTML ELEMENTS
  const toggleElem = wrapper.getElementsByClassName(toggleElemClass)[0];
  const menuElem = wrapper.getElementsByClassName(menuElemClass)[0];

  let dropdownIsHidden = true;

  // Set aria enhancements
  toggleElem.setAttribute('aria-has-popup', true);

  /**
   * Show the dropdown menu
   * @callback module:htz-a11y-dropdown~showDropdown
   * @fires module:htz-a11y-dropdown~dropdown:show
   *
   * @access public
   */
  function showDropdown() {
    if (dropdownIsHidden) {
      menuElem.setAttribute('aria-hidden', false);
      dropdownIsHidden = false;

      /**
       * Fired whenever a dropdown is being shown.
       * @event module:htz-a11y-dropdown~dropdown:show
       * @type {Object}
       * @prop {Object} details
       * @prop {HTMLElement} details.toggleElem - The toggle elem
       * @prop {HTMLElement} details.menuElem - The menu element.
       */
      dispatchEvent(wrapper, 'dropdown:show', {
        toggleElem,
        menuElem,
      });
    }
  }

  /**
   * Hide the dropdown menu
   * @callback module:htz-a11y-dropdown~hideDropdown
   * @fires module:htz-a11y-dropdown~dropdown:hide
   *
   * @access public
   */
  function hideDropdown() {
    if (!dropdownIsHidden) {
      menuElem.setAttribute('aria-hidden', true);
      dropdownIsHidden = true;

      /**
       * Fired whenever a dropdown is being hidden.
       * @event module:htz-a11y-dropdown~dropdown:hide
       * @type {Object}
       * @prop {Object} details
       * @prop {HTMLElement} details.toggleElem - The toggle elem
       * @prop {HTMLElement} details.menuElem - The menu element.
       */
      dispatchEvent(wrapper, 'dropdown:hide', {
        toggleElem,
        menuElem,
      });
    }
  }

  /**
   * Toggle dropdown menu visibility
   * @callback module:htz-a11y-dropdown~toggleDropdown
   *
   * @access public
   */
  function toggleDropdown() {
    dropdownIsHidden ? showDropdown() : hideDropdown();
  }

  /**
   * Check if an element contains another element
   *
   * @param {HTMLElement} container - The container element
   * @param {HTMLElement} elem - The element to check
   *
   * @return {Boolean} - Indicates if `container` contains `elem`.
   *
   * @private
   */
  function hasElement(container, elem) {
    // const parent = e.currentTarget;
    const descendants = Array.from(container.querySelectorAll('*'));
    // const next = e.relatedTarget;

    return descendants.indexOf(elem) > -1;
  }


  if (expandOnHover) {
    wrapper.addEventListener('mouseenter', showDropdown);
    wrapper.addEventListener('mouseleave', hideDropdown);
    toggleElem.addEventListener('focus', showDropdown);
  }
  else {
    toggleElem.addEventListener('click', (e) => {
      // Only handle left-clicks
      if (e.button === 0) {
        e.preventDefault();

        toggleDropdown();
      }
    });
  }

  // Close when losing focus
  wrapper.addEventListener(
    blurEvent,
    (e) => {
      if (!hasElement(e.currentTarget, e.relatedTarget)) hideDropdown();
    },
    true
  );

  // Close on `escape`
  wrapper.addEventListener(
    'keydown',
    (e) => {
      if (e.keyCode === 27) {
        toggleElem.focus();
        hideDropdown();
      }
    },
    true
  );

  /**
   * A public API for programmatically controlling the dropdown instance.
   * @typedef {Object} module:htz-a11y-dropdown~API
   * @prop {module:htz-a11y-dropdown~showDropdown} showDropdown - Reveal dropdown.
   * @prop {module:htz-a11y-dropdown~hideDropdown} hideDropdown - Hide dropdown.
   * @prop {module:htz-a11y-dropdown~toggleDropdown} toggleDropdown - Toggle dropdown visibility.
   */
  return {
    showDropdown,
    hideDropdown,
    toggleDropdown,
  };
}
