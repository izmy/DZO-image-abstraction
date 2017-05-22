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
            <a class="nav-link active" href="index.php">Vyfotit přes webovou kameru</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="image.php">Nahrát obrázek</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="log.php">LoG funkce</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="main">
        <div class="container">

            <div class="box-camera">
                <div class="app">

                    <a href="#" id="start-camera" class="visible">Touch here to start the app.</a>
                    <video id="camera-stream"></video>
                    <img id="snap">

                    <p id="error-message"></p>

                    <div class="controls">
                        <a href="#" id="delete-photo" title="Delete Photo" class="disabled"><i class="material-icons">delete</i></a>
                        <a href="#" id="take-photo" title="Take Photo"><i class="material-icons">camera_alt</i></a>
                        <a href="#" id="select-photo" title="Select Photo" class="disabled"><i class="material-icons">done</i></a>  
                    </div>

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

    <script src="./js/camera.js"></script>
    <script src="./js/filters.js"></script>
  

</body>
</html>