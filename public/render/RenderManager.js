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

	GetSchema(clazz) {
		let c = clazz,
			schema = clazz.name;

		while(typeof c.__proto__ === "function" && c.__proto__ !== Object && c.__proto__.name.length > 0) {
			schema = `${ c.__proto__.name }.${ schema }`;
			c = c.__proto__;
		}

		return schema;
	}
	Register(clazz, render) {
		let cName = this.GetSchema(clazz),
			rName = this.GetSchema(render);

		this.Assets[cName] = {
			Class: clazz,
			ClassPath: cName,
			Render: (new render()),
			RenderPath: rName
		};

		return this;
	}

	Draw(time) {
		this.Canvas.Entity.PreDraw();
		this.FuzzyKnights.Entity.EntityManager.ForEach((e) => {
			this.Canvas.Entity.DrawFitToTile(this.Assets[this.GetSchema(e.constructor)].Render.GetImage(), 0, 0, 2);
		});
	}

	Render(time) {
		this.Draw(time);
	}
}

export { RenderManager };