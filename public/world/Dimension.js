import { Realm } from "./Realm.js";
import { NewUUID } from "./../utility/Functions.js";

class Dimension {
	constructor(realm = null, zones = []) {
		this.Realm = realm || new Realm();

		this.Lookup = {};
		zones.forEach(zone => {
			this.Add(zone);
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
	Add(zone) {
		this.Lookup[zone.UUID] = zone;

		return this;
	}

	Remove(uuid) {
		delete this.Lookup[uuid];

		return this;
	}

	static Generate(realm = null, zones = []) {
		return new Dimension(realm, zones);
	}
}

export { Dimension };