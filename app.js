// ===============================
// WAFLA MARKET - APP.JS
// ===============================

const { createClient } = supabase;

const db = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


// ===============================
// ELEMENTS
// ===============================

const productForm = document.getElementById("productForm");
const productGrid = document.getElementById("productGrid");
const statusText = document.getElementById("status");

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const signupMsg = document.getElementById("signupMsg");
const loginMsg = document.getElementById("loginMsg");

const productMsg = document.getElementById("productMsg");

const authState = document.getElementById("authState");
const logoutBtn = document.getElementById("logoutBtn");

const sellerMsg = document.getElementById("sellerMsg");
const myListings = document.getElementById("myListings");


// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts() {

  if (!productGrid) return;

  if (statusText) {
    statusText.textContent = "Loading products...";
  }

  const searchInput = document.getElementById("q");
  const categoryInput = document.getElementById("category");

  const search = searchInput
    ? searchInput.value.trim()
    : "";

  const category = categoryInput
    ? categoryInput.value
    : "";


  let query = db
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false
    });


  // Search
  if (search) {

    query = query.ilike(
      "name",
      `%${search}%`
    );

  }


  // Category
  if (category) {

    query = query.eq(
      "category",
      category
    );

  }


  const {
    data,
    error
  } = await query;


  if (error) {

    console.error(
      "LOAD PRODUCTS ERROR:",
      error
    );

    if (statusText) {
      statusText.textContent =
        "Failed to load products.";
    }

    return;
  }


  // No products
  if (!data || data.length === 0) {

    if (statusText) {
      statusText.textContent =
        "No products found.";
    }

    productGrid.innerHTML = "";

    return;
  }


  if (statusText) {

    statusText.textContent =
      `${data.length} product(s) found.`;

  }


  productGrid.innerHTML = "";


  data.forEach(product => {

    const card =
      document.createElement("div");

    card.className =
      "product-card";


    const image = product.image_url
      ? product.image_url
      : "https://via.placeholder.com/500x350?text=WAFLA+MARKET";


    card.innerHTML = `

      <img
        src="${escapeHTML(image)}"
        alt="${escapeHTML(product.name)}"
        onerror="this.src='https://via.placeholder.com/500x350?text=WAFLA+MARKET'"
      >

      <div class="product-info">

        <h3>
          ${escapeHTML(product.name)}
        </h3>

        <p class="price">
          TZS ${Number(product.price).toLocaleString()}
        </p>

        <p>
          📂 ${escapeHTML(product.category)}
        </p>

        <p class="location">
          📍 ${escapeHTML(product.location)}
        </p>

        <p>
          ${escapeHTML(product.description || "")}
        </p>

        <br>

        <a
          class="btn"
          href="tel:${escapeHTML(product.phone)}"
        >
          📞 Contact Seller
        </a>

      </div>

    `;


    productGrid.appendChild(card);

  });

}


// ===============================
// ADD / SELL PRODUCT
// ===============================

if (productForm) {

  productForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      if (productMsg) {
        productMsg.textContent =
          "Saving product...";
      }


      const name =
        document
          .getElementById("p_name")
          .value
          .trim();


      const price =
        Number(
          document
            .getElementById("p_price")
            .value
        );


      const category =
        document
          .getElementById("p_category")
          .value;


      const location =
        document
          .getElementById("p_location")
          .value
          .trim();


      const phone =
        document
          .getElementById("p_phone")
          .value
          .trim();


      const image_url =
        document
          .getElementById("p_image")
          .value
          .trim() || null;


      const description =
        document
          .getElementById("p_description")
          .value
          .trim() || null;


      // Check required fields
      if (
        !name ||
        !price ||
        !category ||
        !location ||
        !phone
      ) {

        if (productMsg) {

          productMsg.textContent =
            "Please fill all required fields.";

        }

        return;
      }


      // Product object
      const product = {

        name: name,

        price: price,

        category: category,

        location: location,

        phone: phone,

        image_url: image_url,

        description: description

      };


      // Save to Supabase
      const {
        data,
        error
      } = await db
        .from("products")
        .insert([product])
        .select();


      if (error) {

        console.error(
          "SAVE PRODUCT ERROR:",
          error
        );

        if (productMsg) {

          productMsg.textContent =
            "Failed to save product: " +
            error.message;

        }

        return;
      }


      console.log(
        "Product saved:",
        data
      );


      if (productMsg) {

        productMsg.textContent =
          "✅ Product added successfully!";

      }


      productForm.reset();


      // Show product immediately
      await loadProducts();

    }
  );

}


// ===============================
// SEARCH
// ===============================

const searchInput =
  document.getElementById("q");


if (searchInput) {

  searchInput.addEventListener(
    "input",
    loadProducts
  );

}


// ===============================
// CATEGORY FILTER
// ===============================

const categoryInput =
  document.getElementById("category");


if (categoryInput) {

  categoryInput.addEventListener(
    "change",
    loadProducts
  );

}


// ===============================
// SIGN UP
// ===============================

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      if (signupMsg) {

        signupMsg.textContent =
          "Creating account...";

      }


      const fullName =
        document
          .getElementById("full_name")
          .value
          .trim();


      const email =
        document
          .getElementById("email")
          .value
          .trim();


      const password =
        document
          .getElementById("password")
          .value;


      const {
        error
      } = await db.auth.signUp({

        email: email,

        password: password,

        options: {

          data: {

            full_name: fullName

          }

        }

      });


      if (error) {

        if (signupMsg) {

          signupMsg.textContent =
            error.message;

        }

        return;
      }


      if (signupMsg) {

        signupMsg.textContent =
          "✅ Account created. Check your email.";

      }

    }
  );

}


// ===============================
// LOGIN
// ===============================

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      if (loginMsg) {

        loginMsg.textContent =
          "Logging in...";

      }


      const email =
        document
          .getElementById("loginEmail")
          .value
          .trim();


      const password =
        document
          .getElementById("loginPassword")
          .value;


      const {
        data,
        error
      } = await db.auth
        .signInWithPassword({

          email: email,

          password: password

        });


      if (error) {

        if (loginMsg) {

          loginMsg.textContent =
            error.message;

        }

        return;
      }


      if (loginMsg) {

        loginMsg.textContent =
          "✅ Login successful.";

      }


      updateAuthUI();

    }
  );

}


// ===============================
// LOGOUT
// ===============================

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    async function() {

      await db.auth.signOut();

      updateAuthUI();

    }
  );

}


// ===============================
// AUTH UI
// ===============================

async function updateAuthUI() {

  const {
    data: { user }
  } = await db.auth.getUser();


  if (user) {

    if (authState) {

      authState.textContent =
        `Signed in as ${user.email}`;

    }


    if (logoutBtn) {

      logoutBtn.classList.remove(
        "hidden"
      );

    }


    if (signupForm) {

      signupForm.style.display =
        "none";

    }


    if (loginForm) {

      loginForm.style.display =
        "none";

    }

  } else {

    if (authState) {

      authState.textContent =
        "Not signed in.";

    }


    if (logoutBtn) {

      logoutBtn.classList.add(
        "hidden"
      );

    }


    if (signupForm) {

      signupForm.style.display =
        "block";

    }


    if (loginForm) {

      loginForm.style.display =
        "block";

    }

  }

}


// ===============================
// SECURITY HELPER
// ===============================

function escapeHTML(value) {

  if (!value) return "";

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


// ===============================
// START APP
// ===============================

db.auth.onAuthStateChange(
  function() {

    updateAuthUI();

  }
);


// Load products when page opens
loadProducts();


// Update login state
updateAuthUI();
