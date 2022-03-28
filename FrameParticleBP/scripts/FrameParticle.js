/*LICENSE : https://github.com/moonstera/FrameParticle/blob/main/LICENSE*/
import {
  world,
  Location,
  Vector,
  Dimension,
  MolangVariableMap
} from "mojang-minecraft";

export class FrameParticle {
  static particle_id = 0;
  static frame_particles = new Map();

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
    
    this.dim = dim;
    this.loc1 = new Location(Math.floor(loc1.x), Math.floor(loc1.y), Math.floor(loc1.z));
    this.loc2 = new Location(Math.floor(loc2.x), Math.floor(loc2.y), Math.floor(loc2.z));
    this.moving = 0;  //0: false, 1~: true  //座標が変更されたときの残像を軽減するため
    this.id = FrameParticle.particle_id++;
  }

  show(){
    FrameParticle.frame_particles.set(this.id, this);
    return this;
  }

  get dimension(){
    return this.dim;
  }

  get location1(){
    return this.loc1;
  }

  get location2(){
    return this.loc2;
  }

  set location1(loc){
    if(loc instanceof Location){
      let new_loc = new Location(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z));
      if(!this.loc1.equals(new_loc)){
        this.loc1 = new_loc;
        this.moving = 1;
      }
    } else {
      console.error("The specified object is of invalid type. The correct type is \"Location\".");
    }
  }

  set location2(loc){
    if(loc instanceof Location){
      let new_loc = new Location(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z));
      if(!this.loc2.equals(new_loc)){
        this.loc2 = new_loc;
        this.moving = 1;
      }
    } else {
      console.error("The specified object is of invalid type. The correct type is \"Location\".");
    }
  }

  delete(){
    if(this.id != -1)FrameParticle.frame_particles.delete(this.id);
  }

}

world.events.tick.subscribe(() => {
  FrameParticle.frame_particles.forEach((particle, id) => {
    let x = Math.min(particle.location1.x, particle.location2.x);
    let y = Math.min(particle.location1.y, particle.location2.y);
    let z = Math.min(particle.location1.z, particle.location2.z);

    let size_x = Math.abs(particle.location1.x - particle.location2.x)+1;
    let size_y = Math.abs(particle.location1.y - particle.location2.y)+1;
    let size_z = Math.abs(particle.location1.z - particle.location2.z)+1;

    let molang = new MolangVariableMap()
    .setVector3("variable.id", new Vector(id, particle.moving, 0))
    .setVector3("variable.size", new Vector(size_x, size_y, size_z));
    particle.dimension.spawnParticle("frame_particle:creater", new Location(x, y, z), molang);
    if(particle.moving){
      particle.moving = 0;
    }
  });
});
