import { MinClamp, ClampCeiling } from "./../../../common/utility/Functions.js";

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
			Cinematograph.FuzzyKnights.Common.Game.Settings.View.Tile.Target * this.Radius.Width * 2,
			Cinematograph.FuzzyKnights.Common.Game.Settings.View.Tile.Target * this.Radius.Height * 2
		);
	}

	SetDimensions(w, h) {
		this.Canvas.SetDimensions(
			ClampCeiling(w, Cinematograph.FuzzyKnights.Common.Game.Settings.View.Tile.Target * this.Radius.LIMIT * 2),
			ClampCeiling(h, Cinematograph.FuzzyKnights.Common.Game.Settings.View.Tile.Target * this.Radius.LIMIT * 2)
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

	DrawEntities(entities, tare) {
		return this.DrawModels(
			Cinematograph.FuzzyKnights.Client.Render.RenderManager.GetModels(entities),
			tare
		);
	}
	DrawTerrain(terrain, tare) {
		return this.DrawModels(
			Cinematograph.FuzzyKnights.Client.Render.RenderManager.GetModels([ terrain ]),
			tare
		);
	}
	DrawModels(models, tare) {
		models.forEach(model => {
			let pos = Cinematograph.FuzzyKnights.Common.Component.Mutator.Worlds.GetPoint(model.Entity);

			this.Canvas.DrawTile(
				model.Render().GetHTMLCanvas(),
				((pos.X - tare.Xl) - Cinematograph.Fudge()),
				((pos.Y - tare.Yl) - Cinematograph.Fudge())
				// ~~((pos.X - tare.Xl) - Cinematograph.Fudge()),
				// ~~((pos.Y - tare.Yl) - Cinematograph.Fudge())
			);
		});

		return this;
	}

	GetTare() {
		return {
			X: this.X,
			Y: this.Y,
			R: this.Radius.Width,
			Xl: this.X - this.Radius.Width,
			Yl: this.Y - this.Radius.Height,
			Xr: this.X + this.Radius.Width,
			Yr: this.Y + this.Radius.Height
		};
	}

	//TODO This is still fairly expensive in terms of FPS
	GetFeed() {
		this.Canvas.PreDraw();

		let tare = this.GetTare();

		this.Zone.Terrain.ForEachNeighbor(tare.X, tare.Y, tare.R + 1, (pos, terrain, em) => {
		// this.Zone.Terrain.WindowedForEach(tare.Xl, tare.Yl, this.Radius.Width * 2 + 1, this.Radius.Height * 2 + 1, (pos, terrain, em) => {
			this.DrawTerrain(terrain, tare);
		});
		this.Zone.Entities.ForEachNeighbor(tare.X, tare.Y, tare.R + 1, (pos, entities, em) => {
		// this.Zone.Entities.WindowedForEach(tare.Xl, tare.Yl, this.Radius.Width * 2, this.Radius.Height * 2, (pos, entities, em) => {
			this.DrawEntities(entities, tare);
		});

		return this.Canvas;
	}
}

export default Camera;