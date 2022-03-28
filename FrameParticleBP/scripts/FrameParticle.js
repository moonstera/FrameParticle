/*LICENSE : https://github.com/moonstera/FrameParticle/blob/main/LICENSE*/
import {
  world,
  Location,
  Vector,
  Dimension,
  MolangVariableMap
} from "mojang-minecraft";

export class FrameParticle {
  static _particle_id = 0;
  static _frame_particles = new Map();

  constructor(dim, loc1, loc2){
    //型チェック
    if(!(dim instanceof Dimension)){
      console.error("The specified object is of invalid type. The correct type is \"Dimension\".");
    }
    if(!(loc1 instanceof Location)){
      console.error("The specified object is of invalid type. The correct type is \"Location\".");
    }
    if(!(loc2 instanceof Location)){
      console.error("The specified object is of invalid type. The correct type is \"Location\".");
    }
    
    this._dim = dim;
    this._loc1 = new Location(Math.floor(loc1.x), Math.floor(loc1.y), Math.floor(loc1.z));
    this._loc2 = new Location(Math.floor(loc2.x), Math.floor(loc2.y), Math.floor(loc2.z));
    this._moving = 0;  //0: false, 1~: true  //座標が変更されたときの残像を軽減するため
    this._id = FrameParticle._particle_id++;
  }

  show(){
    if(!FrameParticle._frame_particles.has(this._id)){
      FrameParticle._frame_particles.set(this._id, this);
    }
    return this;
  }

  get dimension(){
    return this._dim;
  }

  get location1(){
    return this._loc1;
  }

  get location2(){
    return this._loc2;
  }

  set location1(loc){
    if(loc instanceof Location){
      let new_loc = new Location(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z));
      if(!this._loc1.equals(new_loc)){
        this._loc1 = new_loc;
        this._moving = 1;
      }
    } else {
      console.error("The specified object is of invalid type. The correct type is \"Location\".");
    }
  }

  set location2(loc){
    if(loc instanceof Location){
      let new_loc = new Location(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z));
      if(!this._loc2.equals(new_loc)){
        this._loc2 = new_loc;
        this._moving = 1;
      }
    } else {
      console.error("The specified object is of invalid type. The correct type is \"Location\".");
    }
  }

  delete(){
    if(FrameParticle._frame_particles.has(this._id))FrameParticle._frame_particles.delete(this._id);
  }

}

world.events.tick.subscribe(() => {
  FrameParticle._frame_particles.forEach((particle, id) => {
    let x = Math.min(particle.location1.x, particle.location2.x);
    let y = Math.min(particle.location1.y, particle.location2.y);
    let z = Math.min(particle.location1.z, particle.location2.z);

    let size_x = Math.abs(particle.location1.x - particle.location2.x)+1;
    let size_y = Math.abs(particle.location1.y - particle.location2.y)+1;
    let size_z = Math.abs(particle.location1.z - particle.location2.z)+1;

    let molang = new MolangVariableMap()
    .setVector3("variable.id", new Vector(id, particle._moving, 0))
    .setVector3("variable.size", new Vector(size_x, size_y, size_z));
    particle.dimension.spawnParticle("frame_particle:creater", new Location(x, y, z), molang);
    if(particle._moving > 0){
      particle._moving = 0;
    }
  });
});
