/*
 * 棒をもって右クリックすると、その時点の座標とプレイヤーの現在の座標を範囲にパーティクルを出現させ、もう一度右クリックすると固定される。
 * スニークしながら右クリックした場合は出現させた順番にパーティクルを消す。
*/

import {
  world,
  Player,
} from "mojang-minecraft";

import { FrameParticle } from "./FrameParticle.js";


class MyFrameParticle extends FrameParticle {
  constructor(entity, dim, loc1, loc2, confirm) {
    super(dim, loc1, loc2);
    this.entity = entity;
    this.confirm = confirm;
  }

  toConfirm(){
    this.confirm = true;
  }
}


let frame_particles = [];
world.events.itemUse.subscribe(event => {
  let entity = event.source;

  if(!(entity instanceof Player)){
    return;
  }
  if(event.item.id != "minecraft:stick"){
    return;
  }

  if(entity.isSneaking){
    if(frame_particles.length > 0 && frame_particles[frame_particles.length-1].confirm){
      frame_particles[0].delete();
      frame_particles.shift();
      return;
    }
  }
  if(frame_particles.length == 0 || frame_particles[frame_particles.length-1].confirm){
    frame_particles.push(new MyFrameParticle(entity, entity.dimension, entity.location, entity.location, false).show());
  } else {
    frame_particles[frame_particles.length-1].location2 = entity.location;
    frame_particles[frame_particles.length-1].toConfirm();
  }
});


world.events.tick.subscribe(() => {
  if(frame_particles.length > 0){
    let last_particle = frame_particles[frame_particles.length-1];
    if(!last_particle.confirm){
      last_particle.location2 = last_particle.entity.location;
    }
  }
});
