import { Component } from "/engine/common/component/Component.js";

import EnumComponentType from "./enum/ComponentType.js";

class CreatureInfo extends Component {
	constructor(ct, speed, fr) {
		super(EnumComponentType.CREATURE_INFO);

		this.CreatureType = ct;
		this.Speed = speed;
		this.FollowRange = fr;
	}
}

export { CreatureInfo };