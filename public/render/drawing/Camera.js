import Cinematograph from "./Cinematograph.js";

class Camera extends Cinematograph {
	//TODO $ar could be seeded with ViewPort aspect ratio from Client
	constructor(map, x, y, r, ar = 1) {
		super();

		this.Map = map;
		this.Radius = r;
		this.AspectRatio = ar;

		this.Canvas.SetDimensions(
			Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius * 2,
			Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius * 2
		);
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
				(pos.X - tare.Xl) - Cinematograph.Fudge(),
				(pos.Y - tare.Yl) - Cinematograph.Fudge()
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
			if((pos.X >= tare.Xl - 1 && pos.X <= tare.Xr + 1) && (pos.Y >= tare.Yl - 1 && pos.Y <= tare.Yr + 1)) {
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