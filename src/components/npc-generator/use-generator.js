/**
 * External dependencies
 */
import randomItem from 'random-item';

/**
 * Internal dependencies
 */
import {
	matchingItems,
	randomMultipleAlignments,
	generateName,
	rollAbilities,
	roll,
} from './utils';
import {
	races,
	hairColors,
	eyeColors,
	skinColors,
	ageDescriptors,
	skinDescriptors,
	eyeDescriptors,
	weightDescriptors,
	hairDescriptors,
	alignments,
	occupations,
	playerNames,
} from '@shared/data';

const randomRace = () => randomItem( Object.keys( races ) );
const randomAlignment = () => randomItem( alignments ).id;
const randomGender = () =>
	randomItem( [ 'male', 'female', 'male', 'female', 'nonbinary' ] );
const randomOccupation = ( alignment ) =>
	randomItem(
		randomMultipleAlignments( occupations, alignment ).occupations
	);

export const useGenerator = ( sourceData ) => {
	const callbacks = ( {
		race: selectedRace,
		alignment: selectedAlignment,
		gender: selectedGender,
		occupation: selectedOccupation,
	} ) => {
		/**
		 * Randomizes the incoming options if missing or blank -- these options
		 * are generated first since other data may require them.
		 *
		 * Because other generators rely on these, they cannot be rerolled individually.
		 */
		const race = selectedRace || randomRace();
		const alignment = selectedAlignment || randomAlignment();
		const gender = selectedGender || randomGender();

		/**
		 * Lookup data objects from the selected or random ID.
		 */
		const raceData = races[ race ];
		const alignmentData = alignments.find( ( { id } ) => id === alignment );

		/**
		 * Return the list of callbacks, indexed by data name.
		 */
		return {
			name: () =>
				generateName(
					playerNames,
					race,
					gender === 'nonbinary'
						? randomItem( [ 'male', 'female' ] )
						: gender
				),
			gender: () => gender,
			race: () => race,
			occupation: () =>
				selectedOccupation || randomOccupation( alignment ),
			alignment: () => alignmentData.description,
			age: () => randomItem( ageDescriptors ),
			height: () => {
				const base = raceData.baseHeight || 4.67;
				const modifier = raceData.heightModifier || '2d10';
				const heightInFeet = base + roll.roll( modifier ).result / 12;
				const feet = Math.floor( heightInFeet );
				const inches = Math.round( ( heightInFeet - feet ) * 12 );
				return feet + "'" + inches + '"';
			},
			weight: () => randomItem( weightDescriptors ),
			appearance: () => {
				const eyeColor = randomItem( raceData.eyeColors || eyeColors );
				const hairColor = randomItem(
					raceData.hairColors || hairColors
				);
				const skinColor = randomItem(
					raceData.skinColors || skinColors
				);
				const eyeDescriptor = randomItem( eyeDescriptors );
				const skinDescriptor = randomItem( skinDescriptors );
				const hairDescriptor = randomItem( hairDescriptors );
				return `Their skin is ${ skinColor } and ${ skinDescriptor }, their eyes are ${ eyeColor } and ${ eyeDescriptor }, and they have ${ hairColor } hair that is ${ hairDescriptor }.`;
			},
			abilities: () => rollAbilities(),
			clothing: () =>
				randomItem(
					matchingItems( sourceData, 'clothing', alignmentData )
				),
			distinguishingMark: () =>
				randomItem(
					matchingItems( sourceData, 'mark', alignmentData )
				),
			voice: () =>
				randomItem(
					matchingItems( sourceData, 'voice', alignmentData )
				),
			plotHook: () =>
				randomItem(
					matchingItems( sourceData, 'plotHook', alignmentData )
				),
			personality: () =>
				randomItem(
					matchingItems( sourceData, 'trait', alignmentData )
				),
			ideal: () =>
				randomItem(
					matchingItems( sourceData, 'ideal', alignmentData )
				),
			bond: () =>
				randomItem(
					matchingItems( sourceData, 'bond', alignmentData )
				),
			flaw: () =>
				randomItem(
					matchingItems( sourceData, 'flaw', alignmentData )
				),
		};
	};

	return callbacks;
};
