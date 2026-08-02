"use strict";
const gookieCatalogue = [
  {
    id: "wonder-chip",
    name: "Wonder Chip",
    subtitle: "Classic Chocolate Chip",
    description:
      "The cookie that started the wonder — golden, chunky and loaded with chocolate in every bite.",
    image: "wonder-chip.png",
  },
  {
    id: "choco-loco",
    name: "Choco Loco",
    subtitle: "Milk Chocolate Chip",
    description:
      "A joyful chocolate overload for days when one kind of chocolate is simply not enough.",
    image: "choco-loco.png",
  },
  {
    id: "dark-crush",
    name: "Dark Crush",
    subtitle: "Dark Chocolate & Sea Salt",
    description:
      "Deep cocoa, dark chocolate and a little sea salt for the perfect bold, balanced bite.",
    image: "dark-crush.png",
  },
  {
    id: "red-bloom",
    name: "Red Bloom",
    subtitle: "Red Velvet",
    description:
      "Soft red velvet charm with creamy white chocolate woven through every chunky bite.",
    image: "red-bloom.png",
  },
  {
    id: "matcha-matchy",
    name: "Matcha Matchy",
    subtitle: "Matcha & Macadamia",
    description:
      "Earthy matcha, creamy white chocolate and roasted macadamia in one very happy match.",
    image: "matcha-matchy.png",
  },
  {
    id: "dream-cream",
    name: "Dream Cream",
    subtitle: "Cookies & Cream",
    description:
      "Chocolate cookie crumbs, creamy notes and the kind of comfort that disappears far too quickly.",
    image: "dream-cream.png",
  },
  {
    id: "mallow-melt",
    name: "Mallow Melt",
    subtitle: "S'mores",
    description:
      "Toasty marshmallow comfort with chocolate and cookie goodness tucked into every bite.",
    image: "mallow-melt.png",
  },
  {
    id: "biscoff-boom",
    name: "Biscoff Boom",
    subtitle: "Biscoff Filled",
    description:
      "Caramelised cookie flavour with a soft Biscoff centre that goes boom the moment you bite in.",
    image: "biscoff-boom.png",
  },
  {
    id: "choki-chomp",
    name: "Choki Chomp",
    subtitle: "Chocolate Hazelnut Filled",
    description:
      "A playful chocolate-hazelnut centre wrapped inside a chunky cookie made for serious chomping.",
    image: "choki-chomp.png",
  },
  {
    id: "coffee-kiss",
    name: "Coffee Kiss",
    subtitle: "Tiramisu Filled",
    description:
      "A gentle coffee kiss with creamy tiramisu-inspired flavour inside a soft, chunky cookie.",
    image: "coffee-kiss.png",
  },
  {
    id: "monthly-wonder",
    name: "Monthly Wonder",
    subtitle: "Limited Monthly Flavour",
    description:
      "A new chunky wonder that changes with the month — here for a delicious time, not a long time.",
    image: "monthly-wonder.png",
  },
];
const gookiePicks = {
  "first-timer": {
    id: "first-timer",
    name: "First-Timer",
    kicker: "START HERE",
    description: "A friendly introduction to four different sides of Gookie.",
    quantity: 4,
    price: 36,
    image: "first-timer-box.png",
    fallbackImage: "wonder-chip.png",
    cookies: [
      "wonder-chip",
      "dark-crush",
      "matcha-matchy",
      "biscoff-boom",
    ],
    revealFlavours: true,
  },
  "the-classics": {
    id: "the-classics",
    name: "The Classics",
    kicker: "SIMPLE. TIMELESS. GOOD.",
    description: "Six Wonder Chips for anyone who knows exactly what they love.",
    quantity: 6,
    price: 52,
    image: "the-classics-box.png",
    fallbackImage: "wonder-chip.png",
    cookies: Array(6).fill("wonder-chip"),
    revealFlavours: true,
  },
  "surprise-box": {
    id: "surprise-box",
    name: "Surprise Box",
    kicker: "NO PEEKING",
    description:
      "Six mixed Gookies selected by Team Gookie. The flavours are part of the surprise.",
    quantity: 6,
    price: 52,
    image: "surprise-box.png",
    fallbackImage: "monthly-wonder.png",
    cookies: [
      "red-bloom",
      "dream-cream",
      "mallow-melt",
      "choki-chomp",
      "coffee-kiss",
      "monthly-wonder",
    ],
    revealFlavours: false,
  },
  "full-wonder": {
    id: "full-wonder",
    name: "Full Wonder",
    kicker: "THE FULL EXPERIENCE",
    description: "A full-sized tour through the colourful world of Gookie.",
    quantity: 12,
    price: 99,
    image: "full-wonder-box.png",
    fallbackImage: "monthly-wonder.png",
    cookies: [
      "wonder-chip",
      "wonder-chip",
      "choco-loco",
      "dark-crush",
      "red-bloom",
      "matcha-matchy",
      "dream-cream",
      "mallow-melt",
      "biscoff-boom",
      "choki-chomp",
      "coffee-kiss",
      "monthly-wonder",
    ],
    revealFlavours: true,
  },
};

const GOOKIE_PRICING = Object.freeze({
  4: 39,
  6: 56,
  12: 108,
});
const GOOKIE_WHATSAPP_NUMBER = "60102810487";
const GOOKIE_DELIVERY_FEE = 0; // Update here when courier pricing is final.

const $ = (id) => document.getElementById(id),
  body = document.body,
  pageOverlay = $("pageOverlay"),
  menuButton = $("menuButton"),
  cartButton = $("cartButton"),
  menuDrawer = $("menuDrawer"),
  cartDrawer = $("cartDrawer"),
  menuCloseButton = $("menuCloseButton"),
  cartCloseButton = $("cartCloseButton"),
  marqueeShell = $("marqueeShell"),
  marqueeTrack = $("marqueeTrack"),
  marqueePrev = $("marqueePrev"),
  marqueeNext = $("marqueeNext"),
  cookieModal = $("cookieModal"),
  cookieModalClose = $("cookieModalClose"),
  modalCookieImage = $("modalCookieImage"),
  modalCookieSubtitle = $("modalCookieSubtitle"),
  modalCookieName = $("modalCookieName"),
  modalCookieDescription = $("modalCookieDescription"),
  getYourGookiesButton = $("getYourGookiesButton"),
  showBuildYourBox = $("showBuildYourBox"),
  showGookiesChoice = $("showGookiesChoice"),
  buildYourBoxSection = $("build-your-box"),
  gookiesChoiceSection = $("gookies-choice"),
  buildBoxSizeOptions = $("buildBoxSizeOptions"),
  buildSelectedBoxName = $("buildSelectedBoxName"),
  buildSelectedCount = $("buildSelectedCount"),
  buildBoxCapacity = $("buildBoxCapacity"),
  buildBoxProgress = $("buildBoxProgress"),
  buildBoxProgressFill = $("buildBoxProgressFill"),
  buildBoxProgressText = $("buildBoxProgressText"),
  buildCookieSlots = $("buildCookieSlots"),
  buildBoxHelper = $("buildBoxHelper"),
  openFlavourSelector = $("openFlavourSelector"),
  flavourModal = $("flavourModal"),
  flavourModalClose = $("flavourModalClose"),
  flavourModalTitle = $("flavourModalTitle"),
  flavourSelectedCount = $("flavourSelectedCount"),
  flavourBoxCapacity = $("flavourBoxCapacity"),
  flavourNameList = $("flavourNameList"),
  saveFlavourSelection = $("saveFlavourSelection"),
  collectionGrid = $("collectionGrid"),
  gookiePickModal = $("gookiePickModal"),
  gookiePickModalClose = $("gookiePickModalClose"),
  gookiePickModalImage = $("gookiePickModalImage"),
  gookiePickModalKicker = $("gookiePickModalKicker"),
  gookiePickModalTitle = $("gookiePickModalTitle"),
  gookiePickModalDescription = $("gookiePickModalDescription"),
  gookiePickModalIncluded = $("gookiePickModalIncluded"),
  gookiePickModalQuantity = $("gookiePickModalQuantity"),
  gookiePickModalPrice = $("gookiePickModalPrice"),
  addGookiePickToCart = $("addGookiePickToCart"),
  cartCount = $("cartCount"),
  cartSelectedCount = $("cartSelectedCount"),
  cartEmptyState = $("cartEmptyState"),
  cartContent = $("cartContent"),
  cartOrderSummary = $("cartOrderSummary"),
  checkoutButton = $("checkoutButton"),
  checkoutModal = $("checkoutModal"),
  checkoutModalClose = $("checkoutModalClose"),
  checkoutModalTitle = $("checkoutModalTitle"),
  customerDetailsForm = $("customerDetailsForm"),
  customerName = $("customerName"),
  customerPhone = $("customerPhone"),
  deliveryAddress = $("deliveryAddress"),
  deliveryPostcode = $("deliveryPostcode"),
  orderNotes = $("orderNotes"),
  checkoutReview = $("checkoutReview"),
  checkoutDetailsSummary = $("checkoutDetailsSummary"),
  checkoutReviewCount = $("checkoutReviewCount"),
  checkoutOrderReview = $("checkoutOrderReview"),
  editCustomerDetails = $("editCustomerDetails"),
  proceedToPaymentButton = $("proceedToPaymentButton"),
  checkoutNextStepNote = $("checkoutNextStepNote"),
  paymentModal = $("paymentModal"),
  paymentModalClose = $("paymentModalClose"),
  paymentOrderId = $("paymentOrderId"),
  paymentSubtotal = $("paymentSubtotal"),
  paymentDelivery = $("paymentDelivery"),
  paymentTotal = $("paymentTotal"),
  paymentBoxSummary = $("paymentBoxSummary"),
  paymentProofSaved = $("paymentProofSaved"),
  continueToWhatsAppButton = $("continueToWhatsAppButton"),
  orderCreationLoader = $("orderCreationLoader"),
  orderCreationStatus = $("orderCreationStatus"),
  orderCreationBox = $("orderCreationBox");
let buildBoxSize = 0,
  buildBoxName = "",
  buildSelection = [],
  activeGookiePick = null,
  currentOrder = null,
  customerDetails = null,
  currentOrderId = null,
  isCreatingOrder = false,
  orderCreationStatusTimer = null,
  marqueeAnimationFrame = null,
  marqueeLastTimestamp = 0,
  marqueePaused = false,
  marqueeDragging = false,
  marqueePointerStartX = 0,
  marqueeScrollStart = 0,
  marqueeDragDistance = 0,
  marqueeResumeTimer = null,
  marqueeAutoPosition = 0;
const getCookieById = (id) => gookieCatalogue.find((c) => c.id === id);
function openOverlay() {
  pageOverlay.hidden = false;
  requestAnimationFrame(() => pageOverlay.classList.add("is-visible"));
  body.classList.add("no-scroll");
}
function closeOverlayIfIdle() {
  if (document.querySelector(".drawer.is-open,.modal.is-open")) return;
  pageOverlay.classList.remove("is-visible");
  body.classList.remove("no-scroll");
  setTimeout(() => (pageOverlay.hidden = true), 260);
}
function scrollToSection(s) {
  s.scrollIntoView({ behavior: "smooth", block: "start" });
}
function openDrawer(d, b) {
  closeAllDrawers();
  d.classList.add("is-open");
  d.setAttribute("aria-hidden", "false");
  b.setAttribute("aria-expanded", "true");
  openOverlay();
}
function closeDrawer(d) {
  d.classList.remove("is-open");
  d.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  cartButton.setAttribute("aria-expanded", "false");
  closeOverlayIfIdle();
}
function closeAllDrawers() {
  document.querySelectorAll(".drawer.is-open").forEach((d) => {
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
  });
  menuButton.setAttribute("aria-expanded", "false");
  cartButton.setAttribute("aria-expanded", "false");
  closeOverlayIfIdle();
}
function openModal(m) {
  m.classList.add("is-open");
  m.setAttribute("aria-hidden", "false");
  openOverlay();
}
function closeModal(m) {
  m.classList.remove("is-open");
  m.setAttribute("aria-hidden", "true");
  closeOverlayIfIdle();
}
function closeAllModals() {
  document.querySelectorAll(".modal.is-open").forEach((m) => {
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
  });
  closeOverlayIfIdle();
}
/* =========================================================
   MEET THE GOOKIES — PREMIUM SNAP CAROUSEL
========================================================= */
let marqueeCurrentIndex = 0;
let marqueeScrollTimer = null;
let marqueeAutoplayTimer = null;
let marqueePointerCurrentX = 0;


/* CREATE ONE COOKIE CARD */

function createMarqueeCard(cookie, index) {
  const button = document.createElement("button");

  button.className = "marquee-card";
  button.type = "button";
  button.dataset.slideIndex = String(index);

  button.innerHTML = `
    <span class="marquee-card-image">
      <img
        src="${cookie.image}"
        alt="${cookie.name}"
        loading="lazy"
      >
    </span>

    <span class="marquee-card-copy">
      <small>${cookie.subtitle}</small>
      <strong>${cookie.name}</strong>
    </span>
  `;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (marqueeDragDistance > 8) {
      marqueeDragDistance = 0;
      return;
    }

    pauseMarquee();
    openCookieDetails(cookie);
    marqueeDragDistance = 0;
  });

  return button;
}


/* RENDER CARDS + PAGINATION */

function renderMarquee() {
  if (!marqueeTrack || !marqueeShell) return;

  marqueeTrack.innerHTML = "";

  gookieCatalogue.forEach((cookie, index) => {
    marqueeTrack.appendChild(
      createMarqueeCard(cookie, index)
    );
  });

  createMarqueePagination();
}


/* CREATE DOTS AUTOMATICALLY */

function createMarqueePagination() {
  const wrapper = marqueeShell.closest(".marquee-wrapper");

  if (!wrapper) return;

  let pagination =
    wrapper.querySelector(".marquee-pagination");

  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "marquee-pagination";
    pagination.setAttribute(
      "aria-label",
      "Choose a Gookie"
    );

    wrapper.appendChild(pagination);
  }

  pagination.innerHTML = "";

  gookieCatalogue.forEach((cookie, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "marquee-dot";
    dot.setAttribute(
      "aria-label",
      `Show ${cookie.name}`
    );

    dot.addEventListener("click", () => {
      goToMarqueeSlide(index, true);
    });

    pagination.appendChild(dot);
  });

  updateMarqueeActiveState(0);
}


/* GET ALL CARDS */

function getMarqueeCards() {
  return Array.from(
    marqueeTrack.querySelectorAll(".marquee-card")
  );
}


/* MOVE TO A SPECIFIC COOKIE */

function goToMarqueeSlide(index, userAction = false) {
  const cards = getMarqueeCards();

  if (!cards.length) return;

  const total = cards.length;

  marqueeCurrentIndex =
    (index + total) % total;

  const card = cards[marqueeCurrentIndex];

 const targetLeft =
  card.offsetLeft -
  (marqueeShell.clientWidth - card.offsetWidth) / 2;

marqueeShell.scrollTo({
  left: targetLeft,
  behavior: "smooth",
});

  updateMarqueeActiveState(marqueeCurrentIndex);

  if (userAction) {
    pauseMarquee();
    resumeMarquee(4500);
  }
}


/* PREVIOUS / NEXT */

function scrollMarqueeByCard(direction) {
  goToMarqueeSlide(
    marqueeCurrentIndex + direction,
    true
  );
}


/* ACTIVE COOKIE + ACTIVE DOT */

function updateMarqueeActiveState(index) {
  const cards = getMarqueeCards();

  cards.forEach((card, cardIndex) => {
    const isActive = cardIndex === index;

    card.classList.toggle("is-active", isActive);

    card.setAttribute(
      "aria-current",
      isActive ? "true" : "false"
    );
  });

  document
    .querySelectorAll(".marquee-dot")
    .forEach((dot, dotIndex) => {
      dot.classList.toggle(
        "is-active",
        dotIndex === index
      );
    });
}


/* FIND CARD CLOSEST TO SCREEN CENTRE */

function updateMarqueeIndexFromScroll() {
  const cards = getMarqueeCards();

  if (!cards.length) return;

  const shellBox =
    marqueeShell.getBoundingClientRect();

  const shellCentre =
    shellBox.left + shellBox.width / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {
    const cardBox = card.getBoundingClientRect();

    const cardCentre =
      cardBox.left + cardBox.width / 2;

    const distance =
      Math.abs(cardCentre - shellCentre);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  marqueeCurrentIndex = closestIndex;

  updateMarqueeActiveState(closestIndex);
}


/* SCROLL ENDED */

function handleMarqueeScroll() {
  clearTimeout(marqueeScrollTimer);

  marqueeScrollTimer = setTimeout(() => {
    updateMarqueeIndexFromScroll();
  }, 100);
}


/* AUTOPLAY: SLIDE → STOP → SLIDE */

function scheduleNextMarqueeSlide() {
  clearTimeout(marqueeAutoplayTimer);

  if (marqueePaused || document.hidden) return;

  marqueeAutoplayTimer = setTimeout(() => {
    goToMarqueeSlide(
      marqueeCurrentIndex + 1,
      false
    );

    scheduleNextMarqueeSlide();
  }, 3200);
}


function startMarqueeAnimation() {
  if (!marqueeShell || !marqueeTrack) return;

  if (!marqueeShell.dataset.snapReady) {
    marqueeShell.addEventListener(
      "scroll",
      handleMarqueeScroll,
      { passive: true }
    );

    marqueeShell.dataset.snapReady = "true";
  }

  requestAnimationFrame(() => {
    goToMarqueeSlide(0, false);
    scheduleNextMarqueeSlide();
  });
}


/* PAUSE / RESUME */

function pauseMarquee() {
  marqueePaused = true;

  clearTimeout(marqueeAutoplayTimer);

  marqueeTrack.classList.add("is-paused");
}


function resumeMarquee(delay = 0) {
  clearTimeout(marqueeResumeTimer);
  clearTimeout(marqueeAutoplayTimer);

  marqueeResumeTimer = setTimeout(() => {
    marqueePaused = false;

    marqueeTrack.classList.remove("is-paused");

    scheduleNextMarqueeSlide();
  }, delay);
}


/* DESKTOP MOUSE DRAG */

function beginMarqueeDrag(event) {
  if (
    event.pointerType !== "mouse" ||
    event.button !== 0
  ) {
    return;
  }

  marqueeDragging = true;
  marqueeDragDistance = 0;

  marqueePointerStartX = event.clientX;
  marqueePointerCurrentX = event.clientX;
  marqueeScrollStart = marqueeShell.scrollLeft;

  pauseMarquee();
}


function moveMarqueeDrag(event) {
  if (!marqueeDragging) return;

  marqueePointerCurrentX = event.clientX;

  const distance =
    event.clientX - marqueePointerStartX;

  marqueeDragDistance = Math.max(
    marqueeDragDistance,
    Math.abs(distance)
  );

  if (marqueeDragDistance > 8) {
    marqueeShell.classList.add("is-dragging");

    if (
      !marqueeShell.hasPointerCapture(event.pointerId)
    ) {
      marqueeShell.setPointerCapture(event.pointerId);
    }

    marqueeShell.scrollLeft =
      marqueeScrollStart - distance;
  }
}


function endMarqueeDrag(event) {
  if (!marqueeDragging) return;

  const didDrag = marqueeDragDistance > 8;

  marqueeDragging = false;
  marqueeShell.classList.remove("is-dragging");

  if (
    marqueeShell.hasPointerCapture(event.pointerId)
  ) {
    marqueeShell.releasePointerCapture(
      event.pointerId
    );
  }

  if (didDrag) {
    updateMarqueeIndexFromScroll();

    goToMarqueeSlide(
      marqueeCurrentIndex,
      false
    );

    resumeMarquee(4200);
  } else {
    resumeMarquee(500);
  }
}
function openCookieDetails(c) {
  modalCookieImage.src = c.image;
  modalCookieImage.alt = c.name;
  modalCookieSubtitle.textContent = c.subtitle;
  modalCookieName.textContent = c.name;
  modalCookieDescription.textContent = c.description;
  openModal(cookieModal);
}
function closeCookieDetails(resume = true) {
  closeModal(cookieModal);
  if (resume) resumeMarquee();
}
function showOrderSection(show, hide) {
  hide.classList.add("is-hidden");
  show.classList.remove("is-hidden");
  setTimeout(() => scrollToSection(show), 20);
}
function renderCookieSlots(
  container,
  capacity,
  selection,
  onCookieRemove = null,
) {
  container.innerHTML = "";

  for (let i = 0; i < capacity; i++) {
    const cookie = selection[i] ? getCookieById(selection[i]) : null;
    const isRemovable = Boolean(cookie && onCookieRemove);
    const slot = document.createElement(isRemovable ? "button" : "div");

    slot.className = "cookie-slot";

    if (isRemovable) {
      slot.type = "button";
      slot.classList.add("is-removable");
      slot.setAttribute(
        "aria-label",
        `Remove ${cookie.name} from your box`,
      );
    }

    if (cookie) {
      slot.classList.add("has-cookie");
      slot.innerHTML = `
        <img src="${cookie.image}" alt="${cookie.name}">
        <span class="cookie-slot-name">${cookie.name}</span>
        ${
          isRemovable
            ? '<span class="cookie-slot-remove" aria-hidden="true">×</span>'
            : ""
        }
      `;

      if (isRemovable) {
        slot.addEventListener("click", () => onCookieRemove(i));
      }
    }

    container.appendChild(slot);
  }
}
function updateBuildBoxProgress() {
  const selectedCount = buildSelection.length;
  const percentage = buildBoxSize > 0
    ? Math.round((selectedCount / buildBoxSize) * 100)
    : 0;

  buildBoxProgressFill.style.width = `${percentage}%`;
  buildBoxProgress.setAttribute("aria-valuemax", String(buildBoxSize));
  buildBoxProgress.setAttribute("aria-valuenow", String(selectedCount));
  buildBoxProgress.classList.toggle(
    "is-complete",
    buildBoxSize > 0 && selectedCount === buildBoxSize,
  );

  if (buildBoxSize === 0) {
    buildBoxProgressText.textContent = "Choose a box size to begin";
    return;
  }

  buildBoxProgressText.textContent =
    selectedCount === buildBoxSize
      ? "100% complete — your box is ready!"
      : `${percentage}% complete`;
}

function updateBuildActionButton() {
  const hasBoxSize = buildBoxSize > 0;
  const isComplete = hasBoxSize && buildSelection.length === buildBoxSize;

  openFlavourSelector.disabled = !hasBoxSize;
  openFlavourSelector.classList.toggle("is-ready", isComplete);
  openFlavourSelector.textContent = isComplete
    ? "✓ ADD TO CART"
    : buildSelection.length > 0
      ? "EDIT MY GOOKIES"
      : "CHOOSE MY GOOKIES";

  saveFlavourSelection.textContent = isComplete
    ? "✓ ADD TO CART"
    : "COMPLETE YOUR BOX";
}

function selectBuildBox(button) {
  buildBoxSizeOptions
    .querySelectorAll(".box-size-card")
    .forEach((c) => c.classList.remove("is-selected"));
  button.classList.add("is-selected");
  buildBoxSize = Number(button.dataset.boxSize);
  buildBoxName = button.dataset.boxName;
  buildSelection = [];
  buildSelectedBoxName.textContent = buildBoxName;
  buildSelectedCount.textContent = "0";
  buildBoxCapacity.textContent = String(buildBoxSize);
  buildBoxHelper.textContent = `Pick ${buildBoxSize} cookies to complete your ${buildBoxName}.`;
  renderCookieSlots(
    buildCookieSlots,
    buildBoxSize,
    buildSelection,
    removeBuildCookieAtIndex,
  );
  updateBuildBoxProgress();
  updateBuildActionButton();
}
const getBuildQuantity = (id) => buildSelection.filter((x) => x === id).length;
function addBuildCookie(id) {
  if (buildSelection.length < buildBoxSize) {
    buildSelection.push(id);
    updateFlavourSelector();
  }
}
function removeBuildCookie(id) {
  const i = buildSelection.lastIndexOf(id);
  if (i !== -1) {
    buildSelection.splice(i, 1);
    updateFlavourSelector();
  }
}
function removeBuildCookieAtIndex(index) {
  if (index < 0 || index >= buildSelection.length) return;

  buildSelection.splice(index, 1);
  updateFlavourSelector();
}
function renderFlavourList() {
  flavourNameList.innerHTML = "";
  gookieCatalogue.forEach((c) => {
    const row = document.createElement("div");
    row.className = "flavour-row";
    row.innerHTML = `<div class="flavour-row-copy"><strong>${c.name}</strong><small>${c.subtitle}</small></div><div class="quantity-control"><button class="quantity-button" type="button" data-action="remove" aria-label="Remove ${c.name}">−</button><span class="flavour-quantity">${getBuildQuantity(c.id)}</span><button class="quantity-button" type="button" data-action="add" aria-label="Add ${c.name}">+</button></div>`;
    row
      .querySelector('[data-action="remove"]')
      .addEventListener("click", () => removeBuildCookie(c.id));
    row
      .querySelector('[data-action="add"]')
      .addEventListener("click", () => addBuildCookie(c.id));
    flavourNameList.appendChild(row);
  });
}
function updateFlavourSelector() {
  flavourSelectedCount.textContent = String(buildSelection.length);
  flavourBoxCapacity.textContent = String(buildBoxSize);
  saveFlavourSelection.disabled = buildSelection.length !== buildBoxSize;
  renderFlavourList();
  renderCookieSlots(
    buildCookieSlots,
    buildBoxSize,
    buildSelection,
    removeBuildCookieAtIndex,
  );
  buildSelectedCount.textContent = String(buildSelection.length);
  updateBuildBoxProgress();
  updateBuildActionButton();
  renderMiniSlots(buildBoxSize);
  updateAccordionAction();

  const r = buildBoxSize - buildSelection.length;
  buildBoxHelper.textContent =
    r === 0
      ? "Your Gookie box is ready! 🎉"
      : `Pick ${r} more ${r === 1 ? "cookie" : "cookies"} to complete your ${buildBoxName}.`;
}
function openBuildFlavourSelector() {
  flavourModalTitle.textContent = buildBoxName;
  updateFlavourSelector();
  openModal(flavourModal);
}
function saveBuildOrder() {
  if (buildSelection.length !== buildBoxSize) return;

  currentOrder = {
    type: "Build Your Box",
    boxName: buildBoxName,
    boxSize: buildBoxSize,
    cookies: [...buildSelection],
  };

  currentOrderId = null;

  updateCart();
  renderMiniSlots(buildBoxSize);
  updateAccordionAction();

  closeModal(flavourModal);
  openDrawer(cartDrawer, cartButton);
}

function renderGookiePickIncluded(pick) {
  if (!gookiePickModalIncluded) return;

  gookiePickModalIncluded.innerHTML = "";

  if (!pick.revealFlavours) {
    const row = document.createElement("div");
    row.className = "gookie-pick-included-row";
    row.innerHTML = `
      <strong>${pick.quantity} mixed Gookies</strong>
      <span>Flavours are a surprise</span>
    `;
    gookiePickModalIncluded.appendChild(row);
    return;
  }

  const counts = {};
  pick.cookies.forEach((cookieId) => {
    counts[cookieId] = (counts[cookieId] || 0) + 1;
  });

  Object.entries(counts).forEach(([cookieId, quantity]) => {
    const cookie = getCookieById(cookieId);
    if (!cookie) return;

    const row = document.createElement("div");
    row.className = "gookie-pick-included-row";
    row.innerHTML = `
      <strong>${cookie.name}</strong>
      <span>×${quantity}</span>
    `;
    gookiePickModalIncluded.appendChild(row);
  });
}

function openGookiePickDetails(pickId) {
  const pick = gookiePicks[pickId];

  if (
    !pick ||
    !gookiePickModal ||
    !gookiePickModalImage ||
    !gookiePickModalKicker ||
    !gookiePickModalTitle ||
    !gookiePickModalDescription ||
    !gookiePickModalQuantity ||
    !gookiePickModalPrice
  ) {
    console.error("Gookie's Picks popup HTML is missing.");
    return;
  }

  activeGookiePick = pick;

  document.querySelectorAll(".gookies-pick-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.pickId === pickId);
  });

  gookiePickModalImage.onerror = () => {
    gookiePickModalImage.onerror = null;
    gookiePickModalImage.src = pick.fallbackImage;
  };
  gookiePickModalImage.src = pick.image;
  gookiePickModalImage.alt = `${pick.name} Gookie box`;
  gookiePickModalKicker.textContent = pick.kicker;
  gookiePickModalTitle.textContent = pick.name;
  gookiePickModalDescription.textContent = pick.description;
  gookiePickModalQuantity.textContent = `${pick.quantity} Cookies`;
  gookiePickModalPrice.textContent = formatMoney(pick.price);

  renderGookiePickIncluded(pick);
  openModal(gookiePickModal);
}

function addSelectedGookiePickToCart() {
  if (!activeGookiePick) return;

  currentOrder = {
    type: "Gookie's Picks",
    pickId: activeGookiePick.id,
    collectionName: activeGookiePick.name,
    boxName: activeGookiePick.name,
    boxSize: activeGookiePick.quantity,
    price: activeGookiePick.price,
    cookies: [...activeGookiePick.cookies],
  };

  currentOrderId = null;
  updateCart();
  closeModal(gookiePickModal);
  openDrawer(cartDrawer, cartButton);
}

function editCurrentOrder() {
  if (!currentOrder) return;

  closeDrawer(cartDrawer);

  if (currentOrder.type === "Build Your Box") {
    showOrderSection(buildYourBoxSection, gookiesChoiceSection);
    setTimeout(() => {
      openBuildFlavourSelector();
    }, 380);
    return;
  }

  showOrderSection(gookiesChoiceSection, buildYourBoxSection);

  if (currentOrder.pickId) {
    setTimeout(() => {
      openGookiePickDetails(currentOrder.pickId);
    }, 380);
  }
}

function removeCurrentOrder() {
  if (!currentOrder) return;

  currentOrder = null;
  currentOrderId = null;
  updateCart();
}

function updateCart() {
  const total = currentOrder ? currentOrder.cookies.length : 0;

  cartCount.textContent = String(total);
  cartSelectedCount.textContent = String(total);

  if (!currentOrder) {
  cartEmptyState.hidden = false;
  cartContent.hidden = true;
  checkoutButton.disabled = true;
  cartOrderSummary.innerHTML = "";
  return;
}
  cartEmptyState.hidden = true;
  cartContent.hidden = false;
  checkoutButton.disabled = false;

  const counts = {};
  currentOrder.cookies.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const flavourSummary = Object.entries(counts)
    .map(([id, quantity]) => {
      const cookie = getCookieById(id);

      return `
        <div class="cart-flavour-row">
          <div class="cart-flavour-image">
            <img src="${cookie.image}" alt="${cookie.name}">
          </div>

          <div class="cart-flavour-copy">
            <strong>${cookie.name}</strong>
            <span>${cookie.subtitle}</span>
          </div>

          <span class="cart-flavour-quantity">×${quantity}</span>
        </div>
      `;
    })
    .join("");

  const orderLabel = currentOrder.collectionName || currentOrder.boxName;

  cartOrderSummary.innerHTML = `
    <div class="cart-order-card">
      <p class="cart-order-kicker">CURRENT SELECTION</p>
      <strong class="cart-order-title">${currentOrder.type}</strong>
      <span class="cart-order-label">${orderLabel}</span>

      <div class="cart-order-meta">
        <span>${currentOrder.boxName} · ${currentOrder.boxSize} cookies</span>
        <strong>${formatMoney(getOrderSubtotal())}</strong>
      </div>
    </div>

    <div class="cart-flavour-list">
      ${flavourSummary}
    </div>

    <div class="cart-action-row">
      <button class="cart-edit-button" id="editCartOrder" type="button">
        EDIT BOX
      </button>

      <button class="cart-remove-button" id="removeCartOrder" type="button">
        REMOVE
      </button>
    </div>
  `;

  $("editCartOrder").addEventListener("click", editCurrentOrder);
  $("removeCartOrder").addEventListener("click", removeCurrentOrder);
}


function formatMoney(amount) {
  return `RM${Number(amount).toFixed(2)}`;
}

function getOrderSubtotal() {
  if (!currentOrder) return 0;
  return Number.isFinite(currentOrder.price)
    ? currentOrder.price
    : GOOKIE_PRICING[currentOrder.boxSize] || 0;
}

function getOrderTotal() {
  return getOrderSubtotal() + GOOKIE_DELIVERY_FEE;
}

/* =========================================================
   CHECKOUT: CUSTOMER DETAILS & ORDER REVIEW
   ========================================================= */

function normalisePhoneNumber(value) {
  return value.replace(/[\s()-]/g, "");
}

function setFieldError(input, message) {
  const field = input.closest(".form-field");
  const error = $(input.id + "Error");

  field.classList.toggle("has-error", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");

  if (error) error.textContent = message;
}

function validateCustomerDetails() {
  const name = customerName.value.trim();
  const phone = normalisePhoneNumber(customerPhone.value.trim());
  const address = deliveryAddress.value.trim();
  const postcode = deliveryPostcode.value.trim();
  let firstInvalidField = null;

  const validations = [
    {
      input: customerName,
      message: name.length >= 2 ? "" : "Please enter the recipient's full name.",
    },
    {
      input: customerPhone,
      message: /^(?:\+?6?01)[0-46-9]\d{7,8}$/.test(phone)
        ? ""
        : "Please enter a valid Malaysian mobile number.",
    },
    {
      input: deliveryAddress,
      message:
        address.length >= 12
          ? ""
          : "Please enter a complete delivery address.",
    },
    {
      input: deliveryPostcode,
      message: /^\d{5}$/.test(postcode)
        ? ""
        : "Postcode must contain exactly 5 digits.",
    },
  ];

  validations.forEach(({ input, message }) => {
    setFieldError(input, message);
    if (message && !firstInvalidField) firstInvalidField = input;
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    return false;
  }

  customerPhone.value = phone;
  return true;
}

function getCurrentCustomerDetails() {
  return {
    name: customerName.value.trim(),
    phone: normalisePhoneNumber(customerPhone.value.trim()),
    address: deliveryAddress.value.trim(),
    postcode: deliveryPostcode.value.trim(),
    notes: orderNotes.value.trim(),
  };
}

function populateCustomerDetailsForm() {
  if (!customerDetails) return;

  customerName.value = customerDetails.name;
  customerPhone.value = customerDetails.phone;
  deliveryAddress.value = customerDetails.address;
  deliveryPostcode.value = customerDetails.postcode;
  orderNotes.value = customerDetails.notes;
}

function renderCheckoutReview() {
  if (!currentOrder || !customerDetails) return;

  const counts = {};
  currentOrder.cookies.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const flavourRows = Object.entries(counts)
    .map(([id, quantity]) => {
      const cookie = getCookieById(id);
      return `
        <div class="checkout-review-flavour">
          <span>${cookie.name}</span>
          <strong>×${quantity}</strong>
        </div>
      `;
    })
    .join("");

  const notesMarkup = customerDetails.notes
    ? `<span class="checkout-notes"><strong>Order notes</strong>${customerDetails.notes}</span>`
    : "";

  checkoutDetailsSummary.innerHTML = `
    <strong>${customerDetails.name}</strong>
    <span>${customerDetails.address}\n${customerDetails.postcode}</span>
    <span class="checkout-phone">${customerDetails.phone}</span>
    ${notesMarkup}
  `;

  checkoutReviewCount.textContent = `${currentOrder.boxSize} cookies`;
  checkoutOrderReview.innerHTML = `
    <div class="checkout-order-header">
      <strong>${currentOrder.boxName}</strong>
      <span>${currentOrder.collectionName || currentOrder.type}</span>
      <span class="checkout-order-price">${formatMoney(getOrderSubtotal())}</span>
    </div>
    <div class="checkout-review-flavours">
      ${flavourRows}
    </div>
  `;
}

function showCustomerDetailsStep() {
  checkoutModalTitle.textContent = "Your details";
  customerDetailsForm.classList.remove("is-hidden");
  checkoutReview.classList.add("is-hidden");
  checkoutNextStepNote.hidden = true;
  populateCustomerDetailsForm();
}

function showCheckoutReviewStep() {
  checkoutModalTitle.textContent = "Review order";
  customerDetailsForm.classList.add("is-hidden");
  checkoutReview.classList.remove("is-hidden");
  renderCheckoutReview();
}

function openCheckout() {
  if (!currentOrder) return;

  closeDrawer(cartDrawer);
  showCustomerDetailsStep();
  openModal(checkoutModal);

  setTimeout(() => customerName.focus(), 280);
}

function handleCustomerDetailsSubmit(event) {
  event.preventDefault();

  if (!validateCustomerDetails()) return;

  customerDetails = getCurrentCustomerDetails();
  showCheckoutReviewStep();
}

function renderPaymentStep() {
  if (!currentOrder || !customerDetails) return;

  const quote = currentOrder.serverQuote;

  if (
    !quote ||
    !Number.isFinite(Number(quote.subtotal)) ||
    !Number.isFinite(Number(quote.shippingCharge)) ||
    !Number.isFinite(Number(quote.grandTotal))
  ) {
    throw new Error(
      "Order total has not been calculated.",
    );
  }

  currentOrderId = null;

  paymentBoxSummary.textContent =
    `${currentOrder.boxName} · ` +
    `${currentOrder.boxSize} cookies`;

  paymentSubtotal.textContent = formatMoney(
    quote.subtotal,
  );

  paymentDelivery.textContent = formatMoney(
    quote.shippingCharge,
  );

  paymentTotal.textContent = formatMoney(
    quote.grandTotal,
  );

  paymentProofSaved.checked = false;
  continueToWhatsAppButton.disabled = true;

  hideOrderCreationLoader();
}

async function openPaymentStep() {
  if (!currentOrder || !customerDetails) return;

  try {
    const payload = buildOrderPayload();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "quoteOrder",
        postcode: payload.customer.postcode,
        boxes: payload.boxes,
      }),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(
        "Unable to calculate delivery charge. HTTP " +
          response.status,
      );
    }

    const result = await response.json();

    if (!result || result.ok !== true) {
      throw new Error(
        result?.message ||
          "Unable to calculate delivery charge.",
      );
    }

    if (
      !result.totals ||
      !Number.isFinite(
        Number(result.totals.grandTotal),
      )
    ) {
      throw new Error(
        "The server returned an invalid order total.",
      );
    }

    /*
     * Save the backend quote before opening payment.
     * This does not create an order.
     */
    currentOrder.serverQuote = {
      subtotal: Number(result.totals.subtotal),
      discount: Number(
        result.totals.discount || 0,
      ),
      shippingCharge: Number(
        result.totals.shippingCharge,
      ),
      grandTotal: Number(
        result.totals.grandTotal,
      ),
      parcelWeightG: Number(
        result.totals.parcelWeightG || 0,
      ),
      zoneId: result.zone?.zoneId || "",
    };

    renderPaymentStep();

    closeModal(checkoutModal);
    openModal(paymentModal);
  } catch (error) {
    console.error(
      "GOOKIE quote order error:",
      error,
    );

    alert(
      error.message ||
        "Unable to calculate delivery charge. Please try again.",
    );
  }
}

function getWhatsAppMessage() {
  const quote = currentOrder?.serverQuote;

  if (
    !quote ||
    !Number.isFinite(Number(quote.grandTotal))
  ) {
    throw new Error(
      "Order quote is unavailable.",
    );
  }

  const counts = {};

  currentOrder.cookies.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const itemLines = Object.entries(counts)
    .map(([id, quantity]) => {
      return (
        `• ${getCookieById(id).name} ×${quantity}`
      );
    })
    .join("\n");

  const notesLine = customerDetails.notes
    ? `\nOrder notes: ${customerDetails.notes}`
    : "";

  return [
    "Hello Gookie! I have made payment for my order 🍪",
    "",
    `Order ID: ${currentOrderId}`,
    "Status: ✅ PAID",
    "",
    `Name: ${customerDetails.name}`,
    `Phone: ${customerDetails.phone}`,
    `Delivery address: ${customerDetails.address}, ${customerDetails.postcode}${notesLine}`,
    "",
    `${currentOrder.type} — ${currentOrder.boxName}`,
    itemLines,
    "",
    `Subtotal: ${formatMoney(quote.subtotal)}`,
    `Delivery: ${formatMoney(quote.shippingCharge)}`,
    `Total paid: ${formatMoney(quote.grandTotal)}`,
    "",
    "I have saved my payment proof and will attach it to this WhatsApp message.",
  ].join("\n");
}


const ORDER_CREATION_MESSAGES = [
  "Preparing your cookie box...",
  "Picking your chunky wonders...",
  "Filling your Gookie box...",
  "Adding the final cookies...",
  "Sealing your box...",
  "Creating your order..."
];

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function showOrderCreationLoader() {
  if (!orderCreationLoader) return;

  clearInterval(orderCreationStatusTimer);

  orderCreationLoader.hidden = false;
  orderCreationLoader.setAttribute("aria-hidden", "false");
  orderCreationLoader.classList.remove("is-complete", "is-error");

  if (orderCreationBox) {
    orderCreationBox.classList.remove("is-complete");
    void orderCreationBox.offsetWidth;
  }

  if (orderCreationStatus) {
    orderCreationStatus.textContent = ORDER_CREATION_MESSAGES[0];
  }

  let messageIndex = 0;

  orderCreationStatusTimer = window.setInterval(() => {
    messageIndex = Math.min(
      messageIndex + 1,
      ORDER_CREATION_MESSAGES.length - 1,
    );

    if (orderCreationStatus) {
      orderCreationStatus.textContent =
        ORDER_CREATION_MESSAGES[messageIndex];
    }
  }, 420);
}

function completeOrderCreationLoader(orderId) {
  clearInterval(orderCreationStatusTimer);

  if (!orderCreationLoader) return;

  orderCreationLoader.classList.add("is-complete");

  if (orderCreationBox) {
    orderCreationBox.classList.add("is-complete");
  }

  if (orderCreationStatus) {
    orderCreationStatus.textContent =
      orderId
        ? `Order ${orderId} is ready! Opening WhatsApp...`
        : "Order ready! Opening WhatsApp...";
  }
}

function showOrderCreationError(message) {
  clearInterval(orderCreationStatusTimer);

  if (!orderCreationLoader) return;

  orderCreationLoader.classList.add("is-error");

  if (orderCreationStatus) {
    orderCreationStatus.textContent =
      message || "We could not create your order.";
  }
}

function hideOrderCreationLoader() {
  clearInterval(orderCreationStatusTimer);

  if (!orderCreationLoader) return;

  orderCreationLoader.hidden = true;
  orderCreationLoader.setAttribute("aria-hidden", "true");
  orderCreationLoader.classList.remove("is-complete", "is-error");

  if (orderCreationBox) {
    orderCreationBox.classList.remove("is-complete");
  }
}

let isOrderSubmissionLocked = false;


/**
 * Generates one unique Client Request ID for the current checkout.
 *
 * The ID is stored inside currentOrder so:
 * - repeated clicks cannot generate another ID;
 * - retries after a network error reuse the same ID;
 * - a new order object receives a new ID.
 */
function getOrCreateClientRequestId() {
  if (!currentOrder) {
    throw new Error("No active order was found.");
  }

  if (currentOrder.clientRequestId) {
    return currentOrder.clientRequestId;
  }

  const randomPart = generateClientRequestRandomPart();

  currentOrder.clientRequestId = `CRQ${randomPart}`;

  return currentOrder.clientRequestId;
}


/**
 * Produces a secure uppercase alphanumeric value.
 */
function generateClientRequestRandomPart(length = 12) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = new Uint32Array(length);

  if (
    window.crypto &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(values);
  } else {
    for (let index = 0; index < length; index += 1) {
      values[index] = Math.floor(
        Math.random() * Number.MAX_SAFE_INTEGER,
      );
    }
  }

  return Array.from(values, (value) => {
    return characters[value % characters.length];
  }).join("");
}


/**
 * Blocks attempts to close or interact with the payment modal while
 * the order request is being processed.
 */
function blockOrderSubmissionInteraction(event) {
  if (!isOrderSubmissionLocked) return;

  if (
    event.type === "keydown" &&
    event.key !== "Escape"
  ) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
}


/**
 * Activates the production submission lock.
 */
function lockOrderSubmission() {
  isOrderSubmissionLocked = true;
  isCreatingOrder = true;

  continueToWhatsAppButton.disabled = true;
  paymentProofSaved.disabled = true;
  paymentModalClose.disabled = true;

  document.addEventListener(
    "keydown",
    blockOrderSubmissionInteraction,
    true,
  );

  document.addEventListener(
    "pointerdown",
    blockOrderSubmissionInteraction,
    true,
  );

  document.addEventListener(
    "click",
    blockOrderSubmissionInteraction,
    true,
  );
}


/**
 * Releases the submission lock only when order creation fails.
 */

function unlockOrderSubmission() {
  isOrderSubmissionLocked = false;
  isCreatingOrder = false;

  paymentProofSaved.disabled = false;
  paymentModalClose.disabled = false;

  continueToWhatsAppButton.disabled =
    !paymentProofSaved.checked;

  document.removeEventListener(
    "keydown",
    blockOrderSubmissionInteraction,
    true,
  );

  document.removeEventListener(
    "pointerdown",
    blockOrderSubmissionInteraction,
    true,
  );

  document.removeEventListener(
    "click",
    blockOrderSubmissionInteraction,
    true,
  );
}

async function continueToWhatsApp() {
  if (!paymentProofSaved.checked) return;
  if (!currentOrder || !customerDetails) return;

  /*
   * The first synchronous check prevents another invocation before
   * any asynchronous work begins.
   */
  if (isCreatingOrder || isOrderSubmissionLocked) {
    return;
  }

  /*
   * Lock immediately before payload creation or fetch().
   */
  lockOrderSubmission();

  showOrderCreationLoader();

  const animationStartedAt = Date.now();
  const minimumAnimationMs = 2300;

  let orderCreatedSuccessfully = false;

  try {
    const clientRequestId =
      getOrCreateClientRequestId();

    const payload = buildOrderPayload();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        action: "createOrder",
        clientRequestId,
        ...payload,
      }),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(
        "Unable to create order. HTTP " +
          response.status,
      );
    }

    const result = await response.json();

    if (!result || result.ok !== true) {
      throw new Error(
        result?.message ||
          "Unable to create order.",
      );
    }

    if (!result.orderId) {
      throw new Error(
        "The server did not return an Order ID.",
      );
    }

    orderCreatedSuccessfully = true;

    currentOrderId = result.orderId;
    currentOrder.orderId = result.orderId;
    currentOrder.clientRequestId =
      result.clientRequestId || clientRequestId;
    currentOrder.paymentStatus =
      result.paymentStatus;
    currentOrder.workflow = result.workflow;
    currentOrder.serverQuote = result.quote;

    paymentTotal.textContent = formatMoney(
      result.quote.grandTotal,
    );

    const elapsedMs =
      Date.now() - animationStartedAt;

    if (elapsedMs < minimumAnimationMs) {
      await wait(minimumAnimationMs - elapsedMs);
    }

    completeOrderCreationLoader(result.orderId);

    await wait(720);

    const whatsappUrl =
      `https://wa.me/${GOOKIE_WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(getWhatsAppMessage());

    /*
     * Keep the submission lock active.
     *
     * Do not unlock here because the order already exists in the
     * backend. Unlocking would allow another click before WhatsApp opens.
     */
    window.location.href = whatsappUrl;
  } catch (error) {
    console.error(
      "GOOKIE create order error:",
      error,
    );

    showOrderCreationError(
      error.message ||
        "Unable to create your order.",
    );

    await wait(1100);

    hideOrderCreationLoader();

    alert(
      error.message ||
        "Unable to create your order. Please try again.",
    );
  } finally {
    /*
     * Only release the UI when order creation genuinely failed.
     *
     * A retry will reuse currentOrder.clientRequestId, allowing the
     * backend idempotency layer to return the original Order ID if the
     * first request reached Apps Script but its response was lost.
     */
    if (!orderCreatedSuccessfully) {
      unlockOrderSubmission();
    }
  }
}

menuButton?.addEventListener("click", () => openDrawer(menuDrawer, menuButton));
cartButton?.addEventListener("click", () => openDrawer(cartDrawer, cartButton));
menuCloseButton?.addEventListener("click", () => closeDrawer(menuDrawer));
cartCloseButton?.addEventListener("click", () => closeDrawer(cartDrawer));
pageOverlay?.addEventListener("click", () => {
  closeAllDrawers();
  closeAllModals();
  resumeMarquee();
});
cookieModalClose?.addEventListener("click", () => closeCookieDetails(true));
getYourGookiesButton?.addEventListener("click", () => {
  closeCookieDetails(false);
  scrollToSection($("choose-your-way"));
  setTimeout(resumeMarquee, 800);
});
showBuildYourBox?.addEventListener("click", () => {
  showBuildYourBox.classList.add("is-active");
  showGookiesChoice?.classList.remove("is-active");
  showBuildYourBox.setAttribute("aria-selected", "true");
  showGookiesChoice?.setAttribute("aria-selected", "false");
  showOrderSection(buildYourBoxSection, gookiesChoiceSection);
});

showGookiesChoice?.addEventListener("click", () => {
  showGookiesChoice.classList.add("is-active");
  showBuildYourBox?.classList.remove("is-active");
  showGookiesChoice.setAttribute("aria-selected", "true");
  showBuildYourBox?.setAttribute("aria-selected", "false");
  showOrderSection(gookiesChoiceSection, buildYourBoxSection);
});
buildBoxSizeOptions
  ?.querySelectorAll(".box-size-card")
  .forEach((b) => b.addEventListener("click", () => selectBuildBox(b)));
openFlavourSelector?.addEventListener("click", () => {
  const isComplete =
    buildBoxSize > 0 && buildSelection.length === buildBoxSize;

  if (isComplete) {
    saveBuildOrder();
    return;
  }

  openBuildFlavourSelector();
});
flavourModalClose?.addEventListener("click", () => closeModal(flavourModal));
saveFlavourSelection?.addEventListener("click", saveBuildOrder);

checkoutButton?.addEventListener("click", openCheckout);
checkoutModalClose?.addEventListener("click", () => closeModal(checkoutModal));
customerDetailsForm?.addEventListener("submit", handleCustomerDetailsSubmit);
editCustomerDetails?.addEventListener("click", showCustomerDetailsStep);
proceedToPaymentButton?.addEventListener("click", openPaymentStep);
paymentModalClose?.addEventListener("click", () => {
  if (isCreatingOrder) return;
  closeModal(paymentModal);
});
paymentProofSaved?.addEventListener("change", () => {
  continueToWhatsAppButton.disabled = !paymentProofSaved.checked;
});
continueToWhatsAppButton?.addEventListener("click", continueToWhatsApp);

[customerName, customerPhone, deliveryAddress, deliveryPostcode].forEach((input) => {
  input.addEventListener("input", () => setFieldError(input, ""));
});

deliveryPostcode?.addEventListener("input", () => {
  deliveryPostcode.value = deliveryPostcode.value.replace(/\D/g, "").slice(0, 5);
});

document.querySelectorAll(".gookies-pick-card").forEach((card) => {
  const pick = gookiePicks[card.dataset.pickId];
  const image = card.querySelector("img");

  if (pick && image) {
    image.onerror = () => {
      image.onerror = null;
      image.src = pick.fallbackImage;
    };
  }

  card.addEventListener("click", () => {
    openGookiePickDetails(card.dataset.pickId);
  });
});

gookiePickModalClose?.addEventListener("click", () => {
  closeModal(gookiePickModal);
});

addGookiePickToCart?.addEventListener(
  "click",
  addSelectedGookiePickToCart,
);

/* =========================================
   BUILD YOUR BOX ACCORDION
========================================= */

function toggleBuildAccordion(card) {
  document.querySelectorAll(".box-accordion").forEach((item) => {
    const body = item.querySelector(".box-accordion-body");
    const header = item.querySelector(".box-accordion-header");

    if (!body || !header) return;

    if (item === card) {
      const isOpen = item.classList.contains("is-open");

      item.classList.toggle("is-open", !isOpen);
      body.hidden = isOpen;
      header.setAttribute("aria-expanded", String(!isOpen));
    } else {
      item.classList.remove("is-open");
      body.hidden = true;
      header.setAttribute("aria-expanded", "false");
    }
  });
}

function renderMiniSlots(boxSize) {
  const container = document.querySelector(
    `.box-accordion[data-box-size="${boxSize}"] .box-mini-slots`,
  );

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < boxSize; i++) {
    const slot = document.createElement("div");
    slot.className = "box-mini-slot";

    const cookieId = buildSelection[i];
    const cookie = cookieId ? getCookieById(cookieId) : null;

    if (cookie) {
      slot.classList.add("has-cookie");
      slot.innerHTML = `
        <img src="${cookie.image}" alt="${cookie.name}">
      `;
    } else {
      slot.innerHTML = `<span aria-hidden="true">🍪</span>`;
    }

    container.appendChild(slot);
  }
}

function updateAccordionAction() {
  const activeCard = document.querySelector(
    `.box-accordion[data-box-size="${buildBoxSize}"]`,
  );

  if (!activeCard) return;

  const actionButton = activeCard.querySelector(
    ".box-accordion-action",
  );

  const helper = activeCard.querySelector(
    ".box-accordion-helper",
  );

  if (!actionButton || !helper) return;

  const selectedCount = buildSelection.length;
  const remaining = buildBoxSize - selectedCount;
  const isComplete =
    buildBoxSize > 0 && selectedCount === buildBoxSize;

  if (isComplete) {
    actionButton.textContent = "EDIT MY GOOKIES";
    actionButton.classList.add("is-ready");
    helper.textContent = `${selectedCount} / ${buildBoxSize} selected · Box complete!`;
    return;
  }

  actionButton.classList.remove("is-ready");

  if (selectedCount > 0) {
    actionButton.textContent = "CONTINUE CHOOSING";
    helper.textContent = `${selectedCount} / ${buildBoxSize} selected · Pick ${remaining} more`;
    return;
  }

  actionButton.textContent = "CHOOSE MY GOOKIES";
  helper.textContent = `Pick ${buildBoxSize} cookies to complete your ${buildBoxName}.`;
}

document.querySelectorAll(".box-accordion").forEach((card) => {
  const header = card.querySelector(".box-accordion-header");

  header?.addEventListener("click", () => {
    toggleBuildAccordion(card);
  });
});

document.querySelectorAll(".box-accordion-action").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedSize = Number(button.dataset.boxAction);

    if (buildBoxSize !== selectedSize) {
      buildBoxSize = selectedSize;

      buildBoxName =
        buildBoxSize === 4
          ? "Treat Box"
          : buildBoxSize === 6
            ? "Chunky Box"
            : "Cookie Feast";

      buildSelection = [];
    }

    updateBuildBoxProgress();
    renderMiniSlots(buildBoxSize);
    updateAccordionAction();
    openBuildFlavourSelector();
  });
});

marqueePrev?.addEventListener("click", () => scrollMarqueeByCard(-1));
marqueeNext?.addEventListener("click", () => scrollMarqueeByCard(1));
marqueeShell?.addEventListener("pointerdown", beginMarqueeDrag);
marqueeShell?.addEventListener("pointermove", moveMarqueeDrag);
marqueeShell?.addEventListener("pointerup", endMarqueeDrag);
marqueeShell?.addEventListener("pointercancel", endMarqueeDrag);
const supportsRealHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (supportsRealHover) {
  marqueeShell?.addEventListener("mouseenter", pauseMarquee);
  marqueeShell?.addEventListener("mouseleave", () => {
    if (!marqueeDragging) resumeMarquee(500);
  });
}
if (supportsRealHover) {
  marqueeShell?.addEventListener("focusin", pauseMarquee);
  marqueeShell?.addEventListener("focusout", () => resumeMarquee(500));
}
marqueeShell?.addEventListener("touchstart", pauseMarquee, { passive: true });
marqueeShell?.addEventListener("touchend", () => {
  marqueeAutoPosition = marqueeShell?.scrollLeft || 0;
  resumeMarquee(1200);
}, { passive: true });
marqueeShell?.addEventListener("scroll", () => {
  if (marqueePaused || marqueeDragging) {
    marqueeAutoPosition = marqueeShell?.scrollLeft || 0;
  }
}, { passive: true });
document
  .querySelectorAll(".drawer-nav a")
  .forEach((a) => a.addEventListener("click", closeAllDrawers));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllDrawers();
    closeAllModals();
    resumeMarquee();
  }
});
document.addEventListener("visibilitychange", () => {
  marqueeLastTimestamp = 0;

  if (!document.hidden) {
    marqueeAutoPosition = marqueeShell?.scrollLeft || 0;
    resumeMarquee(150);
  }
});

window.addEventListener("resize", () => {
  marqueeAutoPosition = marqueeShell?.scrollLeft || 0;
  marqueeLastTimestamp = 0;
});


/* =========================================================
   MOBILE-ONLY GOOKIE FOOTER ACCORDION
========================================================= */

const mobileFooterQuery = window.matchMedia("(max-width: 767px)");
const mobileFooterGroups = Array.from(
  document.querySelectorAll(".mobile-footer-group"),
);

function closeMobileFooterGroup(group) {
  const button = group.querySelector(".mobile-footer-toggle");
  const panel = group.querySelector(".mobile-footer-panel");

  group.classList.remove("is-open");
  button?.setAttribute("aria-expanded", "false");

  if (panel) {
    panel.hidden = true;
  }
}

function openMobileFooterGroup(group) {
  const button = group.querySelector(".mobile-footer-toggle");
  const panel = group.querySelector(".mobile-footer-panel");

  mobileFooterGroups.forEach((item) => {
    if (item !== group) {
      closeMobileFooterGroup(item);
    }
  });

  group.classList.add("is-open");
  button?.setAttribute("aria-expanded", "true");

  if (panel) {
    panel.hidden = false;
  }
}

function resetMobileFooterAccordion() {
  mobileFooterGroups.forEach(closeMobileFooterGroup);
}

mobileFooterGroups.forEach((group) => {
  const button = group.querySelector(".mobile-footer-toggle");

  button?.addEventListener("click", () => {
    if (!mobileFooterQuery.matches) return;

    if (group.classList.contains("is-open")) {
      closeMobileFooterGroup(group);
    } else {
      openMobileFooterGroup(group);
    }
  });
});

if (typeof mobileFooterQuery.addEventListener === "function") {
  mobileFooterQuery.addEventListener("change", resetMobileFooterAccordion);
} else {
  mobileFooterQuery.addListener(resetMobileFooterAccordion);
}

resetMobileFooterAccordion();


/* =========================================================
   FOOTER INFORMATION MODAL CONTENT
========================================================= */

const footerInfoModal = document.getElementById("footerInfoModal");
const footerInfoClose = document.getElementById("footerInfoClose");
const footerInfoEyebrow = document.getElementById("footerInfoEyebrow");
const footerInfoTitle = document.getElementById("footerInfoTitle");
const footerInfoBody = document.getElementById("footerInfoBody");

const footerInfoPages = {
  faq: {
    eyebrow: "NEED HELP?",
    title: "Frequently Asked Questions",
    body: `
      <div class="footer-faq-item">
        <h3>Where does Gookie deliver?</h3>
        <p>We currently deliver throughout Peninsular Malaysia. Delivery to Sabah and Sarawak is coming soon.</p>
      </div>

      <div class="footer-faq-item">
        <h3>Can I place an order at any time?</h3>
        <p>Yes. Online orders can be placed 24/7. WhatsApp and general enquiries are replied to between 9am and 5pm daily.</p>
      </div>

      <div class="footer-faq-item">
        <h3>How do I pay?</h3>
        <p>Payment is made using DuitNow QR during checkout. Please save your payment proof before continuing to WhatsApp.</p>
      </div>

      <div class="footer-faq-item">
        <h3>Are Gookies less sweet?</h3>
        <p>Yes. Gookies are made to taste rich and satisfying without being overwhelmingly sweet.</p>
      </div>

      <div class="footer-faq-item">
        <h3>How big is each cookie?</h3>
        <p>Our cookies are soft, chunky cookies. Exact weight may vary slightly because every batch is handmade.</p>
      </div>

      <div class="footer-faq-item">
        <h3>Can I request a specific delivery date?</h3>
        <p>Add your request under Order Notes during checkout. We will do our best, but courier delivery dates cannot be guaranteed.</p>
      </div>

      <div class="footer-info-actions">
        <a class="footer-info-primary" href="mailto:heygookie@gmail.com">EMAIL GOOKIE</a>
      </div>
    `,
  },

  delivery: {
    eyebrow: "NEED HELP?",
    title: "Delivery Information",
    body: `
      <h3>Delivery coverage</h3>
      <p>Gookie currently ships throughout Peninsular Malaysia. Sabah and Sarawak delivery will be introduced later.</p>

      <h3>Courier delivery</h3>
      <p>Orders are packed carefully for courier delivery. Delivery timing depends on the courier, destination and current service conditions.</p>

      <h3>Tracking</h3>
      <p>Once your order has been shipped, Gookie will send your tracking details and tracking link through WhatsApp.</p>

      <h3>Delivery address</h3>
      <p>Please check the recipient name, phone number, full address and postcode before payment. Gookie cannot guarantee changes after an order has entered packing or shipping.</p>

      <div class="footer-info-note">
        <strong>Please note</strong>
        Courier delays and unsuccessful delivery attempts are outside Gookie's direct control, but we will help you check the available tracking information.
      </div>
    `,
  },

  storage: {
    eyebrow: "NEED HELP?",
    title: "Storage & Reheating",
    body: `
      <h3>Room temperature</h3>
      <p>Keep your Gookies sealed in their individual packaging or in an airtight container, away from direct sunlight and heat.</p>

      <h3>For longer storage</h3>
      <p>Freeze the cookies in airtight packaging. Allow them to thaw before reheating.</p>

      <h3>How to reheat</h3>
      <ul>
        <li><strong>Oven or air fryer:</strong> warm gently at a low temperature for a few minutes.</li>
        <li><strong>Microwave:</strong> heat briefly in short intervals to avoid overheating the centre.</li>
      </ul>

      <div class="footer-info-note">
        <strong>Best result</strong>
        Reheat only the cookie you are ready to enjoy. Heating time varies by appliance and whether the cookie is chilled, frozen or at room temperature.
      </div>
    `,
  },

  contact: {
    eyebrow: "LET'S CONNECT!",
    title: "Contact Gookie",
    body: `
      <h3>Email</h3>
      <p>heygookie@gmail.com</p>

      <h3>Location</h3>
      <p>Ampang, Selangor, Malaysia</p>

      <h3>Reply hours</h3>
      <p>WhatsApp and enquiries are replied to between 9am and 5pm daily. Online orders can still be placed 24/7.</p>

      <div class="footer-info-actions">
        <a class="footer-info-primary" href="mailto:heygookie@gmail.com">SEND AN EMAIL</a>
        <a
          class="footer-info-secondary"
          href="https://whatsapp.com/channel/0029VbDaEAOGk1Fy5ZApou1n"
          target="_blank"
          rel="noopener noreferrer"
        >JOIN WHATSAPP CHANNEL</a>
      </div>
    `,
  },

  terms: {
    eyebrow: "THE BORING STUFF",
    title: "Terms & Conditions",
    body: `
      <h3>Orders</h3>
      <p>An order is only considered confirmed after the required payment has been completed and the order has been accepted by Gookie.</p>

      <h3>Order details</h3>
      <p>Customers are responsible for providing accurate recipient, contact and delivery information. Changes may not be possible once preparation, packing or shipping has started.</p>

      <h3>Handmade products</h3>
      <p>Gookies are handmade in small batches. Minor differences in shape, appearance, colour and weight are normal and do not affect product quality.</p>

      <h3>Availability</h3>
      <p>Flavours, box selections, prices and availability may change. Limited or monthly flavours are available while stocks last.</p>

      <h3>Delivery</h3>
      <p>Courier transit times are estimates. Gookie is not responsible for delays caused by couriers, weather, incorrect addresses or circumstances beyond reasonable control.</p>
    `,
  },

  privacy: {
    eyebrow: "THE BORING STUFF",
    title: "Privacy Policy",
    body: `
      <h3>Information we collect</h3>
      <p>To process an order, Gookie may collect details such as your name, phone number, email address, delivery address, postcode, order notes and payment confirmation information.</p>

      <h3>How the information is used</h3>
      <p>Your information is used to prepare, confirm, deliver and support your order, including sending payment or shipping updates.</p>

      <h3>Sharing</h3>
      <p>Relevant delivery details may be shared with courier or service providers only as needed to complete your order.</p>

      <h3>Protection and retention</h3>
      <p>Gookie takes reasonable steps to protect order information and keeps it only as long as reasonably needed for operations, records and legal obligations.</p>

      <h3>Contact</h3>
      <p>Questions about your personal information can be sent to heygookie@gmail.com.</p>
    `,
  },

  refund: {
    eyebrow: "THE BORING STUFF",
    title: "Refund & Replacement Policy",
    body: `
      <h3>Food products</h3>
      <p>Because Gookies are perishable food products, change-of-mind returns or refunds are generally not available.</p>

      <h3>Damaged, incorrect or missing items</h3>
      <p>Contact Gookie as soon as possible after delivery if your order is damaged, incorrect or incomplete.</p>

      <h3>What to provide</h3>
      <ul>
        <li>Your Order ID.</li>
        <li>Clear photos of the parcel, packaging and affected cookies.</li>
        <li>A brief explanation of the issue.</li>
      </ul>

      <h3>Review of claims</h3>
      <p>Eligible cases will be reviewed individually. Depending on the circumstances, Gookie may offer a replacement, store credit or refund for the affected item.</p>

      <div class="footer-info-note">
        <strong>Important</strong>
        Do not discard the parcel or affected items before the issue has been reviewed, as photographs and packaging details may be required.
      </div>

      <div class="footer-info-actions">
        <a class="footer-info-primary" href="mailto:heygookie@gmail.com">REPORT AN ORDER ISSUE</a>
      </div>
    `,
  },
};

function openFooterInfoPage(pageKey) {
  const page = footerInfoPages[pageKey];

  if (!page || !footerInfoModal) return;

  footerInfoEyebrow.textContent = page.eyebrow;
  footerInfoTitle.textContent = page.title;
  footerInfoBody.innerHTML = page.body;

  openModal(footerInfoModal);
}

document.querySelectorAll("[data-footer-page]").forEach((button) => {
  button.addEventListener("click", () => {
    openFooterInfoPage(button.dataset.footerPage);
  });
});

footerInfoClose?.addEventListener("click", () => {
  closeModal(footerInfoModal);
});

footerInfoModal?.addEventListener("click", (event) => {
  if (event.target === footerInfoModal) {
    closeModal(footerInfoModal);
  }
});

renderMarquee();
startMarqueeAnimation();
renderCookieSlots(buildCookieSlots, 0, []);
updateBuildBoxProgress();
updateCart();
