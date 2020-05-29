function preload(){
  sound = loadSound('http://www.welbeckdigitalgarden.co.uk:8000/WelbeckDigitalGarden.ogg');

}

function setup()
{
  var cnv = createCanvas(1200,900);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.9);
}

function draw(){
  background(0);


  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(150,0,200); // waveform is red
  strokeWeight(5);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  text('Welbeck Digital Garden Radio', 10, 20);
}

// fade sound if mouse is over canvas
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
