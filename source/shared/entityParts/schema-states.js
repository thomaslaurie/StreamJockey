//TODO Make into class with validated properties.
//TODO//OLD schema property states //TODO could these be static on sj.Entity and called via this.x ?

export const unused = {
	in: false,
	out: false,
	check: 0,
};
export const optional = {
	in: true,
	out: true,
	check: 1,
};
export const required = {
	in: true,
	out: true,
	check: 2,
};
export const auto = {
	in: false,
	out: true,
	check: 0,
};
