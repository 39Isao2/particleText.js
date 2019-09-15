(function( $ ) {
  $.fn.particleText = function(options) {


			// canvaアクセス
			var canvas = document.querySelector("#particle");

			// 描画機能有効に
			var ctx = canvas.getContext("2d");

			// テキストの内容取得
			var copy = document.querySelector("#copy");

			// canvasサイズ取得
			var ww = canvas.width = window.innerWidth;
			var wh = canvas.height = window.innerHeight;

			// オプション取得
  			var text = "";
  			var minSize = 1;
  			var maxSize = 4;

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
			var particles = [],amount = 0,radius = 0;
			// パーティクルclass
			function Particle(x,y){
				// ランダムで初期位置決定
			    this.x =  Math.random()*ww;
			    this.y =  Math.random()*wh;

			    // ディスタンス
			    this.dest = {
			        x : x,
			        y: y
			    };

			    //  ランダムでmin-maxの間でサイズ決定
				var min = minSize;
				var max = maxSize;
			    this.r =  Math.floor( Math.random() * (max + 1 - min) ) + min ;

			    //速度
			    this.vx = (Math.random()-0.5)*20;
			    this.vy = (Math.random()-0.5)*20;

			    // 加速度
			    this.accX = 10;
			    this.accY = 10;

			    // 摩擦
			    this.friction = Math.random()*0.05 + 0.94;

			    // カラー設定
			    this.color = colors[Math.floor(Math.random()*6)];
			}


			// レンダリング
			Particle.prototype.render = function() {

				// 毎フレーム位置の計算
				// イージング？
				// nowValue += (targetValue - nowValue) * 0.03;
			　　 this.accX = (this.dest.x - this.x)/1000;
			    this.accY = (this.dest.y - this.y)/1000;
			    this.vx += this.accX;
			    this.vy += this.accY;

			    // 摩擦を加える
			    this.vx *= this.friction;
			    this.vy *= this.friction;

			    // 速度計算
			    this.x += this.vx;
			    this.y += this.vy;

			    // 描画
				ctx.fillStyle = this.color;
			    ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
			    ctx.fill();

			    // 2点間の距離の差分計算
			    var distance = Math.sqrt( this.x * this.x + this.y * this.y );

			    // 距離が0より小さくなるまでうにゃうにゃ？
			    // if(distance < 0) { 
			    if(distance < (radius*70) ) { 
			        this.accX = this.x/100;
			        this.accY = this.y/100;
			        this.vx += this.accX;
			        this.vy += this.accY;
			    }

			}


			// シーン初期化
			function initScene(){

			    // キャンバス初期化
			    ww = canvas.width = window.innerWidth;
			    wh = canvas.height = window.innerHeight;
			    ctx.clearRect(0, 0, canvas.width, canvas.height);

			    // フォントとテキスト表示 中央揃え
			    ctx.font = "bold "+(ww/10)+"px sans-serif";
			    ctx.textAlign = "center";
			    ctx.fillText(text, ww/2, wh/2);


			    // 領域全部のImageDataオブジェクト取得
			    var data  = ctx.getImageData(0, 0, ww, wh).data;
			    ctx.clearRect(0, 0, canvas.width, canvas.height);
			    // 重なった際にsource-overモードに
			    ctx.globalCompositeOperation = "source-over";

			    // パーティクル初期化
			    particles = [];

			    // 読解むずす
			    for(var i=0;i<ww;i+=Math.round(ww/300)){
			        for(var j=0;j<wh;j+=Math.round(ww/300)){
			            if(data[ ((i + j*ww)*4) + 3] > 150){
			                particles.push(new Particle(i,j));
			            }
			        }
			    }
			    // パーティクル配列突っ込む
			    amount = particles.length;

			}


			function render(a) {
				// 描画
			    requestAnimationFrame(render);
			    // クリア
			    ctx.clearRect(0, 0, canvas.width, canvas.height);

			    // パーティクルの数描画
			    for (var i = 0; i < amount; i++) {
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