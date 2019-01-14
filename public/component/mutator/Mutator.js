class Mutator {
	constructor(fk, type) {
		this.FuzzyKnights = fk;
		this.Type = type;
	}

	HasComponent(entity) {
		let comp = entity.Components.filter((v) => v.Type === this.Type);

		return comp[0] ? true : false;
	}
	GetComponent(entity) {
		let comp = entity.Components.filter((v) => v.Type === this.Type);

		return comp[0] ? comp[0] : comp;
	}

	Tick(time, entity) {
		//	NOOP
	}
}

export { Mutator };