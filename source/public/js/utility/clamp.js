export default function (input, min, max) {
	if (min > max) throw `min: ${min} must not be greater than max: ${max}`;
	else if (input < min) return min;
	else if (input > max) return max;
	else return input;
};