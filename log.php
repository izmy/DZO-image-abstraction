<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="author" content="Jaroslav Hrách">

    <title>Obrázkové filtry</title>

    <!-- Bootstrap core CSS -->
    <link href="./css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="./css/style.css" rel="stylesheet">
</head>

<body>

    <nav class="navbar navbar-static-top navbar-dark bg-inverse">
      <div class="container">
        <a class="navbar-brand" href="index.php">Obrázkové filtry</a>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="index.php">Vyfotit přes webovou kameru</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="image.php">Nahrát obrázek</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="log.php">LoG funkce</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="main">
        <div class="container">

        	<label for="logSize">Velikost jádra:</label>
        	<input type="text" id="logSize">
        	<br>
        	<label for="logSigma">Sigma</label>
        	<input type="text" id="logSigma">
        	<br>
        	<input type="button" id="LogHandler" value="Odeslat">
            
            <div id="LogTable">
            </div>

        </div>
    </div>

    <div class="container">
      <hr>

      <footer>
        <p>© Jaroslav Hrách</p>
      </footer>
    </div> <!-- /container -->

    <script src="./js/jquery-3.2.1.min.js"></script>
    <script src="./js/tether.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>

    <script src="./js/log.js"></script>
  

</body>
</html>