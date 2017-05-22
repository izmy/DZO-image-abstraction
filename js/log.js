var LogHandler = document.getElementById('LogHandler');
var LogTable = document.getElementById('LogTable');
LogHandler.addEventListener('click', getLog);

function LoG(x, y, sigma) {
    nom = ( Math.pow(x, 2)+Math.pow(y, 2)-2*(Math.pow(sigma, 2)) );
    denom = ( (2*Math.PI*(Math.pow(sigma, 4)) ));
    expo = Math.exp( -((Math.pow(x, 2))+(Math.pow(y, 2)))/(2*(Math.pow(sigma, 2))) );
    return nom*expo/denom;
}

function getLog() {
    var logSize = parseFloat(document.getElementById('logSize').value);
    var logSigma = parseFloat(document.getElementById('logSigma').value);
    var result = "";

    w = Math.ceil(logSize * logSigma);

    if (w % 2 == 0) {
        console.log("Even number detected, incrementing");
        w = w + 1;
    }

    logMask = [];

    w_range = parseInt(Math.floor(w/2))
    //console.log("Going from " + (-w_range) + " to " + (w_range))
	for (var i = -w_range; i <= w_range; i++) {
		for (var j = -w_range; j <= w_range; j++) {
            logMask.push(LoG(i,j,logSigma))
        }
    }

    var tmp = 1;
    result += '<table class="table"><tr>';
    for (var i = 0; i < w*w; i++) {
    	var num = Math.round(logMask[i] * 100) / 100;
    	if (tmp == w) {
    		result += "<td>" + num + "</td></tr><tr>";
    		tmp = 1;
    	} else {
	    	result += "<td>" + num + "</td>";
	    	tmp++;
    	}
    }
    result += "</table>"


    document.getElementById('LogTable').innerHTML = result;

}