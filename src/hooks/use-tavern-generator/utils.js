/**
 * External dependencies
 */
import randomItem from 'random-item';

/**
 * Internal dependencies
 */
import { tavernNames } from 'shared/data';
import { parseContentTemplate } from 'shared/utils';

/**
 * Get a tavern name.
 *
 * @return {string} A generated name.
 */
export const generateName = () => {
	const templates = tavernNames.templates;

	if ( ! templates ) {
		return '';
	}

	const template = randomItem( templates );
	const creature = randomItem( tavernNames.creatures );
	const creature2 = randomItem(
		tavernNames.creatures.filter( ( c ) => c !== creature )
	);

	return parseContentTemplate( template, {
		prefix: randomItem( tavernNames.prefix ),
		suffix: randomItem( tavernNames.suffix ),
		adjectives: randomItem( tavernNames.adjectives ),
		adverbs: randomItem( tavernNames.adverbs ),
		items: randomItem( tavernNames.items ),
		creatures: creature,
		creatures2: creature2,
		bodyParts: randomItem( tavernNames.bodyParts ),
		people: randomItem( tavernNames.people ),
	} );
};
