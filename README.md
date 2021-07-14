# particleText.js
パーティクルで文字を描画します。

<img src="http://hareumi.com/particleText/particle.jpg" width="400px">

DEMOカラフル
http://hareumi.girlfriend.jp/particleText/

DEMO白黒
http://hareumi.girlfriend.jp/particleText/index2.html


## 1.描画するcanvasタグの準備
canvasタグに任意のidかclassを指定。

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
particleText（)の中に描画したい文字列を入れる。

    <script type="text/javascript">
	$(function(){

		// デフォルト
		//$(".particle").particleText("PARTICLE ♡");


		// オプション
		$("#particle").particleText({

		    // 表示させたいテキスト
		    text: "PARTICLE ♡", 

		    // パーティクルの色を複数指定可能
		    colors:["#F54064","#F5D940", "#18EBF2"], 

		    // イージングのスピード。slow, middle, high の3つから選んでください。
		    speed: "high",  

		 });
		 
		 // 改行させたい場合
		 $("#particle").particleText({
		        // <br>の文字列を入れてください、４行くらいはいけるはず...
		        text: "LOVE<br>AND<br>PEACE",
		 });

	});
    </script>
    
    
### メソッドチェーン非対応

### height: 300px;以上推奨！
