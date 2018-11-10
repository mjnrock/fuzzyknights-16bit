import { Entity } from "./Entity.js";

class EntityManager {
	constructor(fk, entities = {}) {
		this.FuzzyKnights = fk;
		this.Entities = entities;
	}

	HasEntity(search) {
		let ent;
		if(search instanceof Entity) {
			ent = this.Entities[search.UUID];
		} else if(typeof search === "string" || search instanceof String) {
			ent = this.Entities[search];
		}
				
		return ent !== null && ent !== void 0;
	}

	GetEntity(uuid) {
		return this.Entities[uuid];
	}
	SetEntity(uuid, entity) {
		this.Entities[uuid] = entity;

		return this;
	}

	Register(...entities) {
		for(let i in entities) {
			this.Entities[entities[i].UUID] = entities[i];
		}

		return this;
	}
	Unregister(...entities) {
		for(let i in entities) {
			delete this.Entities[entities[i].UUID];
		}

		return this;
	}

	Tick(time) {
		for(let uuid in this.Entities) {
			this.Entities[uuid].Tick(time);
		}
	}
}

export { EntityManager };