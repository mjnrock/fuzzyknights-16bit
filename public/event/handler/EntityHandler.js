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
				y1 = pos1.Y,
				dx = x0 - x1,
				dy = y0 - y1,
				v = this.FuzzyKnights.Component.Mutator.Physics.GetVelocity(entity),
				[ vx, vy ] = v.Get();

				
			if(!zone.Terrain.IsWithinBounds(x1, y1)) {
				this.FuzzyKnights.Component.Mutator.Physics.GetKinematics(entity).ResetKinematics();
				this.FuzzyKnights.Component.Mutator.Physics.GetKinetics(entity).ResetForces();

				if(Math.abs(dx) < Math.abs(dy)) {
					vy = -vy;
				} else if(Math.abs(dx) > Math.abs(dy)) {
					vx = -vx;
				} else {
					vx = -vx;
					vy = -vy;
				}

				this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
					entity,
					this.FuzzyKnights.Physics.D2.Velocity.Generate(vx, vy)
				);
			} else {
				let terrain = zone.Terrain.Get(x0, y0);

				//TODO Technically this works, but the numbers need to be fitted better and change curves optimized
				//TODO Maybe fudge this by only applying frictional forces if Velocity > FrictionThreshold
				if(terrain instanceof this.FuzzyKnights.Entity.Terrain.Terrain) {
					let fric = this.FuzzyKnights.Component.Mutator.TerrainInfo.GetNavigabilityConstraint(terrain);

					if(Math.abs(vx) > 0.1) {
						this.FuzzyKnights.Component.Mutator.Physics.AddForce(
							entity,
							this.FuzzyKnights.Physics.D2.Force.Generate(vx < 0 ? 1 : -1 * Math.max(Math.abs(vx), Math.abs(fric)), 0)
						);
					} else {
						vx = 0;
					}

					if(Math.abs(vy) > 0.1) {
						this.FuzzyKnights.Component.Mutator.Physics.AddForce(
							entity,
							this.FuzzyKnights.Physics.D2.Force.Generate(0, vy < 0 ? 1 : -1 * Math.max(Math.abs(vy), Math.abs(fric)))
						);
					} else {
						vy = 0;
					}
					
					this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
						entity,
						this.FuzzyKnights.Physics.D2.Velocity.Generate(vx, vy)
					);
				}
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
					if(ent.UUID !== entity.UUID) {
						let eMask = this.FuzzyKnights.Component.Mutator.Physics.GetCollisionMask(ent),
							ePos = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(ent);

						if(mask.CheckCircleCollision(x1, y1, ePos.X, ePos.Y, eMask)) {
							this.FuzzyKnights.Event.Spawn.EntityCollisionEvent(entity, ent);
						}
					}
				});
			});
		}
	}
	onEntityCollision(msg, collidor, collidee) {
		console.log(`[COLLISION EVENT]: Collidor -> Collidee`, collidor, collidee);

		//TODO Do real collision logic, instead of this fake shit because legit fuck physics lol
		this.FuzzyKnights.Component.Mutator.Physics.GetKinematics(collidor).ResetAcceleration();
		this.FuzzyKnights.Component.Mutator.Physics.GetKinetics(collidor).ResetForces();
		this.FuzzyKnights.Component.Mutator.Physics.GetKinematics(collidee).ResetAcceleration();
		this.FuzzyKnights.Component.Mutator.Physics.GetKinetics(collidee).ResetForces();

		let [ vx0, vy0 ] = this.FuzzyKnights.Component.Mutator.Physics.GetVelocity(collidor).Get(),
			[ vx1, vy1 ] = this.FuzzyKnights.Component.Mutator.Physics.GetVelocity(collidee).Get(),
			fudge = 1.75;
		
		this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
			collidor,
			this.FuzzyKnights.Physics.D2.Velocity.Generate(-vx0 / fudge, -vy0 / fudge)
		);
		this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
			collidee,
			this.FuzzyKnights.Physics.D2.Velocity.Generate(vx0 / fudge, vy0 / fudge)
		);
		
		this.FuzzyKnights.Component.Mutator.Physics.AddForce(
			collidor,
			this.FuzzyKnights.Physics.D2.Force.Generate(-vx0 * fudge, -vy0 * fudge)
		);
		this.FuzzyKnights.Component.Mutator.Physics.AddForce(
			collidee,
			this.FuzzyKnights.Physics.D2.Force.Generate(vx0 * fudge, vy0 * fudge)
		);


			// mass0 = this.FuzzyKnights.Component.Mutator.Physics.GetMass(collidor),
			// mass1 = this.FuzzyKnights.Component.Mutator.Physics.GetMass(collidor),
			// [ px0, py0 ] = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(collidor).Get(),
			// [ px1, py1 ] = this.FuzzyKnights.Component.Mutator.Worlds.GetPoint(collidee).Get(),
			// fvx0 = 0, fvy0 = 0, fvx1 = 0, fvy1 = 0;

			// {
			// 	//	Collidor to Collidee
			// 	let dpx = px0 - px1,
			// 		dpy = py0 - py1,
			// 		ph = Math.hypot(dpx, dpy),
			// 		rdx = dpx ** 2 / ph ** 2,
			// 		rdy = dpy ** 2 / ph ** 2,
			// 		lvx = vx0,
			// 		lvy = vy0,
			// 		lvh = Math.hypot(lvx, lvy);
	
			// 	let tvx = lvh * rdx,
			// 		tvy = lvh * rdy;
	
			// 	fvx1 += tvx;
			// 	fvy1 += tvy;

			// 	fvx0 += lvx - tvx;
			// 	fvy0 += lvy - tvy;
				
			// 	// if(Math.abs(dpx) < Math.abs(dpy)) {
			// 	// 	fvy0 = -fvy0;
			// 	// } else if(Math.abs(dpx) > Math.abs(dpy)) {
			// 	// 	fvx0 = -fvx0;
			// 	// } else {
			// 	// 	fvx0 = -fvx0;
			// 	// 	fvy0 = -fvy0;
			// 	// }
			// }

			// {
			// 	//	Collidee to Collidor
			// 	let dpx = px1 - px0,
			// 		dpy = py1 - py0,
			// 		ph = Math.hypot(dpy, dpx),
			// 		rdx = dpx ** 2 / ph ** 2,
			// 		rdy = dpy ** 2 / ph ** 2,
			// 		lvx = vx1,
			// 		lvy = vy1;
	
			// 	let tvx = lvx * rdx,
			// 		tvy = lvy * rdy;
				
			// 	if(Math.abs(dpx) < Math.abs(dpy)) {
			// 		lvy = -lvy;
			// 	} else if(Math.abs(dpx) > Math.abs(dpy)) {
			// 		lvx = -lvx;
			// 	} else {
			// 		lvx = -lvx;
			// 		lvy = -lvy;
			// 	}
	
			// 	fvx0 += tvx;
			// 	fvy0 += tvy;
			// 	fvx1 += lvx - tvx;
			// 	fvy1 += lvy - tvy;
			// }

		// let fudge = 1.1;
		// this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
		// 	collidor,
		// 	this.FuzzyKnights.Physics.D2.Velocity.Generate(fvx0 * fudge, fvy0 * fudge)
		// );
		// this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
		// 	collidee,
		// 	this.FuzzyKnights.Physics.D2.Velocity.Generate(fvx1 * fudge, fvy1 * fudge)
		// );

		// let dpx = px0 - px1,
		// 	dpy = py0 - py1,
		// 	ph = Math.hypot(dpy, dpx),
		// 	rdx = dpx ** 2 / ph ** 2,
		// 	rdy = dpy ** 2 / ph ** 2,
		// 	vh0 = Math.sqrt(vx0 ** 2 + vy0 ** 2),
		// 	vh1 = Math.sqrt(vx1 ** 2 + vy1 ** 2);

		// console.log(`[COLLIDOR]\n------------\nVx: ${ vx0 }\nVy: ${ vy0 }\nVh: ${ vh0 }`);
		// console.log(`[COLLDEE]\n------------\nVx: ${ vx1 }\nVy: ${ vy1 }\nVh: ${ vh1 }`);
		// console.log(`[POSITION]\n------------\n𐤃x: ${ dpx }\n𐤃y: ${ dpy }\nh: ${ ph }\nrdx: ${ rdx }\nrdy: ${ rdy }`);
		// if(ph !== 0) {
		// 	let tvx1 = (vh0 * rdx),
		// 		tvy1 = (vh0 * rdy);

		// 	let tvx0 = (vh1 * rdx),
		// 		tvy0 = (vh1 * rdy);

		// 	if(Math.abs(dpx) < Math.abs(dpy)) {
		// 		vy0 = -vy0;
		// 	} else if(Math.abs(dpx) > Math.abs(dpy)) {
		// 		vx0 = -vx0;
		// 	} else {
		// 		vx0 = -vx0;
		// 		vy0 = -vy0;
		// 	}

		// 	let rvx1 = (vx0) - tvx0,
		// 		rvy1 = (vy0) - tvy0;
				
		// 	let rvx0 = (vx1) - tvx1,
		// 		rvy0 = (vy1) - tvy1;

		// 	this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
		// 		collidee,
		// 		this.FuzzyKnights.Physics.D2.Velocity.Generate(rvx1 + tvx1, rvy1 + tvy1)
		// 	);
		// 	this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
		// 		collidor,
		// 		this.FuzzyKnights.Physics.D2.Velocity.Generate(rvx0 + tvx0, rvy0 + tvy0)
		// 	);

			// let vtxEe = vxOr0 * rdx,
			// vtyEe = vyOr0 * rdy,
			// vrxOr = vxOr0 - vtxEe,
			// vryOr = vyOr0 - vtyEe;
			
			// let vtxOr = vxEe0 * rdx,
			// vtyOr = vyEe0 * rdy,
			// vrxEe = vxEe0 - vtxOr,
			// vryEe = vyEe0 - vtyOr;			

			// if(Math.abs(dx) < Math.abs(dy)) {
			// 	vryOr = -vryOr;
			// 	vryEe = -vryEe;
			// } else if(Math.abs(dx) > Math.abs(dy)) {
			// 	vrxOr = -vrxOr;
			// 	vrxEe = -vrxEe;
			// } else {
			// 	vrxOr = -vrxOr;
			// 	vryOr = -vryOr;
			// 	vrxEe = -vrxEe;
			// 	vryEe = -vryEe;
			// }

			// this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
			// 	collidee,
			// 	this.FuzzyKnights.Physics.D2.Velocity.Generate(vtxEe + vrxEe, vtyEe + vryEe)
			// );
			// this.FuzzyKnights.Component.Mutator.Physics.SetVelocity(
			// 	collidor,
			// 	this.FuzzyKnights.Physics.D2.Velocity.Generate(vtxOr + vrxOr, vtyOr + vryOr)
			// );
		// }
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