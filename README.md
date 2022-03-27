# FrameParticle.js
 ストラクチャーの枠のようなパーティクルを生成することができるクラスを追加します。  
  
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

## Properties
### dimension  
```read-only dimension: Dimension;```  

### location1  
```location1: Location;```  

### location2  
```location2: Location;```  

## Methods
### コンストラクタ  
```new FrameParticle(dimension: Dimension, location1: Location, location2: Location)```  

### show
```show(): FrameParticle```  

### delete
```delete(): void```  