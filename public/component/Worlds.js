import { Component } from "./Component.js";

import EnumComponentType from "./enum/ComponentType.js";

class Worlds extends Component {
	constructor() {
		super(EnumComponentType.WORLDS);
	}
}

export { Worlds };