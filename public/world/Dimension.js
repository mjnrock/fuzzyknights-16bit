import { Realm } from "./Realm.js";
import { NewUUID } from "./../utility/Functions.js";

class Dimension {
	constructor(realm = null, maps = []) {
		this.Realm = realm || new Realm();

		this.Lookup = {};
		maps.forEach(map => {
			this.Add(map);
		});

		this.UUID = NewUUID();
	}

	GetRealm() {
		return this.Realm;
	}
	SetRealm(realm) {
		this.Realm = realm;

		return this;
	}

	Get(uuid) {
		return this.Lookup[uuid];
	}
	Add(map) {
		this.Lookup[map.UUID] = map;

		return this;
	}

	Remove(uuid) {
		delete this.Lookup[uuid];

		return this;
	}
}

export { Dimension };