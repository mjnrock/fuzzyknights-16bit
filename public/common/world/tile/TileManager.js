import { GridXY } from "../../utility/GridXY.js";
import { Map } from "./Map.js";

class TileManager {
	constructor(fk) {
		this.FuzzyKnights = fk;
		this.Maps = new GridXY(5, 5, Map);
		
		this.MapLookup = {};
	}

	GetMaps() {
		return this.Maps;
	}
	SetMaps(maps) {
		this.Maps = maps;
		this.Maps.ForEach((p, map, t) => {
			this.MapLookup[map.UUID] = map;
		});

		return this;
	}

	FindMap(uuid) {
		return this.MapLookup[uuid];
	}

	GetMap(x, y) {
		return this.Maps.Get(x, y);
	}
	SetMap(x, y, map) {
		this.Maps.Set(x, y, map);
		this.MapLookup[map.UUID] = map;

		return this;
	}

	Tick(time) {
		this.Maps.ForEach((p, map, t) => {
			if(map && map.IsOccupied()) {
				map.Tick(time);
			}
		});
	}
}

export { TileManager };