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
const mobileNavbar = document.querySelector(".navbar");
const mobileSearchBar = document.querySelector(".mobile-search-bar");
const cartDrawer = document.querySelector(".cart-drawer");
const showOverlay = () => {
  overlay.style.display = "block";
};
const hideOverlay = () => {
  overlay.style.display = "none";
};
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  desktopSearchBar.style.zIndex = "0";
  mobileNavbar.classList.remove("active");
  mobileSearchBar.classList.remove("active");
  cartDrawer.classList.remove("cart-drawer--active");
});
desktopSearchBar.addEventListener("click", () => {
  desktopSearchBar.style.zIndex = "10";
});
