<?php include 'config.php'; 
if(!isset($_SESSION['user'])){ header("Location: login.php"); }
$products = $conn->query("SELECT p.*, u.jina FROM products p JOIN users u ON p.muuzaji_id=u.id ORDER BY p.created_at DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WAFLA MARKET</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="header">
  <div class="logo">
    <div class="logo-icon">
      <!-- SVG BADGE badala ya 🧺 -->
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffcc00"><path d="M6 8h12v8H6z"/><path d="M4 10h16v2H4z" fill="#ff6a00"/></svg>
    </div>
    <div class="logo-text"><span>WAFLA</span><span>MARKET</span></div>
  </div>
  <div class="header-actions">
    <button class="icon-btn">
      <!-- SVG BELL badala ya 🔔 -->
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#131a4a" stroke-width="2"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
    </button>
    <a href="sell.php" class="cart-btn" style="text-decoration:none">
      <!-- SVG CART badala ya 🛒 -->
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#131a4a" stroke-width="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4"/><circle cx="9" cy="20" r="1.5"/><circle cx="19" cy="20" r="1.5"/></svg>
      <span>+</span>
    </a>
  </div>
</header>

<main class="container">
  <section class="location-section">
    <div class="location-box">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a56a00" stroke-width="2"><path d="M12 21c-4-4-7-7-7-10a7 7 0 0114 0c0 3-3 6-7 10z"/><circle cx="12" cy="11" r="2.5"/></svg>
      <div><small>YOUR LOCATION</small><strong>Mwanza, Tanzania - <?= $_SESSION['user']['jina'] ?></strong></div>
      <a href="logout.php">Toka</a>
    </div>
  </section>

  <section class="search-section">
    <div class="search-box">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a56a00" stroke-width="2"><circle cx="11" cy="11" r="6"/><path d="M21 21l-3.5-3.5"/></svg>
      <input type="text" id="searchInput" placeholder="Search fish, fabrics, produce...">
    </div>
  </section>

  <section class="products-header"><h1>Popular in Mwanza</h1><p><?= count($products) ?> Products available</p></section>

  <section class="product-grid">
    <?php foreach($products as $p): ?>
    <article class="product-card">
      <div class="product-image">
        <img src="uploads/<?= htmlspecialchars($p['picha']) ?>" alt="">
      </div>
      <div class="product-info">
        <h2><?= htmlspecialchars($p['jina_bizaa']) ?></h2>
        <div class="price">TZS <?= number_format($p['bei']) ?> <span>/ piece</span></div>
        <div class="product-bottom">
          <div class="rating">
            <!-- SVG STAR badala ya ⭐ -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffcc00"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <?= htmlspecialchars($p['jina']) ?>
          </div>
          <button class="add-btn">+</button>
        </div>
      </div>
    </article>
    <?php endforeach; ?>
    <?php if(empty($products)): ?>
      <p>Hakuna bidhaa bado. <a href="sell.php">Pakia ya kwanza</a></p>
    <?php endif; ?>
  </section>
</main>
</body>
                                                                                                                                       </html>
