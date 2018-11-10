class Mutator {
	constructor(fk) {
		this.FuzzyKnights = fk;
	}

	HasComponent(entity, type) {
		let comp = entity.Components.filter((v) => v.Type === type);

		return comp[0] ? true : false;
	}
	GetComponent(entity, type) {
		let comp = entity.Components.filter((v) => v.Type === type);

		return comp[0] ? comp[0] : comp;
	}
}

export { Mutator };