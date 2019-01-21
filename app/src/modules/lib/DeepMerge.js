export function IsMergeableObject(val) {
    let nonNullObject = val && typeof val === `object`;

    return nonNullObject
        && Object.prototype.toString.call(val) !== `[object RegExp]`
        && Object.prototype.toString.call(val) !== `[object Date]`;
}

export function EmptyTarget(val) {
    return Array.isArray(val) ? [] : {};
}

export function CloneIfNecessary(value, optionsArgument) {
	let clone = optionsArgument && optionsArgument.clone === true;
	
    return (clone && IsMergeableObject(value)) ? DeepMerge(EmptyTarget(value), value, optionsArgument) : value;
}

export function DefaultArrayMerge(target, source, optionsArgument) {
	let destination = target.slice();
	
    source.forEach((e, i) => {
        if(typeof destination[i] === `undefined`) {
            destination[i] = CloneIfNecessary(e, optionsArgument);
        } else if(IsMergeableObject(e)) {
            destination[i] = DeepMerge(target[i], e, optionsArgument);
        } else if(target.indexOf(e) === -1) {
            destination.push(CloneIfNecessary(e, optionsArgument));
        }
	});
	
    return destination;
}

export function MergeObject(target, source, optionsArgument) {
	let destination = {};
	
    if(IsMergeableObject(target)) {
        Object.keys(target).forEach((key) => {
            destination[key] = CloneIfNecessary(target[key], optionsArgument);
        });
	}
	
    Object.keys(source).forEach((key) => {
        if(!IsMergeableObject(source[key]) || !target[key]) {
            destination[key] = CloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = DeepMerge(target[key], source[key], optionsArgument);
        }
	});
	
    return destination;
}

export function DeepMerge(target, source, optionsArgument) {
    let array = Array.isArray(source);
    let options = optionsArgument || { arrayMerge: DefaultArrayMerge }
    let arrayMerge = options.arrayMerge || DefaultArrayMerge

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : CloneIfNecessary(source, optionsArgument);
    } else {
        return MergeObject(target, source, optionsArgument);
    }
}
DeepMerge.All = (array, optionsArgument) => {
    if(!Array.isArray(array) || array.length < 2) {
        throw new Error(`First argument should be an array with at least two elements`);
    }

    return array.reduce((prev, next) => {
        return DeepMerge(prev, next, optionsArgument);
    });
}

export default DeepMerge;