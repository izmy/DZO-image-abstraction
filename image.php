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
            <a class="nav-link active" href="image.php">Nahrát obrázek</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="db.php">Databáze obrázků</a>
          </li> -->
        </ul>
      </div>
    </nav>

    <div class="main">
        <div class="container">

            <input type="file" id="imageLoader" name="imageLoader"/>

            <div class="box-camera">
                <div class="app">
                    <canvas id="canvas" width="640" height="480"></canvas>
                </div>
            </div>

            <ul class="filters">
                <li id="normalHandler">
                    <img src="img/normal.jpg" alt="Původní verze">
                    <span>Původní verze</span>
                </li>
                <li id="grayscaleHandler">
                    <img src="img/grayscale.jpg" alt="Stupně šedi">
                    <span>Stupně šedi</span>
                </li>
                <li id="invertHandler">
                    <img src="img/invert.jpg" alt="Invertovat">
                    <span>Invertovat</span>
                </li>
                <li id="bilateralHandler">
                    <img src="img/bilateral.jpg" alt="Bilaterální filtr">
                    <span>Bilaterální filtr</span>
                </li>
                <li id="edgeSobelHandler">
                    <img src="img/bilateral.jpg" alt="Hrany - Sobel">
                    <span>Hrany - Sobel</span>
                </li>
                <li id="edgeLogHandler">
                    <img src="img/bilateral.jpg" alt="Hrany - LoG">
                    <span>Hrany - LoG</span>
                </li>
            </ul>

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

    <script src="./js/upload.js"></script>
    <script src="./js/filters.js"></script>
  

</body>
</html>