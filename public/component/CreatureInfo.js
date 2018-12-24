import EnumComponentType from "./enum/ComponentType.js";

import { Component } from "./Component.js";

class CreatureInfo extends Component {
	constructor(ct, speed, fr) {
		super(EnumComponentType.CREATURE_INFO);

		this.CreatureType = ct;
		this.Speed = speed;
		this.FollowRange = fr;
	}
}

export { CreatureInfo };