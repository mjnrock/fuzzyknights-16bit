class EntityHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onEntityDestruction(msg, uuid) {
		let entity = this.FuzzyKnights.Common.Entity.EntityManager.GetEntity(uuid);
		this.FuzzyKnights.Common.Entity.EntityManager.Unregister(entity);
		
		if(this.FuzzyKnights.IsServer) {
			this.FuzzyKnights.Common.Message.Packet.PacketManager.SpawnServer(msg);
		}
	}
	onEntityConstruction(msg, json) {
		//TODO Serialize the Entity, instantiate, and assign to "entity"
		// let entity = this.FuzzyKnights.Common.Entity.EntityManager;
		this.FuzzyKnights.Common.Entity.EntityManager.Register(entity);

		if(this.FuzzyKnights.IsServer) {
			this.FuzzyKnights.Common.Message.Packet.PacketManager.SpawnServer(msg);
		}
	}

	onEntityStateChange(msg) {
		console.log(...arguments);
	}

	onEntityMove(msg, uuid, x, y) {
		let entity = this.FuzzyKnights.Common.Entity.EntityManager.GetEntity(uuid);
		this.FuzzyKnights.Common.Component.Mutator.Maps.SetPosition(entity, x, y);
	}

	onEntityDamage(msg, target, source, damage) {
		// this.FuzzyKnights.Common.Entity.EntityManager
		console.log(arguments);
	}

	ProcessMessage(msg) {
		let payload = Object.values(msg.Payload);
		if(msg.MessageType === "EntityDamageMessage") {
			this.onEntityDamage(msg, ...payload);
		} else if(msg.MessageType === "EntityMoveMessage") {
			this.onEntityMove(msg, ...payload);
		} else if(msg.MessageType === "EntityStateChangeMessage") {
			this.onEntityStateChange(msg, ...payload);
		} else if(msg.MessageType === "EntityConstructionMessage") {
			this.onEntityConstruction(msg, ...payload);
		} else if(msg.MessageType === "EntityDestructionMessage") {
			this.onEntityDestruction(msg, ...payload);
		}
	}
	ReceiveMessage(msg, time = null) {
		this.ProcessMessage(msg);

		if(this.FuzzyKnights.IsServer) {
			console.log(`[MESSAGE RECEIVED - EntityHandler]: ${msg.MessageType}`);
		} else {
			console.log(`[MESSAGE RECEIVED]: ${msg.MessageType}`, msg);
		}
	}
}

export { EntityHandler };