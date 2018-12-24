class EntityHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onEntityDestruction(msg, uuid) {
		let entity = this.FuzzyKnights.Entity.EntityManager.GetEntity(uuid);
		this.FuzzyKnights.Entity.EntityManager.Unregister(entity);
		
		if(this.FuzzyKnights.IsServer) {
			this.FuzzyKnights.Message.Packet.PacketManager.SpawnServer(msg);
		}
	}
	onEntityConstruction(msg, json) {
		//TODO Serialize the Entity, instantiate, and assign to "entity"
		// let entity = this.FuzzyKnights.Entity.EntityManager;
		this.FuzzyKnights.Entity.EntityManager.Register(entity);

		if(this.FuzzyKnights.IsServer) {
			this.FuzzyKnights.Message.Packet.PacketManager.SpawnServer(msg);
		}
	}

	onEntityStateChange(msg, uuid) {
		let entity = this.FuzzyKnights.Entity.EntityManager.GetEntity(uuid),
			flag = msg.Payload.StateType;

		if(!this.FuzzyKnights.Component.Mutator.States.HasFlag(entity, flag)) {
			this.FuzzyKnights.Component.Mutator.States.AddFlag(entity, flag);
		} else {
			this.FuzzyKnights.Component.Mutator.States.RemoveFlag(entity, flag);
		}
	}

	onEntityMove(msg, uuid, x0, y0, x1, y1) {
		// console.log(...arguments);
		let entity = this.FuzzyKnights.Entity.EntityManager.GetEntity(uuid);

		if((x0 !== x1 || y0 !== y1)) {
			this.FuzzyKnights.Event.Spawn.EntityStateChangeEvent(uuid, this.FuzzyKnights.Component.Enum.ActionStateType.MOVEMENT);
		}
	}

	onEntityDamage(msg, target, source, damage) {
		// this.FuzzyKnights.Entity.EntityManager;
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
			// console.log(`[MESSAGE RECEIVED]: ${msg.MessageType}`, msg);
		}
	}
}

export { EntityHandler };