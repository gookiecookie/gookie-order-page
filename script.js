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
const gookieCollections = [
  {
    id: "best-sellers",
    name: "Best-Seller Box",
    description:
      "The crowd favourites we would hand to anyone trying Gookie for the first time.",
    pool: [
      "wonder-chip",
      "dark-crush",
      "matcha-matchy",
      "biscoff-boom",
      "choki-chomp",
      "mallow-melt",
    ],
  },
  {
    id: "signature-cookies",
    name: "Signature Cookies",
    description: "A balanced mix that captures the full personality of Gookie.",
    pool: [
      "wonder-chip",
      "red-bloom",
      "matcha-matchy",
      "dream-cream",
      "biscoff-boom",
      "coffee-kiss",
    ],
  },
  {
    id: "full-wonder",
    name: "Full Wonder",
    description: "A little bit of everything, curated into one colourful box.",
    pool: gookieCatalogue.map((c) => c.id),
  },
  {
    id: "full-mallow",
    name: "Full Mallow",
    description: "For the marshmallow lover who knows exactly what they want.",
    pool: ["mallow-melt"],
  },
];
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
  gookieChoiceBoxArea = $("gookieChoiceBoxArea"),
  gookieChoiceSizeOptions = $("gookieChoiceSizeOptions"),
  gookieChoicePreview = $("gookieChoicePreview"),
  gookieChoiceTitle = $("gookieChoiceTitle"),
  gookieChoiceSlots = $("gookieChoiceSlots"),
  gookieChoiceSummary = $("gookieChoiceSummary"),
  reshuffleChoice = $("reshuffleChoice"),
  keepGookieChoice = $("keepGookieChoice"),
  cartCount = $("cartCount"),
  cartSelectedCount = $("cartSelectedCount"),
  cartEmptyState = $("cartEmptyState"),
  cartContent = $("cartContent"),
  cartOrderSummary = $("cartOrderSummary"),
  checkoutButton = $("checkoutButton");
let buildBoxSize = 0,
  buildBoxName = "",
  buildSelection = [],
  selectedCollection = null,
  gookieChoiceSize = 0,
  gookieChoiceSelection = [],
  currentOrder = null,
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
function createMarqueeCard(c) {
  const b = document.createElement("button");
  b.className = "marquee-card";
  b.type = "button";
  b.innerHTML = `<span class="marquee-card-image"><img src="${c.image}" alt="${c.name}"></span><span class="marquee-card-copy"><small>${c.subtitle}</small><strong>${c.name}</strong></span>`;
  b.addEventListener("click", (event) => {
    if (marqueeDragDistance > 8) {
      event.preventDefault();
      marqueeDragDistance = 0;
      return;
    }

    pauseMarquee();
    openCookieDetails(c);
  });
  return b;
}
function renderMarquee() {
  marqueeTrack.innerHTML = "";

  [...gookieCatalogue, ...gookieCatalogue].forEach((cookie) => {
    marqueeTrack.appendChild(createMarqueeCard(cookie));
  });
}

function getMarqueeLoopWidth() {
  return marqueeTrack.scrollWidth / 2;
}

function normaliseMarqueePosition() {
  const loopWidth = getMarqueeLoopWidth();

  if (!loopWidth) return;

  if (marqueeAutoPosition >= loopWidth) {
    marqueeAutoPosition -= loopWidth;
  } else if (marqueeAutoPosition < 0) {
    marqueeAutoPosition += loopWidth;
  }

  marqueeShell.scrollLeft = Math.round(marqueeAutoPosition);
}

function animateMarquee(timestamp) {
  if (!marqueeLastTimestamp) marqueeLastTimestamp = timestamp;

  const elapsed = Math.min(timestamp - marqueeLastTimestamp, 40);
  marqueeLastTimestamp = timestamp;

  if (!marqueePaused && !marqueeDragging) {
    const pixelsPerSecond = window.innerWidth < 768 ? 48 : 38;
    marqueeAutoPosition += (pixelsPerSecond * elapsed) / 1000;
    normaliseMarqueePosition();
  }

  marqueeAnimationFrame = requestAnimationFrame(animateMarquee);
}

function startMarqueeAnimation() {
  if (marqueeAnimationFrame) return;

  marqueeAutoPosition = marqueeShell.scrollLeft;
  marqueeLastTimestamp = 0;
  marqueeAnimationFrame = requestAnimationFrame(animateMarquee);
}

function pauseMarquee() {
  marqueePaused = true;
  marqueeTrack.classList.add("is-paused");
  clearTimeout(marqueeResumeTimer);
}

function resumeMarquee(delay = 0) {
  clearTimeout(marqueeResumeTimer);

  marqueeResumeTimer = setTimeout(() => {
    marqueePaused = false;
    marqueeTrack.classList.remove("is-paused");
  }, delay);
}

function scrollMarqueeByCard(direction) {
  const firstCard = marqueeTrack.querySelector(".marquee-card");
  const trackStyles = window.getComputedStyle(marqueeTrack);
  const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 18;
  const distance = firstCard ? firstCard.offsetWidth + gap : 320;

  pauseMarquee();
  marqueeShell.scrollBy({
    left: distance * direction,
    behavior: "smooth",
  });

  setTimeout(normaliseMarqueePosition, 500);
  resumeMarquee(1400);
}

function beginMarqueeDrag(event) {
  if (event.pointerType !== "mouse" || event.button !== 0) return;

  marqueeDragging = true;
  marqueePointerStartX = event.clientX;
  marqueeScrollStart = marqueeShell.scrollLeft;
  marqueeDragDistance = 0;
  marqueeShell.classList.add("is-dragging");
  marqueeShell.setPointerCapture(event.pointerId);
  pauseMarquee();
}

function moveMarqueeDrag(event) {
  if (!marqueeDragging) return;

  const distance = event.clientX - marqueePointerStartX;
  marqueeDragDistance = Math.max(marqueeDragDistance, Math.abs(distance));
  marqueeAutoPosition = marqueeScrollStart - distance;
  normaliseMarqueePosition();
}

function endMarqueeDrag(event) {
  if (!marqueeDragging) return;

  marqueeDragging = false;
  marqueeShell.classList.remove("is-dragging");

  if (marqueeShell.hasPointerCapture(event.pointerId)) {
    marqueeShell.releasePointerCapture(event.pointerId);
  }

  resumeMarquee(1100);
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
  updateCart();
  closeModal(flavourModal);
  openDrawer(cartDrawer, cartButton);
}
function renderCollections() {
  gookieCollections.forEach((col) => {
    const b = document.createElement("button");
    b.className = "collection-card";
    b.type = "button";
    b.innerHTML = `<strong>${col.name}</strong><span>${col.description}</span>`;
    b.addEventListener("click", () => {
      collectionGrid
        .querySelectorAll(".collection-card")
        .forEach((c) => c.classList.remove("is-selected"));
      b.classList.add("is-selected");
      selectedCollection = col;
      gookieChoiceBoxArea.classList.remove("is-hidden");
      gookieChoicePreview.classList.add("is-hidden");
    });
    collectionGrid.appendChild(b);
  });
}
function shuffleArray(v) {
  const a = [...v];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function createGookieChoiceSelection() {
  if (!selectedCollection || !gookieChoiceSize) return;
  const pool = selectedCollection.pool;
  if (pool.length === 1)
    gookieChoiceSelection = Array(gookieChoiceSize).fill(pool[0]);
  else {
    let s = [];
    while (s.length < gookieChoiceSize) s.push(...shuffleArray(pool));
    gookieChoiceSelection = s.slice(0, gookieChoiceSize);
  }
  renderGookieChoicePreview();
}
function renderGookieChoicePreview() {
  gookieChoiceTitle.textContent = `${selectedCollection.name} · ${gookieChoiceSize} Cookies`;
  renderCookieSlots(gookieChoiceSlots, gookieChoiceSize, gookieChoiceSelection);
  const counts = {};
  gookieChoiceSelection.forEach((id) => (counts[id] = (counts[id] || 0) + 1));
  gookieChoiceSummary.textContent = Object.entries(counts)
    .map(([id, q]) => `${getCookieById(id).name} ×${q}`)
    .join(" · ");
  gookieChoicePreview.classList.remove("is-hidden");
}
function selectGookieChoiceSize(button) {
  gookieChoiceSizeOptions
    .querySelectorAll(".box-size-card")
    .forEach((c) => c.classList.remove("is-selected"));
  button.classList.add("is-selected");
  gookieChoiceSize = Number(button.dataset.boxSize);
  createGookieChoiceSelection();
}
function saveGookieChoiceOrder() {
  if (!selectedCollection || !gookieChoiceSelection.length) return;
  const b = gookieChoiceSizeOptions.querySelector(".box-size-card.is-selected");
  currentOrder = {
    type: "Gookie's Choice",
    collectionName: selectedCollection.name,
    boxName: b.dataset.boxName,
    boxSize: gookieChoiceSize,
    cookies: [...gookieChoiceSelection],
  };
  updateCart();
  openDrawer(cartDrawer, cartButton);
}
function updateCart() {
  const total = currentOrder ? currentOrder.cookies.length : 0;
  cartCount.textContent = String(total);
  cartSelectedCount.textContent = String(total);
  if (!currentOrder) {
    cartEmptyState.hidden = false;
    cartContent.hidden = true;
    checkoutButton.disabled = true;
    return;
  }
  cartEmptyState.hidden = true;
  cartContent.hidden = false;
  checkoutButton.disabled = false;
  const counts = {};
  currentOrder.cookies.forEach((id) => (counts[id] = (counts[id] || 0) + 1));
  const summary = Object.entries(counts)
    .map(([id, q]) => {
      const c = getCookieById(id);
      return `<div class="cart-summary-item"><strong>${c.name} ×${q}</strong><span>${c.subtitle}</span></div>`;
    })
    .join("");
  cartOrderSummary.innerHTML = `<div class="cart-summary-item"><strong>${currentOrder.type}</strong><span>${currentOrder.collectionName || currentOrder.boxName}</span></div><div class="cart-summary-item"><strong>${currentOrder.boxName}</strong><span>${currentOrder.boxSize} cookies</span></div>${summary}`;
}
menuButton.addEventListener("click", () => openDrawer(menuDrawer, menuButton));
cartButton.addEventListener("click", () => openDrawer(cartDrawer, cartButton));
menuCloseButton.addEventListener("click", () => closeDrawer(menuDrawer));
cartCloseButton.addEventListener("click", () => closeDrawer(cartDrawer));
pageOverlay.addEventListener("click", () => {
  closeAllDrawers();
  closeAllModals();
  resumeMarquee();
});
cookieModalClose.addEventListener("click", () => closeCookieDetails(true));
getYourGookiesButton.addEventListener("click", () => {
  closeCookieDetails(false);
  scrollToSection($("choose-your-way"));
  setTimeout(resumeMarquee, 800);
});
showBuildYourBox.addEventListener("click", () =>
  showOrderSection(buildYourBoxSection, gookiesChoiceSection),
);
showGookiesChoice.addEventListener("click", () =>
  showOrderSection(gookiesChoiceSection, buildYourBoxSection),
);
buildBoxSizeOptions
  .querySelectorAll(".box-size-card")
  .forEach((b) => b.addEventListener("click", () => selectBuildBox(b)));
openFlavourSelector.addEventListener("click", () => {
  const isComplete =
    buildBoxSize > 0 && buildSelection.length === buildBoxSize;

  if (isComplete) {
    saveBuildOrder();
    return;
  }

  openBuildFlavourSelector();
});
flavourModalClose.addEventListener("click", () => closeModal(flavourModal));
saveFlavourSelection.addEventListener("click", saveBuildOrder);
gookieChoiceSizeOptions
  .querySelectorAll(".box-size-card")
  .forEach((b) => b.addEventListener("click", () => selectGookieChoiceSize(b)));
reshuffleChoice.addEventListener("click", createGookieChoiceSelection);
keepGookieChoice.addEventListener("click", saveGookieChoiceOrder);

marqueePrev.addEventListener("click", () => scrollMarqueeByCard(-1));
marqueeNext.addEventListener("click", () => scrollMarqueeByCard(1));
marqueeShell.addEventListener("pointerdown", beginMarqueeDrag);
marqueeShell.addEventListener("pointermove", moveMarqueeDrag);
marqueeShell.addEventListener("pointerup", endMarqueeDrag);
marqueeShell.addEventListener("pointercancel", endMarqueeDrag);
const supportsRealHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (supportsRealHover) {
  marqueeShell.addEventListener("mouseenter", pauseMarquee);
  marqueeShell.addEventListener("mouseleave", () => {
    if (!marqueeDragging) resumeMarquee(500);
  });
}
if (supportsRealHover) {
  marqueeShell.addEventListener("focusin", pauseMarquee);
  marqueeShell.addEventListener("focusout", () => resumeMarquee(500));
}
marqueeShell.addEventListener("touchstart", pauseMarquee, { passive: true });
marqueeShell.addEventListener("touchend", () => {
  marqueeAutoPosition = marqueeShell.scrollLeft;
  resumeMarquee(1200);
}, { passive: true });
marqueeShell.addEventListener("scroll", () => {
  if (marqueePaused || marqueeDragging) {
    marqueeAutoPosition = marqueeShell.scrollLeft;
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
    marqueeAutoPosition = marqueeShell.scrollLeft;
    resumeMarquee(150);
  }
});

window.addEventListener("resize", () => {
  marqueeAutoPosition = marqueeShell.scrollLeft;
  marqueeLastTimestamp = 0;
});

renderMarquee();
startMarqueeAnimation();
renderCollections();
renderCookieSlots(buildCookieSlots, 0, []);
updateBuildBoxProgress();
updateCart();
