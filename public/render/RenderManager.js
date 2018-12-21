class RenderManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Canvas = {
			Terrain: new this.FuzzyKnights.Utility.Canvas("terrain"),
			Entity: new this.FuzzyKnights.Utility.Canvas("entity")
		};

		console.log(this.Canvas);

		this.Assets = {};

		new this.FuzzyKnights.Render.Entity.Terrain.Grass((t) => {
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 0, 0, "#296b30", 0.3);
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 1, 0, "#296b30", 0.3);
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 1, 1, "#296b30", 0.3);
			this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, 0, 1, "#296b30", 0.3);
		});
	}

	async Register(clazz, render) {
		let c = clazz,
			cName = clazz.name;

		while(typeof c.__proto__ === "function" && c.__proto__ !== Object && c.__proto__.name.length > 0) {
			cName = `${ c.__proto__.name }.${ cName }`;
			c = c.__proto__;
		}

		let r = render,
			rName = render.name;

		while(typeof r.__proto__ === "function" && r.__proto__ !== Object && r.__proto__.name.length > 0) {
			rName = `${ r.__proto__.name }.${ rName }`;
			r = r.__proto__;
		}

		this.Assets[cName] = {
			ClassPath: cName,
			Class: clazz,
			RenderPath: rName,
			Render: render
		};


		new render(t => this.Assets[cName]["Render"] = t);
		return this;
	}

	Draw() {		
		this.FuzzyKnights.Entity.EntityManager.ForEach((e) => {
			new this.FuzzyKnights.Render.Entity.Creature.Raccoon((t) => {
				this.Canvas.Entity.DrawFitToTile(t.Image, 0, 0, 2);
			});
		});
	}

	Render(time) {
		// this.Canvas.Entity.PreDraw();

		this.Draw();
	}
}

export { RenderManager };