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
const demoCartButton = document.getElementById("demoCartButton");


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

demoCartButton.addEventListener("click", () => {
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
