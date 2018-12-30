import CollisionMask from "./CollisionMask.js";

class CircleCollisionMask extends CollisionMask {
	constructor(x, y, r) {
		super(x, y);

		this.Radius = r;
	}
}

export default CircleCollisionMask;