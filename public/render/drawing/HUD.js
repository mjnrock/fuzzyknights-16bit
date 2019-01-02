class HUD {
	constructor(fk, canvas) {
		this.FuzzyKnights = fk;
		this.Canvas = canvas;

		this.Helper = {
			Width: this.FuzzyKnights.Game.Settings.View.Tile.Width,
			Height: this.FuzzyKnights.Game.Settings.View.Tile.Height,
			Target: this.FuzzyKnights.Game.Settings.View.Tile.Target,

			Health: [
				[ 80, "rgb(60, 150, 60)" ],
				[ 60, "rgb(105, 150, 60)" ],
				[ 40, "rgb(150, 150, 60)" ],
				[ 25, "rgb(150, 115, 60)" ],
				[ 0, "rgb(150, 60, 60)" ]
			],
			Mana: [
				[ 80, "rgb(60, 105, 150)" ],
				[ 60, "rgb(60, 82, 150)" ],
				[ 40, "rgb(82, 60, 150)" ],
				[ 25, "rgb(127, 60, 150)" ],
				[ 0, "rgb(150, 60, 82)" ]
			]
		}
	}

	DrawResourceBars(entity) {
		let ctx = this.Canvas.Context;

		let pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(entity),
			health = this.FuzzyKnights.Component.Mutator.Resources.GetHealth(entity),
			mana = this.FuzzyKnights.Component.Mutator.Resources.GetMana(entity);

		//	Health Bar
		this.DrawResourceBar(ctx, health, pos.X, pos.Y);
		this.DrawResourceBar(ctx, mana, pos.X, pos.Y);
	}
	DrawResourceBar(ctx, res, x, y) {
		let color,
			percent = res.Current / res.Max * 100,
			sX = (x - 0.5) * this.Helper.Width,
			sY = (y - 0.5) * this.Helper.Height;

		if(res.Type === this.FuzzyKnights.Component.Enum.ResourceType.HEALTH) {
			for(let i in this.Helper.Health) {
				let t = this.Helper.Health[i];

				if(percent >= t[0]) {
					color = t[1];
					break;
				}
			}
			ctx.roundRect(sX, sY, this.Helper.Width, 8, 2).stroke();
			ctx.roundRect(sX, sY, this.Helper.Width * (percent / 100), 8, 
				percent >= 98 ? 2 :
				{
					tl: 2,
					bl: 2,
					tr: 0,
					br: 0
				},
				color
			).stroke();
		} else if(res.Type === this.FuzzyKnights.Component.Enum.ResourceType.MANA) {
			for(let i in this.Helper.Mana) {
				let t = this.Helper.Mana[i];

				if(percent >= t[0]) {
					color = t[1];
					break;
				}
			}
			ctx.roundRect(sX + 8, sY + 8, this.Helper.Width - 16, 6, 2).stroke();
			ctx.roundRect(sX + 8, sY + 8, (this.Helper.Width - 16) * (percent / 100), 6,
				percent >= 98 ? 2 :
				{
					tl: 2,
					bl: 2,
					tr: 0,
					br: 0
				},
				color
			).stroke();
		}

		return this;
	}

	Draw(time, renderEntities = {}) {
		Object.values(renderEntities).forEach(rendity => {
			this.DrawResourceBars(rendity.Entity);
		});
	}
}

export default HUD;