class HUD {
	constructor(fk, canvas) {
		this.FuzzyKnights = fk;
		this.Canvas = canvas;
	}

	DrawResourceBars(entity) {
		let ctx = this.Canvas.Context;

		let pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(entity),
			health = this.FuzzyKnights.Component.Mutator.Resources.GetHealth(entity),
			mana = this.FuzzyKnights.Component.Mutator.Resources.GetMana(entity);

		ctx.fillStyle = "rgba(60, 185, 60, 1.0)";
		ctx.fillRect(
			pos.X * this.FuzzyKnights.Game.Settings.View.Tile.Width,
			pos.Y * this.FuzzyKnights.Game.Settings.View.Tile.Height,
			this.FuzzyKnights.Game.Settings.View.Tile.Width,
			this.FuzzyKnights.Game.Settings.View.Tile.Height
		);
	}

	Draw(time, renderEntities = {}) {
		Object.values(renderEntities).forEach(rendity => {
			this.DrawResourceBars(rendity.Entity);
		});
	}
}

export default HUD;