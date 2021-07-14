(function( $ ) {
  $.fn.particleText = function(options) {


  			var target = "";
  			if(this[0].className){
  				target = "." + this[0].className;
  			}
  			if(this[0].id){
  				target = "#" + this[0].id;
  			}

			var canvas = document.querySelector(target);
			var ctx = canvas.getContext("2d");
			var ww = canvas.width = canvas.clientWidth;
			var wh = canvas.height = canvas.clientHeight;
  			var text = "";
  			var easing = 0.09;

  			if(options.speed){
  				if(options.speed == "middle"){
  					easing = 0.07;
  				}
  				else if(options.speed == "slow"){
  					easing = 0.04;
  				}
  				else if(options.speed == "high"){
  					easing = 0.09;
  				}
  			}
  			if(options.text){
  				text = options.text;
  			} else {
  				text = options;
  			}
  			var colors = ["#F54064","#F5D940", "#18EBF2"];
  			if(options.colors){
  				colors = options.colors;
  			}

  			var flg = false;
  			if (text.indexOf("<br>") != -1) {
  				flg = true;
			}


			var particles = [],num = 0;

			function Particle(ax,ay){
			    this.x =  Math.random()*ww;
			    this.y =  Math.random()*wh;
			    this.goal = {
			        x : ax,
			        y: ay
			    };
			    this.r = canvas.clientWidth / 2 * 0.003;
			    this.color = colors[Math.floor(Math.random() * colors.length)];
			}


	
			Particle.prototype.render = function() {
				this.x += (this.goal.x - this.x) * easing;
			        this.y += (this.goal.y - this.y) * easing;
				ctx.fillStyle = this.color;
			    ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
			    ctx.fill();

			}


		
			function initScene(){

				var ww = canvas.width = canvas.clientWidth;
				var wh = canvas.height = canvas.clientHeight;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				var fSize = 10;
				ctx.font = "bold "+(ww/fSize)+"px sans-serif";
				ctx.textAlign = "center";


				if(!flg){
					drawOneText();
				} else {
					drawManyLineText();
				}


				function drawOneText(){
					var hp = 2;
				    if(canvas.height <= 300 && canvas.width > 768){
				    	hp = 1.5;
				    }
				    ctx.fillText(text, ww/2, wh/hp, ww);
				}


				function drawManyLineText(){
					
				    var tagetString = text;
					var br = "<br>";
					var arrayStrig = tagetString.split("<br>");
					var height = wh / arrayStrig.length;
					var line = arrayStrig.length;
					var _brakeP = 768;

					var h = 0.8;
					for(var i = 0; i<arrayStrig.length; i++){
						ctx.fillText(arrayStrig[i], ww/2, height * h);
						h+= (ww/1300);
					}
				}
			    
			 	
			    var data  = ctx.getImageData(0, 0, ww, wh).data;
			    ctx.clearRect(0, 0, canvas.width, canvas.height);
			    ctx.globalCompositeOperation = "source-over";

			    
			    particles = [];

			    for(var i=0; i<ww; i+=Math.round(ww/200)){
			        for(var j=0;j<wh; j+=Math.round(ww/200)){
			            if(data[ ((i + j*ww)*4) + 3] > 150){
			                particles.push(new Particle(i,j));
			            }
			        }
			    }

			    num = particles.length;
			    
			}


			function render(a) {
				
			    requestAnimationFrame(render);
			    
			    ctx.clearRect(0, 0, canvas.width, canvas.height);

			    for (var i = 0; i < num; i++) {
			        particles[i].render();
			    }
			};

			window.addEventListener("resize", initScene);

			initScene();
			
			requestAnimationFrame(render);
			  		
	};
})(jQuery);
