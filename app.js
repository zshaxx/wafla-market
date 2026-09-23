// ===============================
// WAFLA MARKET - APP.JS
// ===============================

const { createClient } = supabase;

// Supabase client
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
const sellerMsg = document.getElementById("sellerMsg");
const myListings = document.getElementById("myListings");

const authState = document.getElementById("authState");
const logoutBtn = document.getElementById("logoutBtn");


// ===============================
// LOAD PRODUCTS
// ===============================

async function loadProducts() {

  statusText.textContent = "Loading products...";

  const search = document
    .getElementById("q")
    .value
    .trim();

  const category = document
    .getElementById("category")
    .value;

  let query = db
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });


  // Search
  if (search) {
    query = query.ilike("name", `%${search}%`);
  }


  // Category
  if (category) {
    query = query.eq("category", category);
  }


  const { data, error } = await query;


  if (error) {

    console.error(error);

    statusText.textContent =
      "Failed to load products.";

    return;
  }


  if (!data || data.length === 0) {

    statusText.textContent =
      "No products found.";

    productGrid.innerHTML = "";

    return;
  }


  statusText.textContent =
    `${data.length} product(s) found.`;

  productGrid.innerHTML = "";


  data.forEach(product => {

    const card = document.createElement("div");

    card.className = "product-card";


    const image = product.image_url
      ? product.image_url
      : "https://via.placeholder.com/500x350?text=WAFLA+MARKET";


    card.innerHTML = `

      <img
        src="${image}"
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

        <p class="location">
          📍 ${escapeHTML(product.location)}
        </p>

        <p>
          ${escapeHTML(product.description || "")}
        </p>

        <br>

        <a
          class="btn"
          href="tel:${product.phone}"
        >
          📞 Contact Seller
        </a>

      </div>
    `;


    productGrid.appendChild(card);

  });

}


// ===============================
// SELL PRODUCT
// ===============================

productForm.addEventListener("submit", async function(event) {

  event.preventDefault();

  productMsg.textContent = "Saving listing...";


  // Check login
  const {
    data: { user }
  } = await db.auth.getUser();


  if (!user) {

    productMsg.textContent =
      "Please login before selling a product.";

    return;
  }


  // Find seller
  const {
    data: seller,
    error: sellerError
  } = await db
    .from("sellers")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();


  if (sellerError || !seller) {

    console.error(sellerError);

    productMsg.textContent =
      "Seller account not found.";

    return;
  }


  const product = {

    seller_id: seller.id,

    name: document
      .getElementById("p_name")
      .value
      .trim(),

    price: Number(
      document.getElementById("p_price").value
    ),

    category: document
      .getElementById("p_category")
      .value,

    location: document
      .getElementById("p_location")
      .value
      .trim(),

    phone: document
      .getElementById("p_phone")
      .value
      .trim(),

    image_url: document
      .getElementById("p_image")
      .value
      .trim() || null,

    description: document
      .getElementById("p_description")
      .value
      .trim() || null,

    status: "published"

  };


  const {
    error
  } = await db
    .from("products")
    .insert(product);


  if (error) {

    console.error(error);

    productMsg.textContent =
      "Failed to save listing.";

    return;
  }


  productMsg.textContent =
    "✅ Product listed successfully!";


  productForm.reset();


  // Reload market
  loadProducts();


  // Reload seller listings
  loadMyListings();

});


// ===============================
// CREATE SELLER ACCOUNT
// ===============================

signupForm.addEventListener("submit", async function(event) {

  event.preventDefault();

  signupMsg.textContent =
    "Creating account...";


  const fullName =
    document.getElementById("full_name")
      .value
      .trim();

  const email =
    document.getElementById("email")
      .value
      .trim();

  const password =
    document.getElementById("password")
      .value;


  const {
    data,
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

    signupMsg.textContent =
      error.message;

    return;
  }


  // Create seller profile if session exists
  if (data.user && data.session) {

    await createSellerProfile(
      data.user,
      fullName,
      email
    );

  }


  signupMsg.textContent =
    "✅ Account created. Check your email if confirmation is required.";

});


// ===============================
// CREATE SELLER PROFILE
// ===============================

async function createSellerProfile(
  user,
  fullName,
  email
) {

  const {
    error
  } = await db
    .from("sellers")
    .upsert({

      auth_user_id: user.id,

      full_name: fullName,

      email: email

    }, {

      onConflict: "auth_user_id"

    });


  if (error) {

    console.error(
      "Seller profile error:",
      error
    );

  }

}


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", async function(event) {

  event.preventDefault();

  loginMsg.textContent =
    "Logging in...";


  const email =
    document.getElementById("loginEmail")
      .value
      .trim();

  const password =
    document.getElementById("loginPassword")
      .value;


  const {
    data,
    error
  } = await db.auth.signInWithPassword({

    email: email,

    password: password

  });


  if (error) {

    loginMsg.textContent =
      error.message;

    return;
  }


  // Make sure seller profile exists
  await createSellerProfile(
    data.user,
    data.user.user_metadata?.full_name || "",
    data.user.email
  );


  loginMsg.textContent =
    "✅ Login successful.";

  updateAuthUI();

  loadMyListings();

});


// ===============================
// LOGOUT
// ===============================

logoutBtn.addEventListener("click", async function() {

  await db.auth.signOut();

  updateAuthUI();

  myListings.innerHTML = "";

  sellerMsg.textContent =
    "Login to see your listings.";

});


// ===============================
// AUTH UI
// ===============================

async function updateAuthUI() {

  const {
    data: { user }
  } = await db.auth.getUser();


  if (user) {

    authState.textContent =
      `Signed in as ${user.email}`;

    logoutBtn.classList.remove("hidden");

    signupForm.style.display = "none";
    loginForm.style.display = "none";

    sellerMsg.textContent =
      "Your products:";

    loadMyListings();

  } else {

    authState.textContent =
      "Not signed in.";

    logoutBtn.classList.add("hidden");

    signupForm.style.display = "block";
    loginForm.style.display = "block";

  }

}


// ===============================
// MY LISTINGS
// ===============================

async function loadMyListings() {

  const {
    data: { user }
  } = await db.auth.getUser();


  if (!user) {

    sellerMsg.textContent =
      "Login to see your listings.";

    return;
  }


  const {
    data: seller,
    error: sellerError
  } = await db
    .from("sellers")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();


  if (sellerError || !seller) {

    sellerMsg.textContent =
      "Seller profile not found.";

    return;
  }


  const {
    data,
    error
  } = await db
    .from("products")
    .select("*")
    .eq("seller_id", seller.id)
    .order("created_at", {
      ascending: false
    });


  if (error) {

    console.error(error);

    sellerMsg.textContent =
      "Failed to load listings.";

    return;
  }


  if (!data || data.length === 0) {

    sellerMsg.textContent =
      "You have no listings yet.";

    myListings.innerHTML = "";

    return;
  }


  sellerMsg.textContent =
    `You have ${data.length} listing(s).`;


  myListings.innerHTML = "";


  data.forEach(product => {

    const item =
      document.createElement("div");

    item.className =
      "product-card";


    item.innerHTML = `

      <div class="product-info">

        <h3>
          ${escapeHTML(product.name)}
        </h3>

        <p class="price">
          TZS ${Number(product.price).toLocaleString()}
        </p>

        <p>
          ${escapeHTML(product.category)}
        </p>

        <p>
          📍 ${escapeHTML(product.location)}
        </p>

        <p>
          Status: ${escapeHTML(product.status)}
        </p>

      </div>

    `;


    myListings.appendChild(item);

  });

}


// ===============================
// SECURITY HELPER
// ===============================

function escapeHTML(value) {

  if (!value) return "";

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ===============================
// START APP
// ===============================

db.auth.onAuthStateChange(
  function() {

    updateAuthUI();

  }
);


loadProducts();
updateAuthUI();
