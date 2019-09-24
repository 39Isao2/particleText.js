(function( $ ) {
  $.fn.particleText = function(options) {


			// canvaアクセス
			var canvas = document.querySelector("#particle");

			// 描画機能有効に
			var ctx = canvas.getContext("2d");

			// console.log(canvas.clientWidth);
			// console.log(canvas.clientHeight);

			//console.log(canvas.clientWidth);

			// canvasサイズ取得
			var ww = canvas.width = canvas.clientWidth;
			var wh = canvas.height = canvas.clientHeight;

			// オプション取得
  			var text = "";
  			var minSize = 2;
  			var maxSize = 2;

  			// text
  			if(options.text){
  				text = options.text;
  			} else {
  				text = options;
  			}

  			// size
  			if(options.min){
  				minSize = options.min;
  			}
  			if(options.max){
  				maxSize = options.max;
  			}

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
			    // よう調整
			    this.r = window.innerWidth / this.r * 0.003;

			    // if(ww < 768){
			    // 	this.r = Math.round(this.r/2);
			    // }

			    // カラー設定
			    this.color = colors[Math.floor(Math.random()*6)];
			}


			// レンダリング
			Particle.prototype.render = function() {

			    this.x += (this.goal.x - this.x) * 0.08;
			    this.y += (this.goal.y - this.y) * 0.08;
				
			    // 描画
				ctx.fillStyle = this.color;
			    ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
			    ctx.fill();

			}


			// シーン初期化
			function initScene(){

			    // キャンバス初期化
			    // ww = canvas.width = window.innerWidth;
			    // wh = canvas.height = window.innerHeight;

				// canvaアクセス
				//var canvas = document.querySelector("#particle");

				var ww = canvas.width = canvas.clientWidth;
			    var wh = canvas.height = canvas.clientHeight;



				//var ctx = canvas.getContext("2d");

			
				// var ww = canvas.clientWidth;
				// var wh = canvas.clientHeight;

			 //   	var ww = canvas.width = 377;
				// var wh = canvas.height = 500;
			 //    var ww = canvas.clientWidth;
				// var wh = canvas.clientHeight;


			    ctx.clearRect(0, 0, canvas.width, canvas.height);

			    // フォントとテキスト表示 中央揃え
			    ctx.font = "bold "+(ww/10)+"px sans-serif";
			    ctx.textAlign = "center";
			    ctx.fillText(text, ww/2, wh/2);


			    // 領域全部のImageDataオブジェクト取得
			    var data  = ctx.getImageData(0, 0, ww, wh).data;
			    //console.log(data);
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

			    // パーティクル配列突っ込む
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