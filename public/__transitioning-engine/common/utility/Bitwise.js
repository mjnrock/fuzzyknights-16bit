/**
 * Operator Reminder:
 * 	| :: OR
 * 	& :: AND
 *  ~ :: Negation
 *  ~~ :: Complement [Nuances: Simple REMOVES anything right of a decimal (e.g. positive #'s round down, negative #'s round up); Always returns a number (e.g. returns 0 in NaN cases)]
 *  base |= flag :: ADD
 *  base &= ~flag :: REMOVE
 *  base & flag === flag :: HAS
 */

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