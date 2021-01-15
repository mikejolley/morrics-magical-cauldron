// Basic colors. Can also be bald (no hair).
export const hairColors = [
	'black',
	'gray',
	'platinum',
	'white',
	'dark blonde',
	'blonde',
	'bleach blonde',
	'dark red',
	'red',
	'light red',
	'brown',
	'auburn',
];

// @see https://preview.redd.it/51fh9i4c9q721.png?width=1128&format=png&auto=webp&s=e3be83a5ab34fe60ca870f03161b3b3f99866cba
// @see https://www.dandwiki.com/wiki/Random_Hair_and_Eye_Color_(DnD_Other)
export const eyeColors = [ 'amber', 'brown', 'hazel', 'green', 'blue', 'gray' ];
//const exoticEyeColors = [ ...eyeColors, 'yellow', 'aqua', 'red', 'purple' ];
export const skinColors = [
	'pale',
	'fair',
	'light',
	'light tan',
	'tan',
	'dark tan',
	'brown',
	'dark brown',
	'black',
	'gray',
	'dark',
];

const human = {
	id: 'human',
	singular: 'Human',
	plural: 'Human',
	adjective: 'Human',
	baseHeight: 4.67,
	heightModifier: '2d10',
	eyeColors,
	hairColors,
	skinColors,
};

const dwarf = {
	id: 'dwarf',
	singular: 'Dwarf',
	plural: 'Dwarves',
	adjective: 'Dwarven',
	baseHeight: 4,
	heightModifier: '2d4',
	eyeColors,
	hairColors,
	subraces: [
		{
			race: 'Hill Dwarf',
			baseHeight: 3.67,
		},
		{
			race: 'Mountain Dwarf',
			baseHeight: 4,
		},
		{
			race: 'Gray Dwarf',
			baseHeight: 4.5,
			hairColors: [ 'black', 'gray', 'platinum', 'white' ],
		},
	],
};

export const races = { dwarf, human };
