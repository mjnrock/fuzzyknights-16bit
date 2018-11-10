const Bitwise = {
	Has: (base, flag) => (base & flag) === flag,
	Add: (base, ...flags) => {
		let mask = base;
		for(let i = 0; i < flags.length; i++) {
			mask = mask | flags[i];
		}
		
		return mask;
	},
	Remove: (base, ...flags) => {
		let mask = base;
		for(let i = 0; i < flags.length; i++) {
			mask = mask & ~flags[i];
		}
		
		return mask;
	}
};

export default Bitwise;