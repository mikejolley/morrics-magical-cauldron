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
	'copper red',
	'orange',
	'pink',
	'blue',
];

// @see https://preview.redd.it/51fh9i4c9q721.png?width=1128&format=png&auto=webp&s=e3be83a5ab34fe60ca870f03161b3b3f99866cba
// @see https://www.dandwiki.com/wiki/Random_Hair_and_Eye_Color_(DnD_Other)
export const eyeColors = [ 'amber', 'brown', 'hazel', 'green', 'blue', 'gray' ];
const exoticEyeColors = [
	...eyeColors,
	'yellow',
	'aqua',
	'red',
	'purple',
	'emerald green',
];
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

const dragonborn = {
	id: 'dragonborn',
	singular: 'Dragonborn',
	plural: 'Dragonborn',
	adjective: 'Dragonborn',
	baseHeight: 5.5,
	heightModifier: '2d8',
	eyeColors: [
		'red',
		'gold',
		'orange',
		'crimson',
		'yellow',
		'scarlet',
		'bronze',
		'ocher',
		'black',
	],
	hairColors: [
		'thick, ropy, scarlet',
		'thick, ropy, gold',
		'thick, ropy, rust',
		'thick, ropy, ocher',
		'thick, ropy, bronze',
		'thick, ropy, brown',
	],
	skinColors: [
		'scaly, scarlet',
		'scaly, gold',
		'scaly, rust',
		'scaly, ocher',
		'scaly, bronze',
		'scaly, brown',
	],
};

const elf = {
	id: 'elf',
	singular: 'Elf',
	plural: 'Elves',
	adjective: 'Elvern',
	baseHeight: 5.5,
	heightModifier: '2d10',
	exoticEyeColors,
	hairColors,
	skinColors,
};

const gnome = {
	id: 'gnome',
	singular: 'Gnome',
	plural: 'Gnomes',
	adjective: 'Gnome',
	baseHeight: 2.916,
	heightModifier: '2d4',
	eyeColors,
	hairColors,
	skinColors,
};

const halfElf = {
	id: 'halfElf',
	singular: 'Half-Elf',
	plural: 'Half-Elves',
	adjective: 'Half-Elvern',
	baseHeight: 4.75,
	heightModifier: '2d8',
	eyeColors,
	hairColors,
	skinColors,
};

const halfOrc = {
	id: 'halfOrc',
	singular: 'Half-Orc',
	plural: 'Half-Orcs',
	adjective: 'Half-Orcs',
	baseHeight: 4.833,
	heightModifier: '2d10',
	eyeColors: [ 'green', 'yellow', 'black' ],
	hairColors: [ 'black', 'grey' ],
	skinColors: [
		'greenish',
		'green',
		'pale green',
		'grey',
		'brown',
		'purplish grey',
	],
};

const halfling = {
	id: 'halfling',
	singular: 'Halfling',
	plural: 'Halflings',
	adjective: 'Halfling',
	baseHeight: 2.583,
	heightModifier: '2d4',
	eyeColors,
	hairColors,
	skinColors,
};

const tiefling = {
	id: 'tiefling',
	singular: 'Tiefling',
	plural: 'Tieflings',
	adjective: 'Tiefling',
	baseHeight: 4.75,
	heightModifier: '2d8',
	eyeColors: exoticEyeColors,
	hairColors: [
		'red',
		'blonde',
		'brown',
		'dark blue',
		'blue',
		'purple',
		'pink',
	],
	skinColors: [
		'brick red',
		'pale brown',
		'brown',
		'dark brown',
		'ruddy',
		'red',
		'crimson',
		'purple',
	],
};

export const races = {
	dwarf,
	human,
	dragonborn,
	elf,
	gnome,
	halfElf,
	halfOrc,
	halfling,
	tiefling,
};
