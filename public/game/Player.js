import { NewUUID } from "./../utility/Functions.js";

class Player {
	constructor(name, entity) {
		this.Name = name;
		this.Entity = entity;

		this.UUID = NewUUID();
		this.Timestamp = Date.now();
	}

	GetUUID() {
		return this.UUID;
	}
	SetUUID(uuid) {
		this.UUID = uuid;

		return this;
	}

	GetName() {
		return this.Name;
	}
	SetName(name) {
		this.Name = name;

		return this;
	}

	GetEntity() {
		return this.Entity;
	}
	SetEntity(entity) {
		this.Entity = entity;

		return this;
	}
}

export { Player };