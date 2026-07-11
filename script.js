/* =========================
   GOOKIE ORDER V5.0
   STEP 1 — HEADER & DRAWERS
========================= */

"use strict";

const body = document.body;

const pageOverlay = document.getElementById("pageOverlay");

const menuButton = document.getElementById("menuButton");
const menuDrawer = document.getElementById("menuDrawer");
const menuCloseButton = document.getElementById("menuCloseButton");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartCloseButton = document.getElementById("cartCloseButton");


/* =========================
   01. DRAWER HELPERS
========================= */

function getOpenDrawer() {
  return document.querySelector(".drawer.is-open");
}

function openDrawer(drawer, triggerButton) {
  closeAllDrawers();

  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");

  triggerButton.setAttribute("aria-expanded", "true");

  pageOverlay.hidden = false;

  requestAnimationFrame(() => {
    pageOverlay.classList.add("is-visible");
  });

  body.classList.add("drawer-open");

  const closeButton = drawer.querySelector(".drawer-close-button");

  if (closeButton) {
    closeButton.focus();
  }
}

function closeDrawer(drawer) {
  if (!drawer) {
    return;
  }

  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");

  if (drawer === menuDrawer) {
    menuButton.setAttribute("aria-expanded", "false");
  }

  if (drawer === cartDrawer) {
    cartButton.setAttribute("aria-expanded", "false");
  }

  pageOverlay.classList.remove("is-visible");
  body.classList.remove("drawer-open");

  window.setTimeout(() => {
    if (!getOpenDrawer()) {
      pageOverlay.hidden = true;
    }
  }, 260);
}

function closeAllDrawers() {
  document.querySelectorAll(".drawer.is-open").forEach((drawer) => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  });

  menuButton.setAttribute("aria-expanded", "false");
  cartButton.setAttribute("aria-expanded", "false");

  pageOverlay.classList.remove("is-visible");
  body.classList.remove("drawer-open");

  window.setTimeout(() => {
    if (!getOpenDrawer()) {
      pageOverlay.hidden = true;
    }
  }, 260);
}


/* =========================
   02. EVENT LISTENERS
========================= */

menuButton.addEventListener("click", () => {
  openDrawer(menuDrawer, menuButton);
});

cartButton.addEventListener("click", () => {
  openDrawer(cartDrawer, cartButton);
});

menuCloseButton.addEventListener("click", () => {
  closeDrawer(menuDrawer);
  menuButton.focus();
});

cartCloseButton.addEventListener("click", () => {
  closeDrawer(cartDrawer);
  cartButton.focus();
});

pageOverlay.addEventListener("click", () => {
  closeAllDrawers();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openDrawerElement = getOpenDrawer();

    if (openDrawerElement) {
      closeDrawer(openDrawerElement);
    }
  }
});

document.querySelectorAll(".drawer-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    closeAllDrawers();
  });
});

/* =========================
   03. BOX BUILDER
========================= */

const boxSizeButtons = document.querySelectorAll(".box-size-card");
const cookieBoxSlots = document.getElementById("cookieBoxSlots");
const selectedBoxName = document.getElementById("selectedBoxName");
const selectedCookieCount = document.getElementById("selectedCookieCount");
const boxCapacity = document.getElementById("boxCapacity");
const boxHelperText = document.getElementById("boxHelperText");

let currentBoxSize = 6;
let currentBoxName = "Chunky Box";
let selectedCookies = [];


function renderCookieSlots() {
  cookieBoxSlots.innerHTML = "";

  for (let index = 0; index < currentBoxSize; index += 1) {
    const slot = document.createElement("div");
    const cookie = selectedCookies[index];

    slot.className = "cookie-slot";

    if (cookie) {
      slot.classList.add("has-cookie");

      slot.innerHTML = `
        <span class="cookie-slot-number">
          ${String(index + 1).padStart(2, "0")}
        </span>

        <img
          class="cookie-slot-image"
          src="${cookie.image}"
          alt="${cookie.name}"
        >

        <span class="cookie-slot-name">
          ${cookie.name}
        </span>
      `;
    } else {
      slot.innerHTML = `
        <span class="cookie-slot-number">
          ${String(index + 1).padStart(2, "0")}
        </span>
      `;
    }

    cookieBoxSlots.appendChild(slot);
  }

  selectedCookieCount.textContent = selectedCookies.length;
  boxCapacity.textContent = currentBoxSize;

  const remainingCookies = currentBoxSize - selectedCookies.length;

  if (remainingCookies === 0) {
    boxHelperText.textContent = "Your Gookie box is ready! 🎉";
  } else {
    boxHelperText.textContent =
      `Pick ${remainingCookies} more ${
        remainingCookies === 1 ? "cookie" : "cookies"
      } to complete your ${currentBoxName}.`;
  }

  updateFlavourQuantities();
  updateCartCounter();
}

/* =========================
   04. FLAVOUR SELECTION
========================= */

const flavourCards = document.querySelectorAll(".flavour-card");
const headerCartCount = document.getElementById("cartCount");
const cartSelectedCount = document.getElementById("cartSelectedCount");


function addCookie(card) {
  if (selectedCookies.length >= currentBoxSize) {
    boxHelperText.textContent =
      "Your box is already full. Remove a cookie to choose another.";

    return;
  }

  selectedCookies.push({
    id: card.dataset.cookieId,
    name: card.dataset.cookieName,
    image: card.dataset.cookieImage
  });

  renderCookieSlots();
}


function removeCookie(card) {
  const cookieId = card.dataset.cookieId;

  const cookieIndex = selectedCookies
    .map((cookie) => cookie.id)
    .lastIndexOf(cookieId);

  if (cookieIndex === -1) {
    return;
  }

  selectedCookies.splice(cookieIndex, 1);

  renderCookieSlots();
}


function updateFlavourQuantities() {
  flavourCards.forEach((card) => {
    const cookieId = card.dataset.cookieId;

    const quantity = selectedCookies.filter(
      (cookie) => cookie.id === cookieId
    ).length;

    const quantityDisplay = card.querySelector(".flavour-quantity");

    quantityDisplay.textContent = quantity;
  });
}


function updateCartCounter() {
  const totalSelected = selectedCookies.length;

  headerCartCount.textContent = totalSelected;
  headerCartCount.setAttribute(
    "aria-label",
    `${totalSelected} items in cart`
  );

  cartSelectedCount.textContent = totalSelected;
}


flavourCards.forEach((card) => {
  const increaseButton = card.querySelector(".increase-cookie");
  const decreaseButton = card.querySelector(".decrease-cookie");

  increaseButton.addEventListener("click", () => {
    addCookie(card);
  });

  decreaseButton.addEventListener("click", () => {
    removeCookie(card);
  });
});

function selectBoxSize(button) {
  const newBoxSize = Number(button.dataset.boxSize);
  const newBoxName = button.dataset.boxName;

  boxSizeButtons.forEach((boxButton) => {
    boxButton.classList.remove("is-selected");
  });

  button.classList.add("is-selected");

  currentBoxSize = newBoxSize;
  currentBoxName = newBoxName;

  selectedCookies = [];

  selectedBoxName.textContent = currentBoxName;

  renderCookieSlots();
}


boxSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectBoxSize(button);
  });
});


renderCookieSlots();
