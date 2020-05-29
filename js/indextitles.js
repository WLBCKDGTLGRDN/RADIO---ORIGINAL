function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var img = new Image();
img.src = 'http://www.welbeckdigitalgarden.co.uk:8080/stream/video.mjpeg';
img.onload = function () {
    var $this = this;
    requestAnimationFrame(function () {
        draw($this);
    })
};

function draw(img) {
    var portrait = document.getElementById('portrait');
    var canvas = portrait.getContext('2d');
    portrait.setAttribute("width", img.width);
    portrait.setAttribute("height", img.height);
    var verticalSlices = Math.random() * Math.round(img.height / 2);
    var maxHorizOffset = (Math.random() * Math.round(img.width - 3) + 1);
    for (var i = 0; i < verticalSlices; i++) {
        var horizOffset = getRandom(-Math.abs(maxHorizOffset), maxHorizOffset);
        var slice = (i * verticalSlices / 5);
        canvas.drawImage(img, Math.random(), slice, img.width, slice + verticalSlices, horizOffset, i * verticalSlices, img.width, slice + verticalSlices);
    }
    setTimeout(function () {
        requestAnimationFrame(function () {
            draw(img);
        })

    }, );
}


// Call on page load.
ajaxRequest(0);

function ajaxRequest(timeout) {

    setTimeout(getData, timeout);
    
}

function getData() {

    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', 'http://www.welbeckdigitalgarden.co.uk:8000/status-json.xsl');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var body = xhr.response;
            var bodyObject = JSON.parse(body);

            // Get our variables.
            var artist = bodyObject.icestats.source.artist;
            var title = bodyObject.icestats.source.title;

            // Update our markup.
            document.getElementById("artist").innerHTML = artist;
            document.getElementById("title").innerHTML = title;

            // Re-call the function.
            ajaxRequest(5000);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };

    xhr.send();
    
}
