class EntityHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	//TODO Do meaningful bootstrapping here
	onEntityConstruction(msg) {}
	onEntityDestruction(msg) {}

	onEntityJoinWorld(msg, entity, zone) {
		this.FuzzyKnights.Render.RenderManager.Register(entity);

		let pos = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(entity);
		zone.Move(entity, -1, -1, pos.X, pos.Y);
	}
	onEntityLeaveWorld(msg, entity, zone) {}

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
	onEntityMove(msg, entity, pos0, pos1) {
		if(this.FuzzyKnights.Component.Mutator.Worlds.HasComponent(entity) && this.FuzzyKnights.Component.Mutator.Physics.HasComponent(entity)) {
			let x0 = pos0.X,
				y0 = pos0.Y,
				x1 = pos1.X,
				y1 = pos1.Y;

			this.FuzzyKnights.Component.Mutator.Worlds.SetPoint(entity, x1, y1);
			this.FuzzyKnights.Event.Spawn.EntityStateChangeEvent(entity, this.FuzzyKnights.Component.Enum.ActionStateType.MOVEMENT);

			let zone = this.FuzzyKnights.Component.Mutator.Worlds.GetZone(entity),
				neighbors = zone.Entities.GetNeighbors(x1, y1, 1),
				mask = this.FuzzyKnights.Component.Mutator.Physics.GetCollisionMask(entity);

			neighbors.forEach(neighs => {
				neighs.Element.forEach(ent => {
					let entMask = this.FuzzyKnights.Component.Mutator.Physics.GetCollisionMask(ent);

					if(mask.CheckCircleCollision(entMask)) {
						this.FuzzyKnights.Event.Spawn.EntityCollisionEvent(entity, ent);
					}
				});
			});
		}
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