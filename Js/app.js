/* =====================================================
   WAFLA MARKET - APP.JS
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     ELEMENTS
     =================================================== */

  const searchInput =
    document.getElementById("searchInput");

  const clearSearch =
    document.getElementById("clearSearch");

  const filterBtn =
    document.getElementById("filterBtn");

  const filters =
    document.getElementById("filters");

  const categories =
    document.querySelectorAll(".category");

  const products =
    document.querySelectorAll(".product-card");

  const productGrid =
    document.getElementById("productGrid");

  const productNumber =
    document.getElementById("productNumber");

  const cartCount =
    document.getElementById("cartCount");

  const cartBtn =
    document.getElementById("cartBtn");

  const notificationBtn =
    document.getElementById("notificationBtn");

  const sellBtn =
    document.getElementById("sellBtn");

  const bottomSellBtn =
    document.getElementById("bottomSellBtn");

  const sellModal =
    document.getElementById("sellModal");

  const closeModal =
    document.getElementById("closeModal");

  const productForm =
    document.getElementById("productForm");

  const toast =
    document.getElementById("toast");

  const seeAllBtn =
    document.getElementById("seeAllBtn");


  /* ===================================================
     CART
     =================================================== */

  let cart = 0;

  cartCount.textContent = cart;


  /* ===================================================
     SHOW TOAST
     =================================================== */

  function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);

  }


  /* ===================================================
     SEARCH PRODUCTS
     =================================================== */

  function searchProducts() {

    const searchValue =
      searchInput.value
        .toLowerCase()
        .trim();

    let visibleProducts = 0;


    products.forEach(product => {

      const productName =
        product
          .dataset
          .name
          .toLowerCase();

      const productCategory =
        product
          .dataset
          .category
          .toLowerCase();


      if (
        productName.includes(searchValue) ||
        productCategory.includes(searchValue)
      ) {

        product.classList.remove("hidden");

        visibleProducts++;

      } else {

        product.classList.add("hidden");

      }

    });


    updateProductNumber(visibleProducts);

    showNoResults(visibleProducts);

  }


  /* ===================================================
    
