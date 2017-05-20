var imageLoader = document.getElementById('imageLoader');
var canvas = document.getElementById('canvas');
imageLoader.addEventListener('change', handleImage, false);

var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
            canvas.style.display = "block";
            canvas.style.maxWidth = "100%";
            canvas.style.margin = "auto";
            draw();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}