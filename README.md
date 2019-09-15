# particleText.js
パーティクルで文字を描画します。

## 1.描画するcanvasタグの準備
id="particle"を指定。

    <canvas id="particle"></canvas>
    
    <style>
    canvas{
        background: #F5F1E9;
        width: 100vw;
        height: 100vh;
    }
    </style>
    
## 2.jQueryとparticleText.jsを読み込み

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="particleText.js"></script>
    
## 3.実行方法
particleText（）の（）の中に描画したい文字列を入れる。

    <script type="text/javascript">
	$(function(){

		// デフォルト
		//$(".particle").particleText("PARTICLE");


		// オプション
		$("#particle").particleText({

		    text: "PARTICLE ♡", // 文字列

		    colors:["#000","#fff"], // パーティクルの色を配列で複数指定可能

		    min:1,  // パーティクルのサイズ 0.5 ~ 4 がおすすめ

		    max:4,

		});

	});
    </script>
