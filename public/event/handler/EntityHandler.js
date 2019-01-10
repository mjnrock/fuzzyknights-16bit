class EntityHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	//TODO Do meaningful bootstrapping here
	onEntityConstruction(msg) {}
	onEntityDestruction(msg) {}

	onEntityJoinWorld(msg, entity, zone) {
		if(this.FuzzyKnights.Component.Mutator.Worlds.HasComponent(entity)) {
			this.FuzzyKnights.Render.RenderManager.Register(entity);

			let pos = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(entity);
			zone.Move(entity, -1, -1, pos.X, pos.Y);
		}
	}
	onEntityLeaveWorld(msg, entity, zone) {}

	onEntityStateChange(msg, entity) {
		if(this.FuzzyKnights.Component.Mutator.States.HasComponent(entity)) {
			let flag = msg.Payload.StateType;

			if(!this.FuzzyKnights.Component.Mutator.States.HasFlag(entity, flag)) {
				this.FuzzyKnights.Component.Mutator.States.AddFlag(entity, flag);
			} else {
				this.FuzzyKnights.Component.Mutator.States.RemoveFlag(entity, flag);
			}
		}
	}

	onEntityVelocity(msg, entity, velocity, time) {
		if(this.FuzzyKnights.Component.Mutator.Worlds.HasComponent(entity)) {
			let zone = this.FuzzyKnights.Component.Mutator.Worlds.GetZone(entity),
				pos = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(entity);

			// zone.Move(entity, pos.X, pos.Y, velocity.X, velocity.Y, true);
			zone.Move(entity, pos.X, pos.Y, velocity.X * time, velocity.Y * time, true);
		}
	}
	//TODO Something is causing the boundaries to consume the Player and prevent it from moving
	onEntityMove(msg, zone, entity, pos0, pos1) {
		if(this.FuzzyKnights.Component.Mutator.Worlds.HasComponent(entity) && this.FuzzyKnights.Component.Mutator.Physics.HasComponent(entity)) {
			let x0 = pos0.X,
				y0 = pos0.Y,
				x1 = pos1.X,
				y1 = pos1.Y;

			console.log(x0, y0, x1, y1);

				
			if(!zone.Terrain.IsWithinBounds(x1, y1)) {
				//TODO	Bounce the ball back
				this.FuzzyKnights.Component.Mutator.Physics.GetKinematics(entity).ResetKinematics();
				this.FuzzyKnights.Component.Mutator.Physics.GetKinetics(entity).ResetForces();
			} else {
				//TODO Read Terrain NavigabilityConstraint and apply it to movement
			}

			x1 = this.FuzzyKnights.Utility.Functions.Clamp(x1, 0, zone.Width);
			y1 = this.FuzzyKnights.Utility.Functions.Clamp(y1, 0, zone.Height);

			if(entity instanceof this.FuzzyKnights.Entity.Terrain.Terrain) {
				zone.UpdateTerrainMap(entity, x0, y0, x1, y1);
			} else {
				zone.UpdateEntityMap(entity, x0, y0, x1, y1);
			}
			this.FuzzyKnights.Component.Mutator.Worlds.SetPoint(entity, x1, y1);
			this.FuzzyKnights.Event.Spawn.EntityStateChangeEvent(entity, this.FuzzyKnights.Component.Enum.ActionStateType.MOVEMENT);

			let neighbors = zone.Entities.GetNeighbors(x1, y1, 1),
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
		} else if(msg.MessageType === "EntityVelocityMessage") {
			this.onEntityVelocity(msg, ...payload);
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