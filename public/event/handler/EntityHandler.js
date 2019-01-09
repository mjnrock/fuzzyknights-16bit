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

	onEntityJoinWorld(msg, entity, zone) {
		this.FuzzyKnights.Entity.EntityManager.Register(entity);
		this.FuzzyKnights.Render.RenderManager.Register(entity);

		let pos = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(entity);
		zone.Move(entity, -1, -1, 5, 5);//pos.X, pos.Y);
	}

	onEntityStateChange(msg, entity) {
		let flag = msg.Payload.StateType;

		if(!this.FuzzyKnights.Component.Mutator.States.HasFlag(entity, flag)) {
			this.FuzzyKnights.Component.Mutator.States.AddFlag(entity, flag);
		} else {
			this.FuzzyKnights.Component.Mutator.States.RemoveFlag(entity, flag);
		}
	}

	onEntityDisplacement(msg, entity, displacement) {
		let zone = this.FuzzyKnights.Component.Mutator.Worlds.GetZone(entity),
			[ x, y ] = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(entity);

		zone.Displace(entity, x, y, displacement);
	}
	onEntityMove(msg, entity, x0, y0, x1, y1) {
		this.FuzzyKnights.Component.Mutator.Worlds.SetPoint(entity, x1, y1);
		this.FuzzyKnights.Event.Spawn.EntityStateChangeEvent(entity, this.FuzzyKnights.Component.Enum.ActionStateType.MOVEMENT);

		let zone = this.FuzzyKnights.Component.Mutator.Worlds.GetZone(entity),
			neighbors = zone.Entities.GetNeighbors(x1, y1, 1),
			mask = this.FuzzyKnights.Component.Mutator.Physics.GetCollisionMask(entity);

		neighbors.forEach(neighs => {
			neighs.Element.forEach(ent => {
				let entMask = this.FuzzyKnights.Component.Mutator.Physics.GetCollisionMask(ent);

				console.log(mask);
				if(mask.CheckCircleCollision(entMask)) {
					this.FuzzyKnights.Event.Spawn.EntityCollisionEvent(entity, ent);
				}
			})
		});
	}
	onEntityCollision(msg, collidor, collidee) {
		console.log(`[COLLISION EVENT]: Collidor -> Collidee`, collidor, collidee);

		//TODO Do collision logic
	}

	onEntityDamage(msg, target, source, damage) {
		console.log(target, source, damage);
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
		} else if(msg.MessageType === "EntityDisplacementMessage") {
			this.onEntityDisplacement(msg, ...payload);
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