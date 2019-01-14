class RenderManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Models = {};
		this.Entities = {};
		
		this.ViewPort = new this.FuzzyKnights.Client.Render.Drawing.ViewPort(fk);

		window.addEventListener("resize", this.OnWindowResize.bind(this));
		this.OnWindowResize();
	}

	OnWindowResize() {
		this.ViewPort.Canvas.SetDimensions(window.innerWidth, window.innerHeight);
		this.ViewPort.Camera.SetDimensions(window.innerWidth, window.innerHeight);
		
		this.ViewPort.DebugCanvas.SetDimensions(window.innerWidth, window.innerHeight);
	}

	GetCamera() {
		return this.Camera;
	}

	GetModel(uuid) {
		return this.Entities[uuid];
	}
	GetModels(entities) {
		return entities.map(entity => this.Entities[entity.UUID]);		
	}

	GetCreatureModels() {
		return Object.values(this.Entities).filter(v => v.Entity instanceof this.FuzzyKnights.Common.Entity.Creature.Creature);
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

	Register(entity) {
		let cName = this.GetSchema(entity.constructor),
			model = new (this.Models[cName].Render)(this.FuzzyKnights, entity);

		this.Entities[entity.UUID] = model;
	}
	
	LinkModel(clazz, render) {
		let cName = this.GetSchema(clazz),
			rName = this.GetSchema(render);

		this.Models[cName] = {
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
	
	Render(time) {
		if(this.ViewPort) {
			this.ViewPort.Render(time);
		}
	}
}

export { RenderManager };