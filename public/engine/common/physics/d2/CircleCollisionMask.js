import CollisionMask from "./CollisionMask.js";

class CircleCollisionMask extends CollisionMask {
	constructor(x, y, r) {
		super(x, y);

		this.Radius = r;
	}

	GetValues() {
		return [
			this.Origin.X,
			this.Origin.Y,
			this.Radius
		];
	}

	CheckCircleCollision(xOr, yOr, xEe, yEe, maskEe) {
		return this.CheckIntersection(
			xOr + this.Origin.X,
			yOr + this.Origin.Y,
			this.Radius / CollisionMask.FuzzyKnights.Common.Game.Settings.View.Tile.Target,
			xEe + maskEe.Origin.X,
			yEe + maskEe.Origin.Y,
			maskEe.Radius / CollisionMask.FuzzyKnights.Common.Game.Settings.View.Tile.Target
		);
	}

	CheckIntersection(x0, y0, r0, x1, y1, r1) {
		return Math.hypot(x0 - x1, y0 - y1) <= r0 + r1;
	}
}

export default CircleCollisionMask;