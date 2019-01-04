import Cinematograph from "./Cinematograph.js";

class Camera extends Cinematograph {
	//TODO $ar could be seeded with ViewPort aspect ratio from Client
	constructor(map, x, y, r) {
		super();

		this.Map = map;
		this.Radius = {
			Width: r,
			Height: r
		};

		this.Canvas.SetDimensions(
			Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius.Width * 2,
			Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius.Height * 2
		);
	}

	SetDimensions(w, h) {
		this.Canvas.SetDimensions(w, h);

		console.log(
			w,
			w / Cinematograph.Fudge(2, false),
			h,
			h / Cinematograph.Fudge(2, false),
			Cinematograph.Fudge(1, false),
			Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target
		);


		this.Radius.Width = w / Cinematograph.Fudge(2, false) / 2;
		this.Radius.Height = h / Cinematograph.Fudge(2, false) / 2;
		console.log(this.Radius);

		return this;
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
		this.Radius.Width = this.Radius.Height = value;

		return this;
	}

	GetAspectRatio() {
		return this.Radius.Width / this.Radius.Height;
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
				Xl: this.X - this.Radius.Width,
				Yl: this.Y - this.Radius.Height,
				Xr: this.X + this.Radius.Width,
				Yr: this.Y + this.Radius.Height
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
				Xl: this.X - this.Radius.Width,
				Yl: this.Y - this.Radius.Height,
				Xr: this.X + this.Radius.Width,
				Yr: this.Y + this.Radius.Height
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