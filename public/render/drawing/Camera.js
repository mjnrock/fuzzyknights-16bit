import Cinematograph from "./Cinematograph.js";

class Camera extends Cinematograph {
	//TODO $ar could be seeded with ViewPort aspect ratio from Client
	constructor(map, x, y, r, ar = 1) {
		super();

		this.Map = map;
		this.X = x;
		this.Y = y;
		this.Radius = r;
		this.AspectRatio = ar;
	}

	GetMap() {
		return this.Map;
	}
	SetMap(value) {
		this.Map = value;

		return this;
	}

	GetPos() {
		return [ this.X, this.Y ];
	}
	SetPos(x, y) {
		this.X = x;
		this.Y = y;

		return this;
	}

	GetRadius() {
		return this.Radius;
	}
	SetRadius(value) {
		this.Radius = value;

		return this;
	}

	GetAspectRatio() {
		return this.AspectRatio;
	}
	SetAspectRatio(value) {
		this.AspectRatio = value;

		return this;
	}

	Shoot(x, y, r) {
		this.SetPos(x, y);
		this.SetRadius(r);

		return this;
	}

	DrawCreatures(node, tare) {
		return this.DrawModels(
			Cinematograph.FuzzyKnights.Render.RenderManager.GetModels(node.GetCreatures()),
			tare
		);
	}
	DrawTerrain(node, tare) {
		return this.DrawModels(
			Cinematograph.FuzzyKnights.Render.RenderManager.GetModels(node.GetTerrain()),
			tare
		);
	}
	DrawModels(models, tare) {
		models.forEach(model => {
			let pos = Cinematograph.FuzzyKnights.Component.Mutator.Maps.GetPosition(model.Entity);
	
			this.Canvas.DrawTile(
				model.Render().GetHTMLCanvas(),
				pos.X - tare.X,
				pos.Y - tare.Y
			);
		});

		return this;
	}
	
	GetNodes() {
		let nodes = [],
			tare = {
				Xl: this.X - this.Radius,
				Yl: this.Y - this.Radius,
				Xr: this.X + this.Radius,
				Yr: this.Y + this.Radius
			};

		this.Map.Grid.ForEach((pos, node, grid) => {
			if((pos.X >= tare.Xl && pos.X <= tare.Xr) && (pos.Y >= tare.Yl && pos.Y <= tare.Yr)) {
				nodes.push(node);
			}
		});

		return nodes;
	}
	GetFeed() {
		this.Canvas.PreDraw();
		let nodes = this.GetNodes(),
			tare = {
				X: this.X,
				Y: this.Y,
				R: this.Radius,
				Xl: this.X - this.Radius,
				Yl: this.Y - this.Radius,
				Xr: this.X + this.Radius,
				Yr: this.Y + this.Radius
			};

		nodes.forEach(node => {
			this.DrawTerrain(node, tare);
		});
		nodes.forEach(node => {
			this.DrawCreatures(node, tare);
		});

		return this.Canvas;
	}
}

export default Camera;