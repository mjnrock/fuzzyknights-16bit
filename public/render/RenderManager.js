class RenderManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Canvas = {
			Terrain: new this.FuzzyKnights.Utility.Canvas("terrain"),
			Entity: new this.FuzzyKnights.Utility.Canvas("entity")
		};

		console.log(this.Canvas);
		
		new this.FuzzyKnights.Render.Entity.Entity("entity/entity-raccoon", (t) => {
			this.Canvas.Entity.DrawFitToTile(t.Image, 0, 0, 2);
		});
		new this.FuzzyKnights.Render.Entity.Terrain.Grass((t) => {
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 0, 0, "#296b30", 0.3);
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 1, 0, "#296b30", 0.3);
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 1, 1, "#296b30", 0.3);
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 0, 1, "#296b30", 0.3);
		});
	}

	Tick(time) {

	}
}

export { RenderManager };