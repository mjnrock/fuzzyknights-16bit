class RenderManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Models = {};
		this.Entities = {};

		this.Camera = new this.FuzzyKnights.Render.Drawing.Actor(
			this.FuzzyKnights.Game.GameManager.GetPlayer().GetEntity(),
			3
		);
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
	
	//TODO Change the #test canvas to the ViewPort's canvas and make ViewPort the only view the Player sees
	Render(time) {
		if(this.Camera) {
			document.getElementById("test").getContext("2d").clearRect(0, 0, 10000, 10000);
			document.getElementById("test").getContext("2d").drawImage(this.Camera.GetFeed().GetHTMLCanvas(), 0, 0);
		}
	}
}

export { RenderManager };