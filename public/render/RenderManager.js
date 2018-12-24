class RenderManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Canvas = {
			Terrain: new this.FuzzyKnights.Utility.Canvas("terrain"),
			Entity: new this.FuzzyKnights.Utility.Canvas("entity")
		};

		this.Assets = {};
		this.Entities = {};
		this.Terrain = {};

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

	Register(entity, isTerrain = false) {
		let cName = this.GetSchema(entity.constructor),
			model = new (this.Assets[cName].Render)(this.FuzzyKnights, entity);

		if(isTerrain === false) {
			this.Entities[entity.UUID] = model;
		} else {
			this.Terrain[entity.UUID] = model;
		}
	}
	
	LinkModel(clazz, render) {
		let cName = this.GetSchema(clazz),
			rName = this.GetSchema(render);

		this.Assets[cName] = {
			Class: clazz,
			ClassPath: cName,
			Render: render,
			RenderPath: rName
		};

		return this;
	}

	ForEachEntity(callback, ...args) {
		if(typeof callback === "function") {
			for(let uuid in this.Entities) {
				callback(this.Entities[uuid], ...args);
			}
		}

		return this;
	}
	ForEachTerrain(callback, ...args) {
		if(typeof callback === "function") {
			for(let uuid in this.Terrain) {
				callback(this.Terrain[uuid], ...args);
			}
		}

		return this;
	}

	Draw(time) {
		this.Canvas.Entity.PreDraw();
		this.ForEachEntity((e) => {
			this.Canvas.Entity.DrawTile(...e.Render(time));
		});
		this.ForEachTerrain((t) => {
			this.Canvas.Terrain.DrawColoredTile(...t.Render(time));
		});
	}

	Render(time) {
		this.Draw(time);
	}
}

export { RenderManager };