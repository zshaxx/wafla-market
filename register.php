<?php include 'config.php';
if($_POST){
 $hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
 $conn->prepare("INSERT INTO users(jina,email,password) VALUES(?,?,?)")
 ->execute([$_POST['jina'], $_POST['email'], $hash]);
 header("Location: login.php");
}
?>
<form method="POST">
<input name="jina" placeholder="Jina kamili" required>
<input name="email" type="email" placeholder="Email" required>
<input name="password" type="password" placeholder="Password" required>
<button>Jisajili</button>
</form>
