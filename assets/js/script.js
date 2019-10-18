var level;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    start: 27, end: 51,
    height: '390',
    width: '640',
    videoId: 'h8xZje1jbI0',
    playerVars: { 'controls': 0, 'showinfo': 0, 'fs': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  var status = event.data;
  if(status==1) {
    setInterval(function(){ playGame() }, 100);
  }
}

jQuery(document).ready(function($){
  /* W: 119 (Up),
     S: 115 (Down),
     A: 97 (Left),
     D: 100 (Right) */
  var whichKey;
  $("body").keypress(function( event ) {
    whichKey = event.which;
    if(whichKey == 119) {
      $('#yannis').addClass('jump').addClass('jumpBack');
    }
  });

});

function playGame() {
  var playerCurrentTime = player.getCurrentTime();

  showLyrics(playerCurrentTime);

  //if(playerCurrentTime>10.9) {
    $('#player').hide();
  //}

  if(playerCurrentTime>11 && playerCurrentTime<56) {
    level1();
  }
}

function level1(){
  level = 1;

  var howManyLights = 200;
  if($('#elements .light').length==0) {
    var i = 1;

    while (i < howManyLights) {
      lightCreate();
      i++;
    }
  } else {
    lightAnimation(howManyLights);
  }
}

function showLyrics(time){
  var prevLyric, nextLyric;

  var lyrics = {
    "0":"deneme",
    "28.12":"Shadow, see how far I go",
    "31.05":"",
    "33.01":"Step by step I'll keep it up, I won't slow I gotta go",
    "37.21":"Through the embers, through the rows",
    "42.11":"Every shadow step I take, I'll make sure that I won't break",
    "47.02":"Show them all just what I know",
    "51.07":"While the years they come and go, I won't let myself get slow",
    "56.08":"'Cause they all just come and go",
    "60.22":"Every step that I will take, I'll make sure that I won't break",
    "64.23":"Oh, If I fall down, fall down",
    "71.09":"Then I know to keep on running",
    "74.05":"Oh, if I fall down, fall down",
    "80.13":"Then I know to keep on running",
    "83.10":"",
    "93.05":"And if it hurts don't let it show",
    /*"":"Step by step I'll keep it up, I won't slow I gotta go",
    "":"While the seasons come and go",
    "":"Every shadow step I take, I'll make sure that I won't break",
    "":"Shadow chiaroscuro",
    "":"While the years they come and go, I won't let myself get slow",
    "":"When I, when I fall down, fall down",
    "":"Then I know to keep on running",
    "":"Oh, when I fall down, fall down",
    "":"Won't you come to keep me running?",
    "":"Yeah, I keep on running",
    "":"Well, I keep on running",
    "":"Loneliness of the long distance runner",
    "":"Shadow, come closer, so I'll go on further",
    "":"Loneliness of the long distance runner",
    "":"Shadow, come closer, so I'll go on further",
    "":"Loneliness of the long distance runner",
    "":"Shadow, come closer, so I'll go on further",
    "":"Loneliness of the long distance runner",
    "":"Shadow, come closer, so I'll go on further",
    "":"Oh, when I fall down, fall down",
    "":"Then I know to keep on running",
    "":"Oh, If I fall down, fall down",
    "":"Then I know to keep on running",
    "":"Whoa",
    "":"Fall down, when I slow down",
    "":"Keep on running",
    "":"Slow down",
    "":"Keep on running",
    "":"Oh, slow down",
    "":"Keep on running",
    "":"Then I",
    "":"Keep on running",
    "":"Keep on running",
    "":"Keep on running",
    "":"Keep on running"*/
  };

  prevLyric = $('#lyric').html();

  for (var key in lyrics) {
    if(time>key) {
      $('#lyric').html(lyrics[key]);
    }
  }

  nextLyric = $('#lyric').html();

  if(prevLyric!=nextLyric) {
    $('#lyric').removeClass().addClass('font'+getRndInteger(1,4));
    //if(level==1) $('#lyric').addClass('font-effect-fire');
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function lightCreate(){
  var light = $('#pureElements .light');

  var lightAnimationDuration = getRndInteger(0,8)+'s';
  var lightMarginLeft = getRndInteger(0,100)+'vw';
  var lightMarginTop = getRndInteger(30,70)+'vh';
  var lightOpacity = '0.'+getRndInteger(0,9);
  var lightScale = 'scale(0.'+getRndInteger(0,9)+')';
  var lightDelay = '0.'+getRndInteger(0,9)+'s';
  var lightZindex = getRndInteger(0,9);

  $(light).clone().css({
    'width': '40px',
    'top': lightMarginTop,
    'opacity': lightOpacity,
    'animation-duration': lightAnimationDuration,
    'transform': lightScale,
    'transition-delay':lightDelay,
    'z-index': lightZindex
  }).appendTo('#elements');
}

function lightAnimation(howManyLights){

  $('#elements .light').each(function( index ) {
    $(this).addClass('move');
  });

  $('#elements .light').each(function( index ) {
    var currentRightPosition = $(this).css('right');
    if(currentRightPosition == '1280px') {
      $(this).remove();
    }
  });

  var howManyLightsOnScreen = $('#elements .light').length;
  var howManyToCreate = howManyLights - howManyLightsOnScreen;
  var i = 1;

  while (i < howManyToCreate) {
    lightCreate();
    i++;
  }
}
