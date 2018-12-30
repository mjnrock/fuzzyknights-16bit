import { Entity } from "../Entity.js";

class Creature extends Entity {
	constructor(fk, entity, filename, onload = null) {
		super(fk, entity, Entity.ENTITY(filename), onload);
	}	

	// Render() {
	// 	let ret = super.Render(),
	// 		mask = this.FuzzyKnights.Component.Mutator.RigidBody.GetCollisionMask(this.Entity);

	// 	return [
	// 		ret[0],
	// 		ret[1] - mask.Origin.X,
	// 		ret[2] - mask.Origin.Y,
	// 		ret[3],		// tx - These need to change based on STATE
	// 		ret[4]		// ty - These need to change based on STATE
	// 	];
	// }
}

export { Creature };