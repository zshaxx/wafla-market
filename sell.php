<?php include 'config.php';
if(!isset($_SESSION['user'])){ header("Location: login.php"); exit; }
if($_POST){
 $picha = $_FILES['picha']['name'];
 move_uploaded_file($_FILES['picha']['tmp_name'], "uploads/".$picha);
 $conn->prepare("INSERT INTO products(jina_bizaa,bei,picha,muuzaji_id) VALUES(?,?,?,?)")
 ->execute([$_POST['jina'], $_POST['bei'], $picha, $_SESSION['user']['id']]);
 header("Location: index.php");
}
?>
<form method="POST" enctype="multipart/form-data">
<input name="jina" placeholder="Jina la bidhaa" required>
<input name="bei" type="number" placeholder="Bei TZS" required>
<input name="picha" type="file" accept="image/*" required>
<button>Pakia Bidhaa</button>
</form>
