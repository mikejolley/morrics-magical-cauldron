/**
 * External dependencies
 */
import randomItem from 'random-item';

/**
 * Internal dependencies
 */
import { tavernNames, tavernTraits } from 'shared/data';
import { roll, parseContentTemplate } from 'shared/utils';

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

export const generateTrait = () => {
	const templates = tavernTraits.templates;

	if ( ! templates ) {
		return '';
	}

	const template = randomItem( templates );

	return parseContentTemplate( template, {
		money: randomItem( tavernTraits.money ),
		beverages: randomItem( tavernTraits.beverages ),
		attitude: randomItem( tavernTraits.attitude ),
		staff: randomItem( tavernTraits.staff ),
		appearance: randomItem( tavernTraits.appearance ),
	} );
};

export const randomSocialClass = () => {
	return randomItem( [
		'lower',
		'lower',
		'middle',
		'middle',
		'middle',
		'upper',
	] );
};

export const generateLifestyle = ( socialClass ) => {
	if ( socialClass === 'lower' ) {
		return randomItem( [ 'wretched', 'squalid', 'poor' ] );
	}
	if ( socialClass === 'middle' ) {
		return randomItem( [ 'modest', 'comfortable' ] );
	}
	return randomItem( [ 'wealthy', 'aristocratic' ] );
};

export const generateRooms = ( socialClass ) => {
	let dice = 'd6-1';

	if ( socialClass === 'lower' ) {
		dice = 'd2-1';
	} else if ( socialClass === 'middle' ) {
		dice = 'd4-1';
	}
	const single = roll( dice );
	const double = roll( dice );

	if ( ! single && ! double ) {
		return `are no rooms`;
	}

	if ( ! single || ! double ) {
		return single + double === 1
			? `is one room`
			: `are ${ single + double } rooms`;
	}

	return (
		( single === 1
			? `is one single room`
			: `are ${ single } single rooms` ) +
		' and ' +
		( double === 1 ? `one double room` : `${ double } double rooms` )
	);
};
