import Cinematograph from "./Cinematograph.js";

class Camera extends Cinematograph {
	constructor(id, entity, x, y) {
		super(id);

		this.Entity = entity;
		this.Map = Cinematograph.FuzzyKnights.Component.Mutator.Maps.GetMap(entity);

		this.X = x;
		this.Y = y;
	}

	GetPos() {
		return [ this.X, this.Y ];
	}
	SetPos(x, y) {
		this.X = x;
		this.Y = y;

		return this;
	}

	Draw(time) {
		this.Canvas.PreDraw();
		this.Canvas.DrawTile(this.Entity.Render(time), x, y);
	}
}

export default Camera;