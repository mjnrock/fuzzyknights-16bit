import EnumEntityType from "./../../enum/bitwise/EntityType.js";
import Components from "./../../component/package.js";
import { Entity } from "./../Entity.js";

class Creature extends Entity {
	constructor(components = []) {
		super(EnumEntityType.CREATURE, components);

		this.Components = [
			...this.Components,
			new Components.Attributes(),
			new Components.Resources(),
			new Components.Maps(Components.Enum.MapType.TILE, 0, 0)
		];
	}

	Tick(time) {
		super.Tick(time);
		Components.Mutator.Maps.CalcPosition(this, time);

		// let comp = Components.Mutator.Maps.GetComponent(this);
		// console.log(comp.ActiveMap.Position);
		// console.log(Entity.FuzzyKnights.World.MapManager.FindMap(comp.ActiveMap.MapIdentifier));
	}
}

export { Creature };