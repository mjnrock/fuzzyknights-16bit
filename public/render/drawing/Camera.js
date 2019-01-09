import { MinClamp, UpperClamp, LowerClamp } from "./../../utility/Functions.js";

import Cinematograph from "./Cinematograph.js";

class Camera extends Cinematograph {
	constructor(zone, x, y, r) {
		super();

		this.Zone = zone;
		this.X = x;
		this.Y = y;
		this.Radius = {
			Width: r,
			Height: r,
			LIMIT: 4
		};

		this.Canvas.SetDimensions(
			Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius.Width * 2,
			Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius.Height * 2
		);
	}

	SetDimensions(w, h) {
		this.Canvas.SetDimensions(
			UpperClamp(w, Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius.LIMIT * 2),
			UpperClamp(h, Cinematograph.FuzzyKnights.Game.Settings.View.Tile.Target * this.Radius.LIMIT * 2)
		);

		this.Radius.Width = MinClamp(w / Cinematograph.Fudge(2, false) / 2, this.Radius.LIMIT);
		this.Radius.Height = MinClamp(h / Cinematograph.Fudge(2, false) / 2, this.Radius.LIMIT);

		return this;
	}

	GetZone() {
		return this.Zone;
	}
	SetZone(value) {
		this.Zone = value;

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
			let pos = Cinematograph.FuzzyKnights.Component.Mutator.Worlds.GetPoint(model.Entity);
	
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

		this.Zone.Grid.ForEach((pos, node, grid) => {
			if((pos.X >= tare.Xl - 1 && pos.X <= tare.Xr + 1) && (pos.Y >= tare.Yl - 1 && pos.Y <= tare.Yr + 1)) {
				nodes.push(node);
			}
		});

		return nodes;
	}

	//TODO This is still fairly expensive in terms of FPS
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