// List of content types users can submit to the site.
export const npcContentTypes = {
	name: {
		name: 'Character Name',
		example: 'Morric Copperhammer',
		description: 'Full name for a character.',
	},
	feature: {
		name: 'Distinguishing Features',
		example: 'They have a wooden leg.',
		description:
			'A distinguishing feature of the character that is not the norm and sets them apart from others.',
	},
	trait: {
		name: 'Personality Traits',
		example: 'Cheerful, but annoyingly so.',
		description:
			'Traits are how others are likely to perceive this character.',
	},
	ideal: {
		name: 'Ideal',
		example: 'Believes everyone deserves a second chance.',
		description: 'Ideals shape how this character perceives the world.',
	},
	bond: {
		name: 'Bond',
		example: 'Their lifelong friend, Dave.',
		description: 'Bonds are things that motivate this character.',
	},
	flaw: {
		name: 'Flaw',
		example: 'Cannot be trusted.',
		description:
			'Flaws are things this character does that can get them into trouble.',
	},
	voice: {
		name: 'Voice/Accent',
		example: 'Speaks with a Northern accent.',
		description: 'How this character speaks.',
	},
	plotHook: {
		name: 'Plot Hook',
		example: 'They need someone to fetch an important item.',
		description:
			'Something interesting that this character is doing, or a quest they are offering, that can influence the plot.',
	},
};

export const tavernContentTypes = {
	name: {
		name: 'Tavern Name',
		example: 'The Mouldy Bun Tavern',
		description: 'Name of a Tavern or Inn.',
	},
	description: {
		name: 'Appearance',
		example:
			'A wooden building in disrepair. Inside, wooden boxes are used as bar stools and there are no tables.',
		description: 'A description of the tavern.',
	},
	drink: {
		name: 'Signature Drink',
		example:
			'Goblin Spit - Whiskey and gin mixed with a super secret ingredient.',
		description: 'Name and description of a signature drink.',
	},
	patrons: {
		name: 'Patrons',
		example:
			'There is only one person in the tavern. They are asleep in the corner surrounded by empty whisky glasses.',
		description: 'A description of the folks inside the tavern.',
	},
};
