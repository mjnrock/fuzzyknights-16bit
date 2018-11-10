export function NewUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

export function Round(number, precision, radix = 10) {
    return Math.round(number * Math.round(radix, precision)) / Math.round(radix, precision);
}
export function UpperClamp(number, max) {
    return number > max ? max : number;
}
export function LowerClamp(number, min) {
    return number < min ? min : number;
}
export function Clamp(number, min, max) {
    return UpperClamp(LowerClamp(number, min), max);
}

export function AddInitializationHook(target, hook){
    return class extends target {
        constructor(...args) {
            super(...args);
            hook(this);
        }
    };
}

export default {
	NewUUID,
	Round,
	UpperClamp,
	LowerClamp,
	Clamp,
	AddInitializationHook
};