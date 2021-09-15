/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const header = document.getElementsByClassName('page__header');
const navbarDiv = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const createNavbarListNode = function (id, name, callback) {
  const listNode = document.createElement('li');
  listNode.innerHTML = `<a class="menu__link" id="nav-${id}" href="#${id}" data-id="${id}">${name}</a>`;
  return listNode;
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = function (e) {
  document.getElementById(e.getAttribute('data-id')).scrollIntoView({
    behavior: 'smooth',
  });
};

// check if element hit the viewport
const isInViewport = function (el, buffer) {
  const rect = el.getBoundingClientRect();
  // Add some buffer to make sure that element is within viewport
  return rect.bottom >= buffer && rect.top <= buffer;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function createNavbar() {
  Array.from(sections).forEach((section) => {
    const sectionName = section.getAttribute('data-nav');
    const sectionId = section.id;

    const listNode = createNavbarListNode(
      sectionId,
      sectionName,
      scrollToSection
    );
    navbarDiv.appendChild(listNode);
  });
}

// Add class 'active' to section when near top of viewport
const checkIfSectionInView = function () {
  sections.forEach((section) => {
    window.addEventListener(
      'scroll',
      function (event) {
        if (isInViewport(section, 44)) {
          !section.classList.contains('your-active-class') &&
            section.classList.add('your-active-class');

          document.getElementById(`nav-${section.id}`).classList.add('your-active-class');
        } else {
          section.classList.remove('your-active-class');
          document.getElementById(`nav-${section.id}`).classList.remove('your-active-class');
        }
      },
      false
    );
  });
};
/**
 * End Main Functions
 * Begin Events
 *
 */

(function () {
  // Build menu
  createNavbar();
  // Set sections as active
  checkIfSectionInView();
  // Scroll to section on link click
  navbarDiv.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToSection(e.target);
  });
})();
