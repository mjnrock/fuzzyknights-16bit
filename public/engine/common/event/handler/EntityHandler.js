class EntityHandler {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	//TODO Do meaningful bootstrapping here
	onEntityConstruction(msg) {}
	onEntityDestruction(msg) {}

	onEntityJoinWorld(msg, entity, zone) {
		if(this.FuzzyKnights.Common.Component.Mutator.Worlds.HasComponent(entity)) {
			this.FuzzyKnights.Client.Render.RenderManager.Register(entity);

			let pos = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetPoint(entity);
			zone.Move(entity, -1, -1, pos.X, pos.Y);
		}
	}
	onEntityLeaveWorld(msg, entity, zone) {}

	onEntityStateChange(msg, entity) {
		if(this.FuzzyKnights.Common.Component.Mutator.States.HasComponent(entity)) {
			let flag = msg.Payload.StateType;

			if(!this.FuzzyKnights.Common.Component.Mutator.States.HasFlag(entity, flag)) {
				this.FuzzyKnights.Common.Component.Mutator.States.AddFlag(entity, flag);
			} else {
				this.FuzzyKnights.Common.Component.Mutator.States.RemoveFlag(entity, flag);
			}
		}
	}

	onEntityVelocity(msg, entity, velocity, time) {
		if(this.FuzzyKnights.Common.Component.Mutator.Worlds.HasComponent(entity)) {
			let zone = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetZone(entity),
				pos = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetPoint(entity);

			// zone.Move(entity, pos.X, pos.Y, velocity.X, velocity.Y, true);
			zone.Move(entity, pos.X, pos.Y, velocity.X * time, velocity.Y * time, true);
		}
	}
	//TODO Something is causing the boundaries to consume the Player and prevent it from moving
	onEntityMove(msg, zone, entity, pos0, pos1) {
		if(this.FuzzyKnights.Common.Component.Mutator.Worlds.HasComponent(entity) && this.FuzzyKnights.Common.Component.Mutator.Physics.HasComponent(entity)) {
			let x0 = pos0.X,
				y0 = pos0.Y,
				x1 = pos1.X,
				y1 = pos1.Y,
				dx = x0 - x1,
				dy = y0 - y1,
				v = this.FuzzyKnights.Common.Component.Mutator.Physics.GetVelocity(entity),
				[ vx, vy ] = v.Get();

			if(Math.abs(vx) <= 0.1) {
				vx = 0;
			}
			if(Math.abs(vy) <= 0.1) {
				vy = 0;
			}
				
			if(!zone.Terrain.IsWithinBounds(x1, y1)) {
				this.FuzzyKnights.Common.Component.Mutator.Physics.GetKinematics(entity).ResetKinematics();
				this.FuzzyKnights.Common.Component.Mutator.Physics.GetKinetics(entity).ResetForces();

				if(Math.abs(dx) < Math.abs(dy)) {
					vy = -vy;
				} else if(Math.abs(dx) > Math.abs(dy)) {
					vx = -vx;
				} else {
					vx = -vx;
					vy = -vy;
				}

				this.FuzzyKnights.Common.Component.Mutator.Physics.SetVelocity(
					entity,
					this.FuzzyKnights.Common.Physics.D2.Velocity.Generate(vx, vy)
				);
			} else {
				let terrain = zone.Terrain.Get(x0, y0);

				//TODO Technically this works, but the numbers need to be fitted better and change curves optimized
				//TODO Maybe fudge this by only applying frictional forces if Velocity > FrictionThreshold
				if(terrain instanceof this.FuzzyKnights.Common.Entity.Terrain.Terrain) {
					let fric = this.FuzzyKnights.Common.Component.Mutator.TerrainInfo.GetNavigabilityConstraint(terrain),
						factor = 1.5;

					if(Math.abs(vx) > 0.1) {
						this.FuzzyKnights.Common.Component.Mutator.Physics.AddForce(
							entity,
							this.FuzzyKnights.Common.Physics.D2.Force.Generate((vx < 0 ? factor : -factor) * Math.max(Math.abs(vx), Math.abs(fric)), 0)
						);
					} else {
						vx = 0;
					}

					if(Math.abs(vy) > 0.1) {
						this.FuzzyKnights.Common.Component.Mutator.Physics.AddForce(
							entity,
							this.FuzzyKnights.Common.Physics.D2.Force.Generate(0, (vy < 0 ? factor : -factor) * Math.max(Math.abs(vy), Math.abs(fric)))
						);
					} else {
						vy = 0;
					}
					
					this.FuzzyKnights.Common.Component.Mutator.Physics.SetVelocity(
						entity,
						this.FuzzyKnights.Common.Physics.D2.Velocity.Generate(vx, vy)
					);
				}
			}

			x1 = this.FuzzyKnights.Common.Utility.Functions.Clamp(x1, 0, zone.Width);
			y1 = this.FuzzyKnights.Common.Utility.Functions.Clamp(y1, 0, zone.Height);

			if(entity instanceof this.FuzzyKnights.Common.Entity.Terrain.Terrain) {
				zone.UpdateTerrainMap(entity, x0, y0, x1, y1);
			} else {
				zone.UpdateEntityMap(entity, x0, y0, x1, y1);
			}
			this.FuzzyKnights.Common.Component.Mutator.Worlds.SetPoint(entity, x1, y1);
			this.FuzzyKnights.Common.Event.Spawn.EntityStateChangeEvent(entity, this.FuzzyKnights.Common.Component.Enum.ActionStateType.MOVEMENT);

			let neighbors = zone.Entities.GetNeighbors(x1, y1, 1),
				mask = this.FuzzyKnights.Common.Component.Mutator.Physics.GetCollisionMask(entity);

			neighbors.forEach(neighs => {
				neighs.Element.forEach(ent => {
					if(ent.UUID !== entity.UUID) {
						let eMask = this.FuzzyKnights.Common.Component.Mutator.Physics.GetCollisionMask(ent),
							ePos = this.FuzzyKnights.Common.Component.Mutator.Worlds.GetPoint(ent);

						if(mask.CheckCircleCollision(x1, y1, ePos.X, ePos.Y, eMask)) {
							this.FuzzyKnights.Common.Event.Spawn.EntityCollisionEvent(entity, ent);
						}
					}
				});
			});
		}
	}
	onEntityCollision(msg, collidor, collidee) {
		console.log(`[COLLISION EVENT]: Collidor -> Collidee`, collidor, collidee);

		//TODO Do real collision logic, instead of this fake shit because legit fuck physics lol
		this.FuzzyKnights.Common.Component.Mutator.Physics.GetKinematics(collidor).ResetAcceleration();
		this.FuzzyKnights.Common.Component.Mutator.Physics.GetKinetics(collidor).ResetForces();
		this.FuzzyKnights.Common.Component.Mutator.Physics.GetKinematics(collidee).ResetAcceleration();
		this.FuzzyKnights.Common.Component.Mutator.Physics.GetKinetics(collidee).ResetForces();

		let [ vx0, vy0 ] = this.FuzzyKnights.Common.Component.Mutator.Physics.GetVelocity(collidor).Get(),
			[ vx1, vy1 ] = this.FuzzyKnights.Common.Component.Mutator.Physics.GetVelocity(collidee).Get(),
			fudge = 1;
		
		this.FuzzyKnights.Common.Component.Mutator.Physics.SetVelocity(
			collidor,
			this.FuzzyKnights.Common.Physics.D2.Velocity.Generate(-vx0 / fudge, -vy0 / fudge)
		);
		this.FuzzyKnights.Common.Component.Mutator.Physics.SetVelocity(
			collidee,
			this.FuzzyKnights.Common.Physics.D2.Velocity.Generate(vx0 / fudge, vy0 / fudge)
		);
		
		this.FuzzyKnights.Common.Component.Mutator.Physics.AddForce(
			collidor,
			this.FuzzyKnights.Common.Physics.D2.Force.Generate(-vx0 * fudge, -vy0 * fudge)
		);
		this.FuzzyKnights.Common.Component.Mutator.Physics.AddForce(
			collidee,
			this.FuzzyKnights.Common.Physics.D2.Force.Generate(vx0 * fudge, vy0 * fudge)
		);
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