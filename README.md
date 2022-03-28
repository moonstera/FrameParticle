# FrameParticle.js
 ストラクチャーの枠のようなパーティクルを生成することができるクラスを追加します。  
 ![パーティクル](https://i.imgur.com/qFfWQiF.png, "パーティクル")  

## 導入方法  
  1. Releasesからzipファイルをダウンロードし解凍してください  
  2. 解凍されたフォルダから`FrameParticleRP/particles`の中身をご自身のリソースパックの`particlesフォルダ`にコピーしてください  
  3. 解凍されたフォルダから`FrameParticleBP/scripts/FrameParticle.js`をご自身のビヘイビアーパックのスクリプトフォルダにコピーしてください  
  4. ご自身のビヘイビアーパックの`manifest.json`の`entry`で指定したファイルに`FrameParticle.js`をインポートしてください  

## 例  
```
import { FrameParticle } from "./FrameParticle.js";

world.events.itemUse.subscribe(event => {
  let entity = event.source;
  //アイテムを使用したとき、その座標に1×1のパーティクルを生成する
  new FrameParticle(entity.dimension, entity.location, entity.location).show();
});
```

## 使い方
指定したディメンションと二つの座標をから枠パーティクルを生成する  

## Properties
### dimension  
```read-only dimension: Dimension;```  
このパーティクルのディメンションを返す  
Type: Dimension  

### location1  
```location1: Location;```  
このパーティクルの一つ目の座標を返す  
Type: Location  

### location2  
```location2: Location;```  
このパーティクルの二つ目の座標を返す  
Type: Location  

## Methods
### コンストラクタ  
```new FrameParticle(dimension: Dimension, location1: Location, location2: Location)```  
新しくFrameParticleオブジェクトを作る  
Returns FrameParticle  

### show
```show(): FrameParticle```  
このパーティクルを表示する  
Returns FrameParticle  

### delete
```delete(): void```  
このパーティクルを削除する  

## 特徴  
このパーティクルは指定された範囲の大きさによってサイズを変更させているため、範囲の大きさによって必要なパーティクル数が変わりません。  

## 使用例  
- world editの範囲指定表示  
- 1m以上のブロックやブロックエンティティの設置範囲表示  
など  

## 既知の不具合 
- 範囲が大きいいとき、一辺の中心が視界外にありかつ数メートル離れている場合、その辺が点滅する。  
  解決法: 
    1. パーティクルの寿命を長くする。(ただし残像が残りやすい) 
    2. 一定の長さのパーティクルを並べる。(ただし使用パーティクル数が増える)  
  
  解決法iを施し寿命は0.5にしています。それでも点滅が激しい場合はもう少し寿命を延ばすことをお勧めします。
  `FrameParticleRP/particles`フォルダにある、`frame_down_up.json, frame_north_south.json, frame_west_east.json`の
  `minecraft:particle_lifetime_expression`内の`max_lifetime`の値を変更すればできます。  

## 連絡先  
 [twitter](https://twitter.com/momonstera)