class EntityHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	onEntityDestruction(msg, uuid) {
		let entity = this.FuzzyKnights.Entity.EntityManager.GetEntity(uuid);
		this.FuzzyKnights.Entity.EntityManager.Unregister(entity);
		this.FuzzyKnights.Render.RenderManager.Unregister(entity);
	}
	onEntityConstruction(msg, json) {}

	onEntityJoinWorld(msg, entity, map) {
		this.FuzzyKnights.Entity.EntityManager.Register(entity);
		this.FuzzyKnights.Render.RenderManager.Register(entity);

		let pos = this.FuzzyKnights.Component.Mutator.Maps.GetPosition(entity);
		map.PlaceEntity(entity, pos.X, pos.Y);
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

	onEntityMove(msg, uuid, poso, posn) {
		let entity = this.FuzzyKnights.Entity.EntityManager.GetEntity(msg.Payload.UUID),
			map = this.FuzzyKnights.Component.Mutator.Maps.GetMap(entity);
			
		if((poso.X !== posn.X || poso.Y !== posn.Y)) {
			this.FuzzyKnights.Component.Mutator.Maps.AttemptMove(entity, map, poso.X, poso.Y, posn.X, posn.Y);
			this.FuzzyKnights.Event.Spawn.EntityStateChangeEvent(msg.Payload.UUID, this.FuzzyKnights.Component.Enum.ActionStateType.MOVEMENT);
		}
	}

	onEntityDamage(msg, target, source, damage) {
		// this.FuzzyKnights.Entity.EntityManager;
		console.log(arguments);
	}
	onEntityCollision(msg, collidor, collidee) {
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
		} else if(msg.MessageType === "EntityCollisionMessage") {
			this.onEntityCollision(msg, ...payload);
		} else if(msg.MessageType === "EntityJoinWorldMessage") {
			this.onEntityJoinWorld(msg, ...payload);
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