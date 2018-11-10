const AttributeModifierType = {
	GENERIC:		1,
	INHERENT:		2,
	EQUIPMENT:		3,
	ITEM:			4,
	BUFF:			5,
	DEBUFF:			6
};

AttributeModifierType.Lookup = function(value) {
	for(let key in AttributeType) {
		if(AttributeType[key] === +value) {
			return key;
		}
	}

	return false;
};

export default AttributeModifierType;