import EnumComponentType from "../enum/ComponentType.js";
import EnumTerrainType from "../enum/TerrainType.js";

import { Mutator } from "./Mutator.js";

class TerrainInfo extends Mutator {
	constructor(fk) {
		super(fk, EnumComponentType.TERRAIN_INFO);
	}

	GetTerrainType(entity) {
		return this.GetComponent(entity).TerrainType;
	}
	SetTerrainType(entity, tt) {
		this.GetComponent(entity).TerrainType = tt;

		return this;
	}

	GetNavigability(entity) {
		return this.GetComponent(entity).Navigability;
	}
	SetNavigability(entity, nav) {
		this.GetComponent(entity).Navigability = nav;

		return this;
	}

	GetNavigabilityConstraint(entity) {
		return this.FuzzyKnights.Component.Enum.NavigabilityType.GetConstraint(this.GetNavigability(entity));
	}

	GetMeta(entity) {
		return this.GetComponent(entity).Meta;
	}
	SetMeta(entity, meta) {
		this.GetComponent(entity).Meta = meta;

		return this;
	}
}

export { TerrainInfo };