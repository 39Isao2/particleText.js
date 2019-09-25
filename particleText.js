(function( $ ) {
  $.fn.particleText = function(options) {

  			var target = "";

  			if(this[0].className){
  				target = "." + this[0].className;
  			}
  			if(this[0].id){
  				target = "#" + this[0].id;
  			}
   			// console.log(this[0].className);
  			// console.log(this[0].id);


			// canvaアクセス
			// var canvas = document.querySelector("#particle");
			var canvas = document.querySelector(target);

			// 描画機能有効に
			var ctx = canvas.getContext("2d");

			// canvasサイズ取得
			var ww = canvas.width = canvas.clientWidth;
			var wh = canvas.height = canvas.clientHeight;


			// オプション取得
  			var text = "";
  			var minSize = 2;
  			var maxSize = 2;
  			var easing = 0.09;

  			// speed
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

  			// text
  			if(options.text){
  				text = options.text;
  			} else {
  				text = options;
  			}

  			// size
  			// if(options.min){
  			// 	minSize = options.min;
  			// }
  			// if(options.max){
  			// 	maxSize = options.max;
  			// }


  			// カラー
  			var colors = ["#F54064","#F5D940", "#18EBF2"];
  			if(options.colors){
  				colors = options.colors;
  			}

			// パーティクルclass初期化
			var particles = [],num = 0;

			// パーティクルclass
			function Particle(ax,ay){

				// ランダムで初期位置決定
			    this.x =  Math.random()*ww;
			    this.y =  Math.random()*wh;

			    // ゴールポジション
			    this.goal = {
			        x : ax,
			        y: ay
			    };

			    //  ランダムでmin-maxの間でサイズ決定
				var min = minSize;
				var max = maxSize;
			    this.r =  Math.floor( Math.random() * (max + 1 - min) ) + min ;

			    // 画面サイズにて半径調整
			    // this.r = window.innerWidth / this.r * 0.003;
			    this.r = canvas.clientWidth / this.r * 0.003;
			    

			    // カラー設定
			    // this.color = colors[Math.floor(Math.random()*6)];

			    this.color = colors[Math.floor(Math.random() * colors.length)];


			}


			// レンダリング
			Particle.prototype.render = function() {


				this.x += (this.goal.x - this.x) * easing;
			    this.y += (this.goal.y - this.y) * easing;
				
			    // 描画
				ctx.fillStyle = this.color;
			    ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
			    ctx.fill();

			}


			// シーン初期化
			function initScene(){

				// キャンバスサイズ取得
				var ww = canvas.width = canvas.clientWidth;
			    var wh = canvas.height = canvas.clientHeight;


			    ctx.clearRect(0, 0, canvas.width, canvas.height);

			    // フォントとテキスト表示 中央揃え

			    ctx.font = "bold "+(ww/10)+"px sans-serif";


			    // 無理くり調整
			    var hp = 2;
			    if(canvas.height <= 300 && canvas.width > 768){
			    	hp = 1.5;
			    }

			    ctx.textAlign = "center";
			    ctx.fillText(text, ww/2, wh/hp);


			    // 領域全部のImageDataオブジェクト取得
			    var data  = ctx.getImageData(0, 0, ww, wh).data;
			    
			    ctx.clearRect(0, 0, canvas.width, canvas.height);
			    // 重なった際にsource-overモードに
			    ctx.globalCompositeOperation = "source-over";

			    // パーティクル初期化
			    particles = [];

			    for(var i=0; i<ww; i+=Math.round(ww/300)){
			        for(var j=0;j<wh; j+=Math.round(ww/300)){
			            if(data[ ((i + j*ww)*4) + 3] > 150){
			                particles.push(new Particle(i,j));
			            }
			        }
			    }

			    // パーティクル配列生成
			    num = particles.length;
			    
			}


			function render(a) {
				// 描画
			    requestAnimationFrame(render);
			    // クリア
			    ctx.clearRect(0, 0, canvas.width, canvas.height);

			    // パーティクルの数描画
			    for (var i = 0; i < num; i++) {
			        particles[i].render();
			    }
			};

			// リサイズしたら再度描画
			window.addEventListener("resize", initScene);

			// シーン初期化
			initScene();

			// 目指せ60FPSでrender実行
			requestAnimationFrame(render);
			  		
	};
})(jQuery);