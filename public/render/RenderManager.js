class RenderManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Canvas = {
			Terrain: new this.FuzzyKnights.Utility.Drawing.Canvas("terrain", this.FuzzyKnights.Game.Settings.View.Tile),
			Entity: new this.FuzzyKnights.Utility.Drawing.Canvas("entity", this.FuzzyKnights.Game.Settings.View.Tile)
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

		this.RenderPlayer = null;
		this.Camera = new this.FuzzyKnights.Render.Drawing.Camera("entity");
	}

	GetCamera() {
		return this.Camera;
	}

	GetTerrainCanvas() {
		return this.Canvas.Entity;
	}
	GetEntityCanvas() {
		return this.Canvas.Terrain;
	}

	GetEntity(uuid) {
		return this.Entities[uuid];
	}
	GetTerrain(uuid) {
		return this.Terrain[uuid];
	}

	GetRenderPlayer() {
		return this.RenderPlayer;
	}
	SetRenderPlayer(value) {
		this.RenderPlayer = value;
		this.Camera.TrackPlayer(value);

		return this;
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
		// this.Canvas.Entity.PreDraw();

		// this.ForEachEntity((e) => {
		// 	//DEBUG (the UUID comparator)
		// 	this.Canvas.Entity.DrawTile(...e.Render(time));
		// });
		// this.ForEachTerrain((t) => {
		// 	this.Canvas.Terrain.DrawColoredTile(...t.Render(time));
		// });

		if(this.FuzzyKnights.Game.Settings.View.HUD) {
			this.FuzzyKnights.Render.Drawing.HUD.Draw(time, this.Entities);
		}
	}

	//TODO Make this only render what the Player can actually see
	//TODO Have this class hold some meta data about what it will render
	Render(time) {
		this.Draw(time);

		if(this.Camera) {
			this.Camera.Render(time);
		}
	}
}

export { RenderManager };