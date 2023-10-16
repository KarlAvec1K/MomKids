/* ----------- Custom element for localization form ----------------*/
class LocalizationForm extends HTMLElement {
  constructor() {
    super();
    this.elements = {
      input: this.querySelector(
        'input[name="language_code"], input[name="country_code"]'
      ),
      button: this.querySelector("button"),
      panel: this.querySelector("ul"),
    };
    this.elements.button.addEventListener(
      "click",
      this.openSelector.bind(this)
    );
    this.elements.button.addEventListener(
      "focusout",
      this.closeSelector.bind(this)
    );
    this.addEventListener("keyup", this.onContainerKeyUp.bind(this));

    this.querySelectorAll("a").forEach((item) =>
      item.addEventListener("click", this.onItemClick.bind(this))
    );
  }

  hidePanel() {
    this.elements.button.setAttribute("aria-expanded", "false");
    this.elements.panel.setAttribute("hidden", true);
  }

  onContainerKeyUp(event) {
    if (event.code.toUpperCase() !== "ESCAPE") return;

    this.hidePanel();
    this.elements.button.focus();
  }

  onItemClick(event) {
    event.preventDefault();
    const form = this.querySelector("form");
    this.elements.input.value = event.currentTarget.dataset.value;
    if (form) form.submit();
  }

  openSelector() {
    this.elements.button.focus();
    this.elements.panel.toggleAttribute("hidden");
    this.elements.button.setAttribute(
      "aria-expanded",
      (
        this.elements.button.getAttribute("aria-expanded") === "false"
      ).toString()
    );
  }

  closeSelector(event) {
    const shouldClose =
      event.relatedTarget && event.relatedTarget.nodeName === "BUTTON";
    if (event.relatedTarget === null || shouldClose) {
      this.hidePanel();
    }
  }
}
customElements.define("localization-form", LocalizationForm);
/* ----------- Handling the overlay element ------------------------*/
const overlay = document.querySelector(".overlay");
const desktopSearchBar = document.querySelector(".desktop-searchbar");
const navbar = document.querySelector(".navbar");
const mobileSearchBar = document.querySelector(".mobile-search-bar");
const showOverlay = () => {
  overlay.style.display = "block";
};
const hideOverlay = () => {
  overlay.style.display = "none";
};
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  desktopSearchBar.style.zIndex = "0";
  navbar.classList.remove("active");
  mobileSearchBar.classList.remove("active");
});
desktopSearchBar.addEventListener("click", () => {
  desktopSearchBar.style.zIndex = "10";
});
/*---- Define a controller class for managing toggle behavior ---*/
class ToggleController {
  constructor(openSelector, closeSelector, element, overlayElm) {
    this.openToggle = document.querySelector(openSelector);
    this.closeToggle = document.querySelector(closeSelector);
    this.overlay = document.querySelector(overlayElm);
    this.element = document.querySelector(element);
    this.openToggle.addEventListener("click", this.handleOpenClick.bind(this));
    this.closeToggle.addEventListener(
      "click",
      this.handleCloseClick.bind(this)
    );
  }

  handleOpenClick() {
    this.element.classList.add("active");
    this.overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  handleCloseClick() {
    this.element.classList.remove("active");
    this.overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

const toggleMenu = new ToggleController(
  ".hamburger-menu",
  ".hide-navbar",
  ".navbar",
  ".overlay"
);

class MenuDropdownManager {
  constructor() {
    this.caretIcons = document.querySelectorAll(".icon-dropdown");
    this.caretIcons.forEach((icon) => {
      icon.addEventListener("click", () => this.toggleDropdown(icon));
    });
  }
  toggleDropdown(icon) {
    const menuLink = icon.closest(".menu-link");
    const dropdown2 = menuLink.querySelector(".wrapper");
    dropdown2.classList.toggle("open");
  }
}
const menuDropdownManager = new MenuDropdownManager();

const handleSearchVisibility = () => {
  const toggleElement = document.querySelector(".mobile-search-bar");
  toggleElement.classList.toggle("active");
};
