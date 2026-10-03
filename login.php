<?php include 'config.php';
if($_POST){
 $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
 $stmt->execute([$_POST['email']]);
 $u = $stmt->fetch();
 if($u && password_verify($_POST['password'], $u['password'])){
   $_SESSION['user'] = $u; header("Location: index.php");
 } else { echo "Email au password si sahihi"; }
}
?>
<form method="POST">
<input name="email" type="email" placeholder="Email" required>
<input name="password" type="password" placeholder="Password" required>
<button>Ingia</button>
</form>
