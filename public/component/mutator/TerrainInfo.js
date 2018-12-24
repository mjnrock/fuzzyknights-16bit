import EnumComponentType from "../enum/ComponentType.js";
import EnumTerrainType from "../enum/TerrainType.js";

import { Mutator } from "./Mutator.js";

class TerrainInfo extends Mutator {
	constructor(fk) {
		super(fk);
	}

	GetComponent(entity) {
		let comp = super.GetComponent(entity, EnumComponentType.TERRAIN_INFO);

		return comp;
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

	GetMeta(entity) {
		return this.GetComponent(entity).Meta;
	}
	SetMeta(entity, meta) {
		this.GetComponent(entity).Meta = meta;

		return this;
	}
}

export { TerrainInfo };