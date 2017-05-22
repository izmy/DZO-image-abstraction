var filters = document.querySelector('.filters');

class gaussianKernel {
    constructor(sigma = 1, w = 13, h) {
        this.w = w
        this.h = h || w
        //console.log('making kernel', sigma, this.w, 'x', this.h)

        this.kern = new Float32Array(this.w * this.h)
        this.cx = Math.floor(this.w / 2);
        this.cy = Math.floor(this.h / 2);

        this.sigma = sigma

        var sigma2Sqr = 2.0 * sigma * sigma;

        for (var y = 0; y < this.h; y++) {
            for (var x = 0; x < this.w; x++) {
                var rx = (x - this.cx);
                var ry = (y - this.cy);
                var d2 = rx * rx + ry * ry;
                this.kern[y * this.w + x] = this.gausVal(d2) //Math.exp( -d2 / sigma2Sqr );
            }
        }
    }

    gausVal(d) {
        return Math.exp(-d / (2 * this.sigma * this.sigma))
    }

    whats(x, y) {
        return this.kern[(y + this.cy) * this.w + x + this.cx]
    }

}

class laplaceKernelX{
  constructor(size)
  {
    if (size == 3) {

        this.w = 3
        this.h = 3
        this.cx = 1
        this.cy = 1

        this.kern = new Float32Array( [0,1,0, 1,-4,1, 0,1,0])
        //this.kern = new Float32Array( [-0.02436544,-0.04782394,-0.02436544, -0.04782394,-0.08285868,-0.04782394, -0.02436544,-0.04782394,-0.02436544])

    } else if ( size == 5) {
        this.w = 5
        this.h = 5
        this.cx = 2
        this.cy = 2
        
        this.kern = new Float32Array( [ 0,0,1,0,0, 0,1,2,1,0, 1,2,-16,2,1, 0,1,2,1,0, 0,0,1,0,0 ])
        // this.kern = new Float32Array( [ 0.01120461,  0.00637571,  0.00060951,  0.00637571,  0.01120461, 
        //                                 0.00637571, -0.02436544, -0.04782394, -0.02436544,  0.00637571, 
        //                                 0.00060951, -0.04782394, -0.08285868, -0.04782394,  0.00060951,
        //                                 0.00637571, -0.02436544, -0.04782394, -0.02436544,  0.00637571,
        //                                 0.01120461,  0.00637571,  0.00060951,  0.00637571,  0.01120461 ])

    } else {
        this.w = 7
        this.h = 7
        this.cx = 3
        this.cy = 3

        this.kern = new Float32Array( [0, 0, 1,   1, 1, 0, 0, 
                                       0, 1, 3,   3, 3, 1, 0,
                                       1, 3, 0,  -7, 0, 3, 1,
                                       1, 3, -7,-24,-7, 3, 1,
                                       1, 3, 0,  -7, 0, 3, 1,
                                       0, 1, 3,   3, 3, 1, 0,
                                       0, 0, 1,   1, 1, 0, 0
                                       ])
    }
    
  }

  whats(x,y){
    return this.kern[(y+this.cy)*this.w + x+this.cx]
  }

}

class sobelKernelX{
  constructor()
  {
    this.w = 3
    this.h = 3

    this.kern = new Float32Array( [-1,0,1, -2,0,2, -1,0,1])
    this.cx = 1
    this.cy = 1
  }

  whats(x,y){
    return this.kern[(y+this.cy)*this.w + x+this.cx]
  }

}

class sobelKernelY extends sobelKernelX{
  constructor()
  {
    super()
    this.kern = new Float32Array( [-1,-2,-1, 0,0,0, 1,2,1])
  }
}

function getIntensities(imgdata) {
    var result = new Float32Array(imgdata.width * imgdata.height)
    var rgb = [0.0, 0.0, 0.0];
    var realrgb = [0.0, 0.0, 0.0];
    for (var i = 0; i < result.length; i++) {
        var indx = i * 4;
        rgb[0] += imgdata.data[indx];
        rgb[1] += imgdata.data[indx + 1];
        rgb[2] += imgdata.data[indx + 2];
    }
    var sum = rgb[0]+rgb[1]+rgb[2];
    realrgb = [rgb[0]/sum,rgb[1]/sum,rgb[2]/sum]
    for (var i = 0; i < result.length; i++) {
        var indx = i * 4
        // 0.2126 * R + 0.7152 * G + 0.0722 * B 
        result[i] = realrgb[0] * imgdata.data[indx] + realrgb[1] * imgdata.data[indx + 1] + realrgb[2] * imgdata.data[indx + 2]
    }
    return result
}

function copyImageData(data){
    var canvas = document.createElement('canvas');
    canvas.width = data.width;
    canvas.height = data.height;
    var ctx = canvas.getContext('2d');
    ctx.putImageData(data,0,0)
    var imageData = ctx.getImageData(0,0, data.width, data.height)
    return imageData;
  }

function draw() {
    filters.style.display = 'block';
    var img = new Image();
    var canvas = document.getElementById('canvas');
    img.src = canvas.toDataURL();
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    var image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var intens = getIntensities(image)
    var sigma = 10
    var kernelsize = 12
    var kernel = new gaussianKernel(sigma, kernelsize)

    var originalImage = copyImageData(image);
    var edge = copyImageData(image)

    var normal = function() {
        image = copyImageData(originalImage);
        ctx.putImageData(originalImage, 0, 0);

        return false;
    }

    var invert = function() {
        image = copyImageData(originalImage);
        for (var i = 0; i < image.data.length; i += 4) {
            image.data[i] = 255 - image.data[i]; // red
            image.data[i + 1] = 255 - image.data[i + 1]; // green
            image.data[i + 2] = 255 - image.data[i + 2]; // blue
        }
        ctx.putImageData(image, 0, 0);
    };

    var grayscale = function() {
        image = copyImageData(originalImage);
        for (var i = 0; i < image.data.length; i += 4) {
            var avg = (image.data[i] + image.data[i + 1] + image.data[i + 2]) / 3;
            image.data[i] = avg; // red
            image.data[i + 1] = avg; // green
            image.data[i + 2] = avg; // blue
        }
        ctx.putImageData(image, 0, 0);
    };

    var bilateral = function() {
        for (var y = 0; y < image.height; y++) {
            for (var x = 0; x < image.width; x++) {
                var i = y * image.width + x;
                var w1 = intens[i];
                var normFactor = 0;
                var wout = 0;
                var rgb = [0.0, 0.0, 0.0];

                for (var y2 = -kernel.cy + 1; y2 < kernel.cy; y2++) {
                    for (var x2 = -kernel.cx + 1; x2 < kernel.cx; x2++) {
                        if (y + y2 > 0 && x + x2 > 0 && y + y2 < image.height && x + x2 < image.width) {
                            var i2 = (y + y2) * image.width + (x + x2)
                            var w2 = intens[i2]
                            var distI = Math.sqrt(Math.pow((w1 - w2), 2))
                            var dw = kernel.gausVal(distI)
                            var weight = kernel.whats(x2, y2) * dw
                            normFactor += weight
                            wout += weight * w2
                            rgb[0] += weight * image.data[4 * i2]
                            rgb[1] += weight * image.data[4 * i2 + 1]
                            rgb[2] += weight * image.data[4 * i2 + 2]

                        }
                    }
                }
                normFactor = Math.max(Math.abs(normFactor))
                wout = wout / normFactor
                var i4 = 4 * i

                image.data[i4] = rgb[0] / normFactor
                image.data[i4 + 1] = rgb[1] / normFactor
                image.data[i4 + 2] = rgb[2] / normFactor

            }
        }
        ctx.putImageData(image, 0, 0);
    };

    var edgeSobelFilter = function() {
        kernX = new sobelKernelX()
        kernY = new sobelKernelY()

        var start = new Date().getTime()
        console.log('started')

        for( var y=0; y<image.height  ; y++){
          for( var x=0; x<image.width ; x++){
            var i = y*image.width + x
            var rgb = [0.00000001,0.0000001]

            for( var y2=-kernX.cy; y2<=kernX.cy ; y2++){
              for( var x2=-kernX.cx; x2<=kernX.cx ; x2++){
                if( y+y2>=0 && x+x2>=0 && y+y2 < image.height && x+x2 < image.width){
                  var i2 = (y+y2)*image.width + (x+x2)
                  rgb[0] += kernX.whats( x2,y2) * image.data[4*i2]
                  rgb[1] += kernY.whats( x2,y2) * image.data[4*i2+1]
                }
              }
            }

            var i4 = 4*i
            edge.data[i4] = rgb[0]
            edge.data[i4+1] = rgb[1]
            edge.data[i4+2] = Math.sqrt( Math.pow(rgb[0],2) + Math.pow(rgb[1],2))

          }
        }

        console.log('Sobel Filter done', new Date().getTime() - start, 'ms')
        ctx.putImageData(edge, 0, 0);
        finalFilter();
    };

    var edgeFilter = function() {
        
        var size = 5;

        laplace = new laplaceKernelX(size)
        var start = new Date().getTime()

        var edge2 = new Array(edge.data.length/4)

        for( var y=0; y<image.height  ; y++) {
            for( var x=0; x<image.width ; x++) {
                var i = y*image.width + x;
                var rgb = [0.00000001,0.0000001,0.0000001]

                for( var y2=-laplace.cy; y2<=laplace.cy ; y2++) {
                    for( var x2=-laplace.cx; x2<=laplace.cx ; x2++) {
                        if( y+y2>=0 && x+x2>=0 && y+y2 < image.height && x+x2 < image.width) {
                            var i2 = (y+y2)*image.width + (x+x2)
                            rgb[0] += image.data[4*i2] * laplace.whats( x2,y2)
                            rgb[1] += image.data[4*i2+1] * laplace.whats( x2,y2)
                            rgb[2] += image.data[4*i2+2] * laplace.whats( x2,y2)
                        }
                    }
                }

                var i4 = 4*i

                // var avg = (rgb[0] + rgb[1] + rgb[2]) / 3;

                // edge2[i]   = avg
                // edge2[i4+1] = avg
                // edge2[i4+2] = avg
                // edge2[i4+3] = 0

                var avg = (rgb[0] + rgb[1] + rgb[2]) / 3;
                if( avg > 0 ) {
                    edge.data[i4]   = avg
                    edge.data[i4+1] = avg
                    edge.data[i4+2] = avg
                } else {
                    edge.data[i4]   = 0
                    edge.data[i4+1] = 0
                    edge.data[i4+2] = 0
                }
            }
        }

        // console.log(edge2);

        // for( var y=0; y<image.height  ; y++) {
        //     for( var x=0; x<image.width ; x++) {
        //         neg_count = 0
        //         pos_count = 0
        //         var i = y*image.width + x;
        //         var i4 = 4*i

        //         if( edge2[i-1] > 0 )  {
        //             pos_count++;
        //         } else {
        //             neg_count++;
        //         }
        //         if( edge2[i-2] > 0 )  {
        //             pos_count++;
        //         } else {
        //             neg_count++;
        //         }
        //         if( edge2[i-image.height] > 0 )  {
        //             pos_count++;
        //         } else {
        //             neg_count++;
        //         }
        //         if( edge2[i+image.height] > 0 )  {
        //             pos_count++;
        //         } else {
        //             neg_count++;
        //         }
        //         if( (pos_count > 0) && (neg_count > 0) ) {
        //             edge.data[i4]   = 0
        //             edge.data[i4+1] = 0
        //             edge.data[i4+2] = 0
        //         }
        //     }
        // }

        console.log('Filter done', new Date().getTime() - start, 'ms')
        ctx.putImageData(edge, 0, 0);
        finalFilter();
    };

    var finalFilter = function() {
        for (var i = 0; i < image.data.length; i += 4) {
                var avg = (edge.data[i] + edge.data[i + 1] + edge.data[i + 2]) / 3;
                image.data[i]     -= avg; // red
                image.data[i + 1] -= avg; // green
                image.data[i + 2] -= avg; // blue
            
        }
        ctx.putImageData(image, 0, 0);
    }

    var normalHandler = document.getElementById('normalHandler');
    var grayscaleHandler = document.getElementById('grayscaleHandler');
    var invertHandler = document.getElementById('invertHandler');
    var bilateralHandler = document.getElementById('bilateralHandler');
    var edgeSobelHandler = document.getElementById('edgeSobelHandler');
    var edgeLogHandler = document.getElementById('edgeLogHandler');
    
    normalHandler.addEventListener('click', normal);
    grayscaleHandler.addEventListener('click', grayscale);
    invertHandler.addEventListener('click', invert);
    bilateralHandler.addEventListener('click', bilateral);
    edgeSobelHandler.addEventListener('click', edgeSobelFilter);
    edgeLogHandler.addEventListener('click', edgeFilter);
    
}