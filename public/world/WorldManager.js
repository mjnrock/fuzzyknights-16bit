class WorldManager {
	constructor(fk) {
		this.FuzzyKnights = fk;

		this.Players = [];
		this.Dimensions = [];
	}

	GetPlayer(uuid) {
		return this.Players.filter(p => p.UUID === uuid)[0] || false;
	}
	AddPlayer(dim) {
		this.Players.push(dim);

		return this;
	}
	RemovePlayer(uuid) {
		this.Players = this.Players.filter(d => d.UUID !== uuid);

		return this;
	}

	GetDimension(uuid) {
		return this.Dimensions.filter(d => d.UUID === uuid)[0] || false;
	}
	AddDimension(dim) {
		this.Dimensions.push(dim);

		return this;
	}
	RemoveDimension(uuid) {
		this.Dimensions = this.Dimensions.filter(d => d.UUID !== uuid);

		return this;
	}

	GetZone(zoneUUID, dimensionUUID) {
		return this.GetDimension(dimensionUUID).Get(zoneUUID);
	}

	ReadPortal(portal) {
		//TODO Read portal and return info below
		// return {
		// 	Head: {
		// 		Zone: HEAD_ZONE,
		// 		Position: {
		// 			X: PORTAL_X,
		// 			Y: PORTAL_Y
		// 		}
		// 	},
		// 	Tail: {
		// 		Zone: TAIL_ZONE,
		// 		Position: {
		// 			X: PORTAL_X,
		// 			Y: PORTAL_Y
		// 		}
		// 	}
		// };
	}
	//TODO Move the Entity through the portal, Add "ActivationSide: HEAD | TAIL" to send to the opposite
	// ActivatePortal(portal, entity) {
		// Affect components to move the Entity from one Zone:Position to another Zone:Position
		// Read HEAD or TAIL flag on Portal
	// }

	//* This .TICK() decides how ALL Zones will decide if they do/not invoke their own .TICK()
	Tick(time) {
		this.Players.forEach(player => {
			let zone = this.FuzzyKnights.Component.Mutator.Worlds.GetZone(player.GetEntity());

			if(zone) {
				zone.Tick(time, player.GetEntity());
			}
		});
	}
}

export { WorldManager };