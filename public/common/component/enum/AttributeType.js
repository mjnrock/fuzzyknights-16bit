const AttributeType = {
	MIGHT:			1,		//	PHYSICAL ATTACK
	TOUGHNESS:		2,		//	PHYSICAL DEFENSE
	INTELLECT:		3,		//	MAGICAL ATTACK
	WISDOM:			4,		//	MAGICAL DEFENSE

	VITALITY:		5,		//	HEALTH
	ACCURACY:		6,		//	HIT CHANCE
	PRECISION:		7,		//	CRIT CHANCE
	POTENCY:		8,		//	CRIT DAMAGE

	SPEED:			9		//	INITIATIVE
};

AttributeType.Lookup = function(value) {
	for(let key in AttributeType) {
		if(AttributeType[key] === +value) {
			return key;
		}
	}

	return false;
};

export default AttributeType;