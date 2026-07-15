/* =========================================================
   GOOKIE HQ V1 PRODUCTION
   FILE: hq.js

   SPRINT 1
   - Connect to hqData
   - Connect to verifyPayment
========================================================= */


/* =========================================================
   1. APPS SCRIPT CONFIGURATION
========================================================= */

const GOOKIE_HQ_CONFIG = {
  API_URL:
    "https://script.google.com/macros/s/AKfycbw0cK0xWTgan6YFzLfGta7Mc5qFQkhwzSBO4iwgWGcbXBiNrgAtHKjursf1B_FQPYa39w/exec",

  VERIFIED_BY: "GOOKIE HQ",

  AUTO_REFRESH_MS: 30000
};


/* =========================================================
   2. HQ STATE
========================================================= */

const hqState = {
  data: null,
  selectedOrder: null,
  isLoading: false,
  isVerifying: false,
  autoRefreshTimer: null,
  toastTimer: null
};


/* =========================================================
   3. DOM REFERENCES
========================================================= */

const connectionStatus =
  document.getElementById("connectionStatus");

const connectionText =
  document.getElementById("connectionText");

const refreshHQButton =
  document.getElementById("refreshHQButton");

const lastUpdatedText =
  document.getElementById("lastUpdatedText");


/* Summary */

const newOrdersCount =
  document.getElementById("newOrdersCount");

const readyToBakeCount =
  document.getElementById("readyToBakeCount");

const productionCount =
  document.getElementById("productionCount");

const readyToShipCount =
  document.getElementById("readyToShipCount");


/* Workflow counts */

const verifyCount =
  document.getElementById("verifyCount");

const bakeQueueCount =
  document.getElementById("bakeQueueCount");

const inOvenCount =
  document.getElementById("inOvenCount");

const coolingCount =
  document.getElementById("coolingCount");

const packingCount =
  document.getElementById("packingCount");

const shippingCount =
  document.getElementById("shippingCount");


/* Workflow lists */

const verifyOrderList =
  document.getElementById("verifyOrderList");

const bakeQueueOrderList =
  document.getElementById("bakeQueueOrderList");

const inOvenOrderList =
  document.getElementById("inOvenOrderList");

const coolingOrderList =
  document.getElementById("coolingOrderList");

const packingOrderList =
  document.getElementById("packingOrderList");

const shippingOrderList =
  document.getElementById("shippingOrderList");


/* Mission Control */

const missionControlButton =
  document.getElementById("missionControlButton");

const missionControlDrawer =
  document.getElementById("missionControlDrawer");

const closeMissionControlButton =
  document.getElementById("closeMissionControlButton");

const missionControlSearch =
  document.getElementById("missionControlSearch");

const pageOverlay =
  document.getElementById("pageOverlay");


/* Mission Control counts */

const drawerVerifyCount =
  document.getElementById("drawerVerifyCount");

const drawerBakeQueueCount =
  document.getElementById("drawerBakeQueueCount");

const drawerInOvenCount =
  document.getElementById("drawerInOvenCount");

const drawerCoolingCount =
  document.getElementById("drawerCoolingCount");

const drawerPackingCount =
  document.getElementById("drawerPackingCount");

const drawerShippingCount =
  document.getElementById("drawerShippingCount");

const drawerCompletedCount =
  document.getElementById("drawerCompletedCount");


/* Mission Control lists */

const drawerVerifyList =
  document.getElementById("drawerVerifyList");

const drawerBakeQueueList =
  document.getElementById("drawerBakeQueueList");

const drawerInOvenList =
  document.getElementById("drawerInOvenList");

const drawerCoolingList =
  document.getElementById("drawerCoolingList");

const drawerPackingList =
  document.getElementById("drawerPackingList");

const drawerShippingList =
  document.getElementById("drawerShippingList");

const drawerCompletedList =
  document.getElementById("drawerCompletedList");


/* Verify modal */

const verifyPaymentModal =
  document.getElementById("verifyPaymentModal");

const closeVerifyModalButton =
  document.getElementById("closeVerifyModalButton");

const cancelVerifyPaymentButton =
  document.getElementById("cancelVerifyPaymentButton");

const confirmVerifyPaymentButton =
  document.getElementById("confirmVerifyPaymentButton");

const verifyModalOrderID =
  document.getElementById("verifyModalOrderID");

const verifyModalCustomerName =
  document.getElementById("verifyModalCustomerName");

const verifyModalPhone =
  document.getElementById("verifyModalPhone");

const verifyModalTotal =
  document.getElementById("verifyModalTotal");

const verifyModalPaymentStatus =
  document.getElementById("verifyModalPaymentStatus");

const verifyModalItems =
  document.getElementById("verifyModalItems");

const verifyButtonText =
  document.getElementById("verifyButtonText");

const verifyButtonSpinner =
  document.getElementById("verifyButtonSpinner");


/* Order details modal */

const orderDetailsModal =
  document.getElementById("orderDetailsModal");

const orderDetailsModalTitle =
  document.getElementById("orderDetailsModalTitle");

const orderDetailsContent =
  document.getElementById("orderDetailsContent");

const closeOrderDetailsButton =
  document.getElementById("closeOrderDetailsButton");


/* Toast */

const hqToast =
  document.getElementById("hqToast");

const toastIcon =
  document.getElementById("toastIcon");

const toastTitle =
  document.getElementById("toastTitle");

const toastMessage =
  document.getElementById("toastMessage");


/* Loading */

const hqLoadingScreen =
  document.getElementById("hqLoadingScreen");

const loadingMessage =
  document.getElementById("loadingMessage");


/* =========================================================
   4. INITIALISE HQ
========================================================= */

document.addEventListener("DOMContentLoaded", initialiseHQ);


function initialiseHQ() {
  bindHQEvents();
  loadHQData({ showLoadingScreen: true });
  startAutoRefresh();
}


/* =========================================================
   5. EVENT LISTENERS
========================================================= */

function bindHQEvents() {

  refreshHQButton.addEventListener("click", function () {
    loadHQData({
      showLoadingScreen: false,
      showSuccessToast: true
    });
  });


  missionControlButton.addEventListener(
    "click",
    openMissionControl
  );


  closeMissionControlButton.addEventListener(
    "click",
    closeMissionControl
  );


  pageOverlay.addEventListener("click", function () {
    closeMissionControl();
  });


  missionControlSearch.addEventListener(
    "input",
    handleMissionControlSearch
  );


  closeVerifyModalButton.addEventListener(
    "click",
    closeVerifyPaymentModal
  );


  cancelVerifyPaymentButton.addEventListener(
    "click",
    closeVerifyPaymentModal
  );


  confirmVerifyPaymentButton.addEventListener(
    "click",
    confirmVerifyPayment
  );


  closeOrderDetailsButton.addEventListener(
    "click",
    closeOrderDetailsModal
  );


  verifyPaymentModal.addEventListener("click", function (event) {
    if (event.target === verifyPaymentModal) {
      closeVerifyPaymentModal();
    }
  });


  orderDetailsModal.addEventListener("click", function (event) {
    if (event.target === orderDetailsModal) {
      closeOrderDetailsModal();
    }
  });


  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    closeMissionControl();
    closeVerifyPaymentModal();
    closeOrderDetailsModal();
  });
}


/* =========================================================
   6. LOAD HQ DATA
========================================================= */

async function loadHQData(options = {}) {

  if (hqState.isLoading) {
    return;
  }

  const showLoadingScreen =
    options.showLoadingScreen === true;

  const showSuccessToast =
    options.showSuccessToast === true;

  hqState.isLoading = true;

  setConnectionStatus(
    "loading",
    "Connecting..."
  );

  if (showLoadingScreen) {
    showHQLoadingScreen(
      "Connecting to Mission Control..."
    );
  }

  setRefreshButtonLoading(true);

  try {

    const result = await loadHQDataViaJSONP();

    if (!result || result.ok !== true) {
      throw new Error(
        result && result.message
          ? result.message
          : "HQ data could not be loaded."
      );
    }

    hqState.data = normaliseHQData(result);

    renderHQ();

    setConnectionStatus(
      "connected",
      "HQ Connected"
    );

    updateLastUpdated(result.generatedAt);

    if (showSuccessToast) {
      showToast(
        "HQ refreshed",
        "Latest production data loaded.",
        "success"
      );
    }

  } catch (error) {

    console.error(
      "GOOKIE HQ load error:",
      error
    );

    setConnectionStatus(
      "error",
      "Connection Error"
    );

    showHQConnectionError(
      error.message
    );

    showToast(
      "Connection failed",
      error.message,
      "error"
    );

  } finally {

    hqState.isLoading = false;

    setRefreshButtonLoading(false);

    hideHQLoadingScreen();
  }
}

function loadHQDataViaJSONP() {

  return new Promise(function (resolve, reject) {

    const callbackName =
      "gookieHQCallback_" +
      Date.now() +
      "_" +
      Math.floor(Math.random() * 100000);

    const script =
      document.createElement("script");

    const timeout =
      setTimeout(function () {

        cleanup();

        reject(
          new Error(
            "HQ connection timed out."
          )
        );

      }, 15000);


    function cleanup() {

      clearTimeout(timeout);

      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      try {
        delete window[callbackName];
      } catch (error) {
        window[callbackName] = undefined;
      }
    }


    window[callbackName] =
      function (result) {

        cleanup();

        resolve(result);
      };


    script.onerror =
      function () {

        cleanup();

        reject(
          new Error(
            "Unable to load HQ data."
          )
        );
      };


    script.src =
      GOOKIE_HQ_CONFIG.API_URL +
      "?action=hqData" +
      "&callback=" +
      encodeURIComponent(callbackName) +
      "&timestamp=" +
      Date.now();


    document.body.appendChild(script);
  });
}

/* =========================================================
   7. NORMALISE HQ DATA
========================================================= */

function normaliseHQData(result) {
  return {
    generatedAt:
      result.generatedAt || new Date().toISOString(),

    awaitingVerification:
      Array.isArray(result.awaitingVerification)
        ? result.awaitingVerification
        : [],

    productionQueue:
      Array.isArray(result.productionQueue)
        ? result.productionQueue
        : [],

    activeBatches:
      Array.isArray(result.activeBatches)
        ? result.activeBatches
        : [],

    coolingBatches:
      Array.isArray(result.coolingBatches)
        ? result.coolingBatches
        : [],

    packingQueue:
      Array.isArray(result.packingQueue)
        ? result.packingQueue
        : [],

    shippingQueue:
      Array.isArray(result.shippingQueue)
        ? result.shippingQueue
        : [],

    doughStock:
      Array.isArray(result.doughStock)
        ? result.doughStock
        : []
  };
}


/* =========================================================
   8. MAIN RENDER
========================================================= */

function renderHQ() {

  if (!hqState.data) {
    return;
  }

  renderSummary();
  renderVerifyColumn();
  renderBakeQueueColumn();
  renderInOvenColumn();
  renderCoolingColumn();
  renderPackingColumn();
  renderShippingColumn();
  renderMissionControl();
}


/* =========================================================
   9. SUMMARY
========================================================= */

function renderSummary() {
  const data = hqState.data;

  const bakeQueueQuantity =
    data.productionQueue.reduce(function (total, item) {
      return total + safeNumber(item.qty);
    }, 0);

  const activeBatchQuantity =
    data.activeBatches.reduce(function (total, batch) {
      return total + getItemsQuantity(batch.items);
    }, 0);

  const coolingQuantity =
    data.coolingBatches.reduce(function (total, batch) {
      return total + getItemsQuantity(batch.items);
    }, 0);

  const packingQuantity =
    data.packingQueue.reduce(function (total, box) {
      return total + safeNumber(box.expectedCookieQty);
    }, 0);


  newOrdersCount.textContent =
    String(data.awaitingVerification.length);

  readyToBakeCount.textContent =
    String(bakeQueueQuantity);

  productionCount.textContent =
    String(
      activeBatchQuantity +
      coolingQuantity +
      packingQuantity
    );

  readyToShipCount.textContent =
    String(data.shippingQueue.length);
}


/* =========================================================
   10. VERIFY COLUMN
========================================================= */

function renderVerifyColumn() {
  const orders =
    hqState.data.awaitingVerification;

  verifyCount.textContent =
    String(orders.length);


  if (orders.length === 0) {
    verifyOrderList.innerHTML =
      createEmptyState(
        "No payment to verify."
      );

    return;
  }


  verifyOrderList.innerHTML =
    orders.map(createVerifyOrderCard).join("");


  verifyOrderList
    .querySelectorAll("[data-action='open-verify']")
    .forEach(function (button) {

      button.addEventListener("click", function () {
        const orderId =
          button.dataset.orderId;

        openVerifyPaymentModal(orderId);
      });

    });

verifyOrderList
  .querySelectorAll("[data-action='open-whatsapp']")
  .forEach(function(button){

      button.addEventListener("click", function(){

          openCustomerWhatsApp(
              button.dataset.orderId
          );

      });

  }); 

  verifyOrderList
    .querySelectorAll("[data-action='view-order']")
    .forEach(function (button) {

      button.addEventListener("click", function () {
        const orderId =
          button.dataset.orderId;

        openOrderDetails(orderId);
      });

    });
}


function createVerifyOrderCard(order) {
  return `
    <article
      class="order-card"
      data-order-id="${escapeHTML(order.orderId)}"
    >

      <div class="order-card-top">

        <button
          class="order-id-button"
          type="button"
          data-action="view-order"
          data-order-id="${escapeHTML(order.orderId)}"
        >
          ${escapeHTML(order.orderId)}
        </button>

        <span class="order-time">
          ${escapeHTML(formatOrderTime(order.timestamp))}
        </span>

      </div>


      <p class="order-customer">
        ${escapeHTML(order.customerName || "Customer")}
      </p>


      <div class="order-items-preview">
        <p>
          ${escapeHTML(createBoxesPreview(order.boxes))}
        </p>
      </div>


      <div class="order-meta-row">

        <strong class="order-total">
          ${formatCurrency(order.grandTotal)}
        </strong>

        <span class="order-status-badge">
          ${escapeHTML(order.paymentStatus || "PENDING")}
        </span>

      </div>


      <div class="order-actions">

        <button
          class="card-primary-button"
          type="button"
          data-action="open-verify"
          data-order-id="${escapeHTML(order.orderId)}"
        >
          Verify Payment
        </button>

<div class="verify-card-actions">

  <button
    class="whatsapp-button"
    data-action="open-whatsapp"
    data-order-id="${escapeHTML(order.orderId)}"
    title="Open WhatsApp"
  >
    🟢 WhatsApp
  </button>

  <button
    class="receipt-button"
    data-action="view-order"
    data-order-id="${escapeHTML(order.orderId)}"
    title="View Order"
  >
    🧾
  </button>

</div>

<button
  class="card-primary-button"
  data-action="open-verify"
  data-order-id="${escapeHTML(order.orderId)}"
>
  Verify Payment
</button>

        <button
          class="card-secondary-button"
          type="button"
          data-action="view-order"
          data-order-id="${escapeHTML(order.orderId)}"
        >
          View Order
        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   11. BAKE QUEUE COLUMN
========================================================= */

function renderBakeQueueColumn() {
  const queue =
    hqState.data.productionQueue;

  const totalQuantity =
    queue.reduce(function (total, item) {
      return total + safeNumber(item.qty);
    }, 0);


  bakeQueueCount.textContent =
    String(totalQuantity);


  if (queue.length === 0) {
    bakeQueueOrderList.innerHTML =
      createEmptyState(
        "No order waiting to bake."
      );

    return;
  }


  bakeQueueOrderList.innerHTML =
    queue.map(function (item) {

      return `
        <article class="order-card">

          <div class="order-card-top">

            <strong class="order-id-button">
              ${escapeHTML(
                item.displayName ||
                item.menuCode ||
                item.productId
              )}
            </strong>

            <span class="order-status-badge is-paid">
              READY
            </span>

          </div>

          <div class="order-items-preview">
            <p>
              Product ID:
              ${escapeHTML(item.productId || "—")}
            </p>
          </div>

          <div class="order-meta-row">

            <strong class="order-total">
              ×${safeNumber(item.qty)}
            </strong>

            <span class="order-time">
              Cookies
            </span>

          </div>

        </article>
      `;

    }).join("");
}


/* =========================================================
   12. IN OVEN COLUMN
========================================================= */

function renderInOvenColumn() {
  const batches =
    hqState.data.activeBatches;


  inOvenCount.textContent =
    String(batches.length);


  if (batches.length === 0) {
    inOvenOrderList.innerHTML =
      createEmptyState(
        "No active baking batch."
      );

    return;
  }


  inOvenOrderList.innerHTML =
    batches.map(function (batch) {

      return `
        <article class="order-card">

          <div class="order-card-top">

            <strong class="order-id-button">
              ${escapeHTML(batch.batchId)}
            </strong>

            <span class="order-status-badge is-paid">
              ${escapeHTML(batch.status)}
            </span>

          </div>

          <div class="order-items-preview">
            <p>
              ${escapeHTML(
                createItemsPreview(batch.items)
              )}
            </p>
          </div>

          <div class="order-meta-row">

            <strong class="order-total">
              ${getItemsQuantity(batch.items)} pcs
            </strong>

            <span class="order-time">
              ${escapeHTML(
                formatOrderTime(batch.startedAt)
              )}
            </span>

          </div>

        </article>
      `;

    }).join("");
}


/* =========================================================
   13. COOLING COLUMN
========================================================= */

function renderCoolingColumn() {
  const batches =
    hqState.data.coolingBatches;


  coolingCount.textContent =
    String(batches.length);


  if (batches.length === 0) {
    coolingOrderList.innerHTML =
      createEmptyState(
        "No cooling batch."
      );

    return;
  }


  coolingOrderList.innerHTML =
    batches.map(function (batch) {

      return `
        <article class="order-card">

          <div class="order-card-top">

            <strong class="order-id-button">
              ${escapeHTML(batch.batchId)}
            </strong>

            <span class="order-status-badge">
              COOLING
            </span>

          </div>

          <div class="order-items-preview">
            <p>
              ${escapeHTML(
                createItemsPreview(batch.items)
              )}
            </p>
          </div>

          <div class="order-meta-row">

            <strong class="order-total">
              ${getItemsQuantity(batch.items)} pcs
            </strong>

            <span class="order-time">
              Ready:
              ${escapeHTML(
                formatOrderTime(batch.coolingReadyAt)
              )}
            </span>

          </div>

        </article>
      `;

    }).join("");
}


/* =========================================================
   14. PACKING COLUMN
========================================================= */

function renderPackingColumn() {
  const queue =
    hqState.data.packingQueue;


  packingCount.textContent =
    String(queue.length);


  if (queue.length === 0) {
    packingOrderList.innerHTML =
      createEmptyState(
        "No order waiting to pack."
      );

    return;
  }


  packingOrderList.innerHTML =
    queue.map(function (box) {

      return `
        <article
          class="order-card"
          data-order-id="${escapeHTML(box.orderId)}"
        >

          <div class="order-card-top">

            <button
              class="order-id-button"
              type="button"
              data-packing-order-id="${escapeHTML(box.orderId)}"
            >
              ${escapeHTML(box.orderId)}
            </button>

            <span class="order-status-badge">
              ${escapeHTML(
                box.packingStatus || "WAITING"
              )}
            </span>

          </div>

          <p class="order-customer">
            ${escapeHTML(
              box.boxName ||
              "Box " + safeNumber(box.boxNumber)
            )}
          </p>

          <div class="order-items-preview">
            <p>
              ${escapeHTML(
                createItemsPreview(box.items)
              )}
            </p>
          </div>

          <div class="order-meta-row">

            <strong class="order-total">
              ${safeNumber(box.packedCookieQty)}
              /
              ${safeNumber(box.expectedCookieQty)}
            </strong>

            <span class="order-time">
              Packed
            </span>

          </div>

        </article>
      `;

    }).join("");
}


/* =========================================================
   15. SHIPPING COLUMN
========================================================= */

function renderShippingColumn() {
  const queue =
    hqState.data.shippingQueue;


  shippingCount.textContent =
    String(queue.length);


  if (queue.length === 0) {
    shippingOrderList.innerHTML =
      createEmptyState(
        "No order waiting to ship."
      );

    return;
  }


  shippingOrderList.innerHTML =
    queue.map(function (order) {

      const trackingText =
        order.trackingNo
          ? order.trackingNo
          : "Tracking pending";


      return `
        <article
          class="order-card"
          data-order-id="${escapeHTML(order.orderId)}"
        >

          <div class="order-card-top">

            <button
              class="order-id-button"
              type="button"
              data-shipping-order-id="${escapeHTML(order.orderId)}"
            >
              ${escapeHTML(order.orderId)}
            </button>

            <span class="order-status-badge is-paid">
              READY
            </span>

          </div>

          <p class="order-customer">
            ${escapeHTML(order.customerName || "Customer")}
          </p>

          <div class="order-items-preview">

            <p>
              ${escapeHTML(order.postcode || "No postcode")}
            </p>

            <p>
              ${escapeHTML(trackingText)}
            </p>

          </div>

          <div class="order-meta-row">

            <strong class="order-total">
              ${formatCurrency(order.grandTotal)}
            </strong>

            <span class="order-time">
              ${escapeHTML(order.courier || "Courier")}
            </span>

          </div>

        </article>
      `;

    }).join("");
}


/* =========================================================
   16. VERIFY PAYMENT MODAL
========================================================= */

function openVerifyPaymentModal(orderId) {

  const order =
    findVerificationOrder(orderId);


  if (!order) {
    showToast(
      "Order not found",
      "The order may already have been updated.",
      "error"
    );

    return;
  }


  hqState.selectedOrder = order;


  verifyModalOrderID.textContent =
    order.orderId || "—";

  verifyModalCustomerName.textContent =
    order.customerName || "—";

  verifyModalPhone.textContent =
    order.phone || "—";

  verifyModalTotal.textContent =
    formatCurrency(order.grandTotal);

  verifyModalPaymentStatus.textContent =
    order.paymentStatus || "PENDING";

  verifyModalItems.innerHTML =
    createVerifyModalItems(order.boxes);


  verifyPaymentModal.hidden = false;

  document.body.classList.add("modal-open");
}


function closeVerifyPaymentModal() {

  if (hqState.isVerifying) {
    return;
  }


  verifyPaymentModal.hidden = true;

  hqState.selectedOrder = null;

  updateBodyLock();
}


/* =========================================================
   17. CONFIRM VERIFY PAYMENT
========================================================= */

async function confirmVerifyPayment() {

  if (
    hqState.isVerifying ||
    !hqState.selectedOrder
  ) {
    return;
  }


  const orderId =
    hqState.selectedOrder.orderId;


  hqState.isVerifying = true;

  setVerifyButtonLoading(true);


  try {

    const payload = {
      action: "verifyPayment",
      orderId: orderId,
      verifiedBy: GOOKIE_HQ_CONFIG.VERIFIED_BY
    };


    const response = await fetch(
      GOOKIE_HQ_CONFIG.API_URL,
      {
        method: "POST",

        /*
          text/plain avoids unnecessary browser
          preflight problems with Apps Script.
        */
        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body: JSON.stringify(payload),

        redirect: "follow"
      }
    );


    if (!response.ok) {
      throw new Error(
        "Verification request failed. HTTP " +
        response.status
      );
    }


    const result = await response.json();


    if (!result || result.ok !== true) {
      throw new Error(
        result && result.message
          ? result.message
          : "Payment verification failed."
      );
    }


    verifyPaymentModal.hidden = true;

    hqState.selectedOrder = null;


    showToast(
      "Payment verified",
      orderId + " moved to Bake Queue.",
      "success"
    );


    await loadHQData({
      showLoadingScreen: false
    });

  } catch (error) {

    console.error(
      "GOOKIE HQ verify error:",
      error
    );


    showToast(
      "Verification failed",
      error.message,
      "error"
    );

  } finally {

    hqState.isVerifying = false;

    setVerifyButtonLoading(false);

    updateBodyLock();
  }
}


/* =========================================================
   18. ORDER DETAILS
========================================================= */

function openOrderDetails(orderId) {

  const order =
    findVerificationOrder(orderId);


  if (!order) {
    showToast(
      "Order unavailable",
      "Full details are not available in the current HQ data.",
      "error"
    );

    return;
  }


  orderDetailsModalTitle.textContent =
    order.orderId;


  orderDetailsContent.innerHTML = `
    <div class="order-details-grid">

      ${createDetailBox(
        "Customer",
        order.customerName || "—"
      )}

      ${createDetailBox(
        "Phone",
        order.phone || "—"
      )}

      ${createDetailBox(
        "Payment",
        order.paymentStatus || "PENDING"
      )}

      ${createDetailBox(
        "Grand Total",
        formatCurrency(order.grandTotal)
      )}

      ${createDetailBox(
        "Total Boxes",
        safeNumber(order.totalBoxes)
      )}

      ${createDetailBox(
        "Total Cookies",
        safeNumber(order.totalCookies)
      )}

    </div>

    <div class="order-detail-items">

      <h3>Order Items</h3>

      <p>
        ${escapeHTML(
          createBoxesPreview(order.boxes)
        )}
      </p>

    </div>
  `;


  orderDetailsModal.hidden = false;

  document.body.classList.add("modal-open");
}


function closeOrderDetailsModal() {
  orderDetailsModal.hidden = true;
  updateBodyLock();
}


/* =========================================================
   19. MISSION CONTROL
========================================================= */

function openMissionControl() {

  missionControlDrawer.classList.add("is-open");

  missionControlDrawer.setAttribute(
    "aria-hidden",
    "false"
  );

  missionControlButton.setAttribute(
    "aria-expanded",
    "true"
  );

  pageOverlay.hidden = false;

  requestAnimationFrame(function () {
    pageOverlay.classList.add("is-visible");
  });

  document.body.classList.add("drawer-open");

  setTimeout(function () {
    missionControlSearch.focus();
  }, 250);
}


function closeMissionControl() {

  if (
    !missionControlDrawer.classList.contains(
      "is-open"
    )
  ) {
    return;
  }


  missionControlDrawer.classList.remove("is-open");

  missionControlDrawer.setAttribute(
    "aria-hidden",
    "true"
  );

  missionControlButton.setAttribute(
    "aria-expanded",
    "false"
  );

  pageOverlay.classList.remove("is-visible");


  setTimeout(function () {
    pageOverlay.hidden = true;
  }, 240);


  document.body.classList.remove("drawer-open");
}


/* =========================================================
   20. RENDER MISSION CONTROL
========================================================= */

function renderMissionControl() {
  const data = hqState.data;


  const verifyEntries =
    data.awaitingVerification.map(function (order) {
      return {
        id: order.orderId,
        type: "order"
      };
    });


  /*
    Current hqData productionQueue is grouped by product,
    so it does not yet contain order IDs.
  */
  const bakeQueueEntries =
    data.productionQueue.map(function (item) {
      return {
        id:
          item.displayName ||
          item.menuCode ||
          item.productId,
        type: "product"
      };
    });


  const inOvenEntries =
    data.activeBatches.map(function (batch) {
      return {
        id: batch.batchId,
        type: "batch"
      };
    });


  const coolingEntries =
    data.coolingBatches.map(function (batch) {
      return {
        id: batch.batchId,
        type: "batch"
      };
    });


  const packingEntries =
    createUniqueEntries(
      data.packingQueue.map(function (box) {
        return {
          id: box.orderId,
          type: "order"
        };
      })
    );


  const shippingEntries =
    data.shippingQueue.map(function (order) {
      return {
        id: order.orderId,
        type: "order"
      };
    });


  renderDrawerGroup(
    drawerVerifyList,
    drawerVerifyCount,
    verifyEntries
  );


  renderDrawerGroup(
    drawerBakeQueueList,
    drawerBakeQueueCount,
    bakeQueueEntries
  );


  renderDrawerGroup(
    drawerInOvenList,
    drawerInOvenCount,
    inOvenEntries
  );


  renderDrawerGroup(
    drawerCoolingList,
    drawerCoolingCount,
    coolingEntries
  );


  renderDrawerGroup(
    drawerPackingList,
    drawerPackingCount,
    packingEntries
  );


  renderDrawerGroup(
    drawerShippingList,
    drawerShippingCount,
    shippingEntries
  );


  renderDrawerGroup(
    drawerCompletedList,
    drawerCompletedCount,
    []
  );


  bindDrawerButtons();
}


function renderDrawerGroup(
  listElement,
  countElement,
  entries
) {

  countElement.textContent =
    String(entries.length);


  if (entries.length === 0) {
    listElement.innerHTML = `
      <p class="drawer-order-empty">
        No active items.
      </p>
    `;

    return;
  }


  listElement.innerHTML =
    entries.map(function (entry) {

      return `
        <button
          class="drawer-order-button"
          type="button"
          data-drawer-id="${escapeHTML(entry.id)}"
          data-drawer-type="${escapeHTML(entry.type)}"
        >
          <span>${escapeHTML(entry.id)}</span>
          <span>›</span>
        </button>
      `;

    }).join("");
}


function bindDrawerButtons() {

  document
    .querySelectorAll("[data-drawer-id]")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        const itemId =
          button.dataset.drawerId;

        const itemType =
          button.dataset.drawerType;


        if (itemType === "order") {

          const verificationOrder =
            findVerificationOrder(itemId);


          if (verificationOrder) {
            closeMissionControl();

            setTimeout(function () {
              openOrderDetails(itemId);
            }, 220);

            return;
          }

        }


        highlightWorkflowItem(itemId);

        closeMissionControl();
      });

    });
}


/* =========================================================
   21. MISSION CONTROL SEARCH
========================================================= */

function handleMissionControlSearch() {

  const searchValue =
    missionControlSearch.value
      .trim()
      .toLowerCase();


  document
    .querySelectorAll(".drawer-order-button")
    .forEach(function (button) {

      const itemId =
        String(button.dataset.drawerId || "")
          .toLowerCase();


      const isMatch =
        !searchValue ||
        itemId.includes(searchValue);


      button.hidden = !isMatch;

      button.classList.toggle(
        "is-match",
        Boolean(searchValue && isMatch)
      );
    });


  document
    .querySelectorAll(".drawer-flow-group")
    .forEach(function (group) {

      const visibleButtons =
        Array.from(
          group.querySelectorAll(
            ".drawer-order-button"
          )
        ).filter(function (button) {
          return !button.hidden;
        });


      const hasSearch =
        searchValue.length > 0;


      group.hidden =
        hasSearch &&
        visibleButtons.length === 0;
    });
}


/* =========================================================
   22. HIGHLIGHT WORKFLOW ITEM
========================================================= */

function highlightWorkflowItem(itemId) {

  const cards =
    document.querySelectorAll(".order-card");


  let matchedCard = null;


  cards.forEach(function (card) {

    card.classList.remove("is-highlighted");


    if (
      card.textContent
        .toLowerCase()
        .includes(
          String(itemId).toLowerCase()
        )
    ) {
      matchedCard = card;
    }

  });


  if (!matchedCard) {
    showToast(
      "Item located",
      itemId,
      "success"
    );

    return;
  }


  matchedCard.classList.add("is-highlighted");


  matchedCard.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });


  setTimeout(function () {
    matchedCard.classList.remove(
      "is-highlighted"
    );
  }, 3500);
}


/* =========================================================
   23. CONNECTION STATUS
========================================================= */

function setConnectionStatus(status, text) {

  connectionStatus.dataset.status = status;

  connectionText.textContent = text;
}


/* =========================================================
   24. LOADING SCREEN
========================================================= */

function showHQLoadingScreen(message) {

  loadingMessage.textContent =
    message || "Loading GOOKIE HQ...";

  hqLoadingScreen.classList.remove("is-hidden");
}


function hideHQLoadingScreen() {

  hqLoadingScreen.classList.add("is-hidden");
}


function setRefreshButtonLoading(isLoading) {

  refreshHQButton.disabled = isLoading;

  refreshHQButton.textContent =
    isLoading ? "…" : "↻";
}


/* =========================================================
   25. VERIFY BUTTON LOADING
========================================================= */

function setVerifyButtonLoading(isLoading) {

  confirmVerifyPaymentButton.disabled =
    isLoading;

  cancelVerifyPaymentButton.disabled =
    isLoading;

  closeVerifyModalButton.disabled =
    isLoading;

  verifyButtonText.textContent =
    isLoading
      ? "Verifying..."
      : "Verify Payment";

  verifyButtonSpinner.hidden =
    !isLoading;
}


/* =========================================================
   26. CONNECTION ERROR
========================================================= */

function showHQConnectionError(message) {

  const errorHTML = `
    <div class="error-state">
      Unable to connect to GOOKIE HQ.<br>
      ${escapeHTML(message)}
    </div>
  `;


  verifyOrderList.innerHTML = errorHTML;
  bakeQueueOrderList.innerHTML = errorHTML;
  inOvenOrderList.innerHTML = errorHTML;
  coolingOrderList.innerHTML = errorHTML;
  packingOrderList.innerHTML = errorHTML;
  shippingOrderList.innerHTML = errorHTML;


  lastUpdatedText.textContent =
    "Connection failed";
}


/* =========================================================
   27. TOAST
========================================================= */

function showToast(
  title,
  message,
  type = "success"
) {

  clearTimeout(hqState.toastTimer);


  toastTitle.textContent =
    title;

  toastMessage.textContent =
    message;


  hqToast.classList.toggle(
    "is-error",
    type === "error"
  );


  toastIcon.textContent =
    type === "error" ? "!" : "✓";


  hqToast.hidden = false;


  hqState.toastTimer =
    setTimeout(function () {
      hqToast.hidden = true;
    }, 4200);
}


/* =========================================================
   28. AUTO REFRESH
========================================================= */

function startAutoRefresh() {

  clearInterval(hqState.autoRefreshTimer);


  hqState.autoRefreshTimer =
    setInterval(function () {

      if (
        document.hidden ||
        hqState.isLoading ||
        hqState.isVerifying
      ) {
        return;
      }


      loadHQData({
        showLoadingScreen: false
      });

    }, GOOKIE_HQ_CONFIG.AUTO_REFRESH_MS);
}


/* =========================================================
   29. HELPER — FIND ORDER
========================================================= */

function findVerificationOrder(orderId) {

  if (!hqState.data) {
    return null;
  }


  return (
    hqState.data.awaitingVerification.find(
      function (order) {
        return order.orderId === orderId;
      }
    ) || null
  );
}


/* =========================================================
   30. HELPER — ORDER BOXES
========================================================= */

function createBoxesPreview(boxes) {

  if (!Array.isArray(boxes) || boxes.length === 0) {
    return "No box details";
  }


  return boxes.map(function (box, index) {

    const boxName =
      box.boxName ||
      box.name ||
      "Box " + (index + 1);


    const itemText =
      createItemsPreview(
        Array.isArray(box.items)
          ? box.items
          : []
      );


    return itemText
      ? boxName + ": " + itemText
      : boxName;

  }).join(" • ");
}


function createVerifyModalItems(boxes) {

  if (!Array.isArray(boxes) || boxes.length === 0) {
    return "<p>No item details available.</p>";
  }


  return boxes.map(function (box, index) {

    const boxName =
      box.boxName ||
      box.name ||
      "Box " + (index + 1);


    const items =
      Array.isArray(box.items)
        ? box.items
        : [];


    const itemsHTML =
      items.length > 0
        ? `
          <ul>
            ${items.map(function (item) {
              return `
                <li>
                  ${escapeHTML(
                    item.displayName ||
                    item.productName ||
                    item.productId ||
                    "Cookie"
                  )}
                  ×${safeNumber(item.qty)}
                </li>
              `;
            }).join("")}
          </ul>
        `
        : "<p>No item details.</p>";


    return `
      <div class="order-detail-items">
        <h3>${escapeHTML(boxName)}</h3>
        ${itemsHTML}
      </div>
    `;

  }).join("");
}


/* =========================================================
   31. HELPER — ITEMS
========================================================= */

function createItemsPreview(items) {

  if (!Array.isArray(items) || items.length === 0) {
    return "No item details";
  }


  return items.map(function (item) {

    const name =
      item.displayName ||
      item.productName ||
      item.menuCode ||
      item.productId ||
      "Cookie";


    return (
      name +
      " ×" +
      safeNumber(item.qty)
    );

  }).join(", ");
}


function getItemsQuantity(items) {

  if (!Array.isArray(items)) {
    return 0;
  }


  return items.reduce(function (total, item) {
    return total + safeNumber(item.qty);
  }, 0);
}


/* =========================================================
   32. HELPER — DETAIL BOX
========================================================= */

function createDetailBox(label, value) {

  return `
    <div class="order-detail-box">

      <span>${escapeHTML(label)}</span>

      <strong>
        ${escapeHTML(String(value))}
      </strong>

    </div>
  `;
}


/* =========================================================
   33. HELPER — EMPTY STATE
========================================================= */

function createEmptyState(message) {

  return `
    <div class="empty-state">
      <span>✓</span>
      <p>${escapeHTML(message)}</p>
    </div>
  `;
}


/* =========================================================
   34. HELPER — FORMAT CURRENCY
========================================================= */

function formatCurrency(value) {

  return new Intl.NumberFormat(
    "en-MY",
    {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2
    }
  ).format(safeNumber(value));
}


/* =========================================================
   35. HELPER — FORMAT DATE
========================================================= */

function formatOrderTime(value) {

  if (!value) {
    return "—";
  }


  const date =
    new Date(value);


  if (Number.isNaN(date.getTime())) {
    return String(value);
  }


  return new Intl.DateTimeFormat(
    "en-MY",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }
  ).format(date);
}


function updateLastUpdated(value) {

  const date =
    value ? new Date(value) : new Date();


  if (Number.isNaN(date.getTime())) {
    lastUpdatedText.textContent =
      "HQ updated";

    return;
  }


  lastUpdatedText.textContent =
    "Last updated " +
    new Intl.DateTimeFormat(
      "en-MY",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }
    ).format(date);
}


/* =========================================================
   36. HELPER — NUMBERS
========================================================= */

function safeNumber(value) {

  const number =
    Number(value);


  return Number.isFinite(number)
    ? number
    : 0;
}


/* =========================================================
   37. HELPER — UNIQUE ENTRIES
========================================================= */

function createUniqueEntries(entries) {

  const seen = new Set();


  return entries.filter(function (entry) {

    if (!entry.id || seen.has(entry.id)) {
      return false;
    }


    seen.add(entry.id);

    return true;
  });
}


/* =========================================================
   38. HELPER — BODY LOCK
========================================================= */

function updateBodyLock() {

  const hasOpenModal =
    !verifyPaymentModal.hidden ||
    !orderDetailsModal.hidden;


  document.body.classList.toggle(
    "modal-open",
    hasOpenModal
  );
}


/* =========================================================
   39. HELPER — ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   40. HELPER — WHATSAPP
========================================================= */

function normaliseWhatsAppPhone(phone) {

  let number = String(phone || "")
    .replace(/\D/g, "");

  if (!number) {
    return "";
  }

  if (number.startsWith("0")) {
    number = "60" + number.slice(1);
  }

  if (!number.startsWith("60")) {
    number = "60" + number;
  }

  return number;
}


function openCustomerWhatsApp(orderId) {

  const order = findVerificationOrder(orderId);

  if (!order) {
    showToast(
      "Order not found",
      "Customer details are unavailable.",
      "error"
    );
    return;
  }

  const phone = normaliseWhatsAppPhone(order.phone);

  if (!phone) {
    showToast(
      "Phone unavailable",
      "This order does not have a valid phone number.",
      "error"
    );
    return;
  }

  window.open(
    "https://wa.me/" + phone,
    "_blank",
    "noopener,noreferrer"
  );
}
