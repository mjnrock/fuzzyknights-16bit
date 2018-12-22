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
			for(let x = 0; x <= 5; x++) {
				for(let y = 0; y <= 5; y++) {
					this.Canvas.Terrain.DrawColorizedFitToTile(t.Image, x, y, "#296b30");
				}
			}
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
			let pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(e);
			this.Canvas.Entity.DrawTile(this.Assets[this.GetSchema(e.constructor)].Render.GetImage(), pos.X, pos.Y, 2);
		});
	}

	Render(time) {
		this.Draw(time);
	}
}

export { RenderManager };