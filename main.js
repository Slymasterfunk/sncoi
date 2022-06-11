// ---------------------- //
//       Particles        //
// ---------------------- //

let max_particles    = 2500;
let particles        = [];
let frequency        = 10;
let init_num         = max_particles;
let max_time         = frequency*max_particles;
let time_to_recreate = false;

// Enable repopulate
setTimeout(function(){
  time_to_recreate = true;
}.bind(this), max_time)

// Populate particles
populate(max_particles);

var tela = document.createElement('canvas');
  tela.width = $(window).width();
  tela.height = $(window).height();
  $("#index").append(tela);

var canvas = tela.getContext('2d');

class Particle{
  constructor(canvas){
    let random = Math.random()
    this.progress = 0;
    this.canvas = canvas;
    this.center = {
      x: $(window).width()/2,
      y: $(window).height()/2
    }
    this.point_of_attraction = {
      x: $(window).width()/2,
      y: $(window).height()/2
    }

    if( Math.random() > 0.5){
      this.x = $(window).width()*Math.random()
      this.y = Math.random() > 0.5 ? -Math.random() - 100 : $(window).height() + Math.random() + 100
    }else{
      this.x = Math.random() > 0.5 ? -Math.random() - 100 : $(window).width() + Math.random() + 100
      this.y = $(window).height()*Math.random()
    }

    this.s = Math.random() * 2;
    this.a = 0
    this.w = $(window).width()
    this.h = $(window).height()
    this.radius = random > .2 ? Math.random()*1 : Math.random()*3
    this.color  = random > .2 ? "#0300a6" : "#9B0127"
    this.radius = random > .8 ? Math.random()*2.2 : this.radius
    this.color  = random > .8 ? "#003f07" : this.color
  }

  calculateDistance(v1, v2){
    let x = Math.abs(v1.x - v2.x);
    let y = Math.abs(v1.y - v2.y);
    return Math.sqrt((x * x) + (y * y));
  }

  render(){
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move(){
    let p1 = {
      x: this.x,
      y: this.y
    }

    let distance = this.calculateDistance(p1, this.point_of_attraction)
    let force = Math.max(100, (1 + distance));

    let attr_x = (this.point_of_attraction.x - this.x)/force;
    let attr_y = (this.point_of_attraction.y - this.y)/force;

    this.x += (Math.cos(this.a) * (this.s)) + attr_x;
    this.y += (Math.sin(this.a) * (this.s)) + attr_y;
    this.a += (Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2);

    if( distance < (30 + Math.random()*100) ){
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

function populate(num){
  for (var i = 0; i < num; i++) {
    setTimeout(
      function(x){
        return function(){
          // Add particle
          particles.push(new Particle(canvas))
        };
      }(i)
      ,frequency*i
    );
  }
  return particles.length
}

function createSphera(){
  let radius = 180
  let center = {
    x: $(window).width()/2,
    y: $(window).height()/2
  }
}

function clear(){
  canvas.globalAlpha=0.08;
  canvas.fillStyle='#01001d';
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha=1;
}

// Function to update particles in canvas
function update(){
  particles = particles.filter(function(p) { return p.move() })
  // Recreate particles
  if(time_to_recreate){
    if(particles.length < init_num){ populate(1); console.log("Ricreo") }
  }
  clear();
  requestAnimationFrame(update.bind(this))
}
update()

// ---------------------- //
//        QR Expand       //
// ---------------------- //
$(".qrc").click(function (event) {
  if ($(this).hasClass("expand")) {
    $(this).removeClass("expand").addClass("shrink");
  } else {
    if ($(this).hasClass("shrink")) {
      $(this).removeClass("shrink").addClass("expand");
    } else {
      $(this).addClass("expand");
    }
  }
});


// ---------------------- //
//          Menu          //
// ---------------------- //

//OPEN TRIGGER
var openTrigger = $('.menu-trigger');
var releaseTrigger = $('.release');
var openTriggerTop = openTrigger.find('.menu-trigger-bar.top');
var openTriggerMiddle = openTrigger.find('.menu-trigger-bar.middle');
var openTriggerBottom = openTrigger.find('.menu-trigger-bar.bottom');

//CLOSE TRIGGER
var closeTrigger = $('.close-trigger');
var closeTriggerLeft = closeTrigger.find('.close-trigger-bar.left');
var closeTriggerRight = closeTrigger.find('.close-trigger-bar.right');

//LOGO
var logo = $('.logo');

//MENU
var menuContainer = $('.menu-container');
var menu = $('.menu');
var menu2 = $('.menu2');
var menuTop = $('.menu-bg.top');
var menuMiddle = $('.menu-bg.middle');
var menuBottom = $('.menu-bg.bottom');

//TL
var tlOpen = new TimelineMax({paused: true});
var tlClose = new TimelineMax({paused: true});

// ADDITIONS
var selectee = document.getElementById("selectee-container");

//OPEN TIMELINE
tlOpen.add("preOpen")
  .to(logo, 0.4, {
    scale: 0.8,
    opacity: 0,
    ease: Power2.easeOut
  }, "preOpen")
.to(openTriggerTop, 0.4, {
  x: "+80px", y: "-80px", delay: 0.1, ease: Power4.easeIn, onComplete: function() {
    closeTrigger.css('z-index','25');
  }
}, "preOpen")
.to(openTriggerMiddle, 0.4, {
  x: "+=80px", y: "-=80px", ease: Power4.easeIn,
  onComplete: function() {
    openTrigger.css('visibility','hidden');
    menuTop.css('background-color','#ffffff');
    menuMiddle.css('background-color','#ffffff');
    menuBottom.css('background-color','#ffffff');
  }
}, "preOpen")
.to(openTriggerBottom, 0.4, {
  x: "+=80px", y: "-=80px", delay: 0.2, ease: Power4.easeIn
}, "preOpen")
.add("open", "-=0.4")
.to(menuTop, 0.8, {
  y: "13%",
  ease: Power4.easeInOut
}, "open")
.to(menuMiddle, 0.8, {
  scaleY: 1,
  ease: Power4.easeInOut
}, "open")
.to(menuBottom, 0.8, {
  y: "-114%",
  ease: Power4.easeInOut
}, "open")
.fromTo(menu, 0.6, {
  y: 30, opacity: 0, visibility: 'hidden'
}, {
  y: 0, opacity: 1, visibility: 'visible', ease: Power4.easeOut
}, "-=0.2")
.add("preClose", "-=0.8")
.to(closeTriggerLeft, 0.8, {
  x: "-=100px", y: "+=100px", ease: Power4.easeOut
}, "preClose")
.to(closeTriggerRight, 0.8, {
  x: "+=100px", y: "+=100px", delay: 0.2, ease: Power4.easeOut
}, "preClose");

//CLOSE TIMELINE
tlClose.add("close")
  .to(menuTop, 0.2, {
    backgroundColor: "#ffffff", ease: Power4.easeInOut, onComplete: function() {
    logo.css('z-index','26');
    closeTrigger.css('z-index','5');
    openTrigger.css('visibility','visible');
  }
}, "close")
.to(menuMiddle, 0.2, {
  backgroundColor: "#ffffff", ease: Power4.easeInOut
}, "close") 
.to(menuBottom, 0.2, {
  backgroundColor: "#ffffff", ease: Power4.easeInOut
}, "close")
  .to(menu, 0.6, {
  y: 20, opacity: 0, ease: Power4.easeOut, onComplete: function() {
    menu.css('visibility','hidden');
  }
}, "close")
.to(logo, 0.8, {
  scale: 1, opacity: 1, ease: Power4.easeInOut
}, "close", "+=0.2")
.to(menuTop, 0.8, {
  y: "-113%",
  ease: Power4.easeInOut
}, "close", "+=0.2")
.to(menuMiddle, 0.8, {
  scaleY: 0,
  ease: Power4.easeInOut
}, "close", "+=0.2")
.to(menuBottom, 0.8, {
  y: "25%",
  ease: Power4.easeInOut,
  onComplete: function() {
    menuTop.css('background-color','#e7e7e7');
    menuMiddle.css('background-color','#e7e7e7');
    menuBottom.css('background-color','#e7e7e7');
  }
}, "close", "+=0.2")
.to(closeTriggerLeft, 0.2, {
  x: "+=100px", y: "-=100px", ease: Power4.easeIn
}, "close")
.to(closeTriggerRight, 0.2, {
  x: "-=100px", y: "-=100px", delay: 0.1, ease: Power4.easeIn
}, "close")
.to(openTriggerTop, 1, {
  x: "-=80px", y: "+=80px", delay: 0.2, ease: Power4.easeOut
}, "close")
.to(openTriggerMiddle, 1, {
  x: "-=80px", y: "+=80px", ease: Power4.easeOut
}, "close")
.to(openTriggerBottom, 1, {
  x: "-=80px", y: "+=80px", delay: 0.1, ease: Power4.easeOut
}, "close");

//EVENTS
openTrigger.on('click', function(){
  if(tlOpen.progress() < 1){
    tlOpen.play();
    selectee.classList.add("hidden");
  } else {
    tlOpen.restart();
    selectee.classList.add("hidden");
  }
});
       
closeTrigger.on('click', function(){
  if(tlClose.progress() < 1){
    tlClose.play();
    selectee.classList.remove("hidden");
  } else {
    tlClose.restart();
    selectee.classList.remove("hidden");
  }
});

// ---------------------- //
//        RSVP/QRC        //
// ---------------------- //

function slider() {
  var sliderInput = document.getElementById("sliderInput");
  var donate = document.getElementById("donate");
  var rsvp = document.getElementById("rsvpContent");  
  
  if (sliderInput.checked == true){
    donate.style.display = "block";
    rsvp.style.display = "none";
  } else {
    donate.style.display = "none";
    rsvp.style.display = "block";
  }
}

// ---------------------- //
//       Jail & Bail      //
// ---------------------- //
function warrant() {
  var warrant = document.getElementById("warrant");
  var form = document.getElementById("warrantForm");

  warrant.classList.add("hidden");
  form.classList.remove("hidden");
}