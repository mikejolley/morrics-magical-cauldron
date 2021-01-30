import { getRaceProp } from '@shared/utils';
import InlineData from '../inline-data';
import AbilityList from './ability-list';
import TraitList from './trait-list';
import './style.scss';
import { alignments, ageDescriptors } from '@shared/data';
import Loading from '../loading';

const Character = ( { characterData, status, reroll, onRemove } ) => {
	if ( status === 'resolving' && ! characterData ) {
		return <Loading className="character-card" />;
	}
	if ( ! characterData ) {
		return null;
	}
	const {
		name,
		gender,
		age,
		weight,
		height,
		race,
		occupation,
		alignment,
		appearance,
		abilities,
	} = characterData;
	const alignmentData = alignments.find( ( { id } ) => id === alignment );
	return (
		<div className="character-card">
			{ onRemove && (
				<button className="character-card__delete" onClick={ onRemove }>
					Delete
				</button>
			) }
			<div className="section character-appearance">
				<hgroup>
					<h3>{ name }</h3>
					<h4>
						{ `${
							alignmentData?.description
						} :: ${ gender } ${ getRaceProp( race, 'singular' ) }` }
					</h4>
				</hgroup>
				<p>
					<InlineData
						value={ name }
						onClick={ () => reroll( 'name' ) }
					/>
					{ ` is ` }
					<InlineData
						value={ ageDescriptors[ age ] || 'an adult' }
						onClick={ () => reroll( 'age' ) }
					/>
					{ ` ` }
					<InlineData
						value={ occupation }
						onClick={ () => reroll( 'occupation' ) }
					/>
					{ ` who is ` }
					<InlineData
						value={ weight }
						onClick={ () => reroll( 'weight' ) }
					/>
					{ ` and stands ` }
					<InlineData
						value={ height }
						onClick={ () => reroll( 'height' ) }
						suffix=" tall."
					/>
				</p>
				<p>
					<InlineData
						value={ appearance }
						onClick={ () => reroll( 'appearance' ) }
					/>
				</p>
			</div>
			<div className="section">
				<AbilityList
					abilities={ abilities }
					characterAge={ age || 'adult' }
					onReroll={ () => reroll( 'abilities' ) }
				/>
			</div>
			<div className="section">
				<TraitList
					traits={ [
						{
							name: 'Features',
							data: characterData.feature,
							onReroll: () => reroll( 'feature' ),
							loading:
								status === 'resolving' &&
								characterData.feature === undefined,
						},
						{
							name: 'Plot Hook',
							data: characterData.plotHook,
							onReroll: () => reroll( 'plotHook' ),
							loading:
								status === 'resolving' &&
								characterData.plotHook === undefined,
						},
						{
							name: 'Personality',
							data: characterData.personality,
							onReroll: () => reroll( 'personality' ),
							loading:
								status === 'resolving' &&
								characterData.personality === undefined,
						},
						{
							name: 'Ideal',
							data: characterData.ideal,
							onReroll: () => reroll( 'ideal' ),
							loading:
								status === 'resolving' &&
								characterData.ideal === undefined,
						},
						{
							name: 'Bond',
							data: characterData.bond,
							onReroll: () => reroll( 'bond' ),
							loading:
								status === 'resolving' &&
								characterData.bond === undefined,
						},
						{
							name: 'Flaw',
							data: characterData.flaw,
							onReroll: () => reroll( 'flaw' ),
							loading:
								status === 'resolving' &&
								characterData.flaw === undefined,
						},
						{
							name: 'Voice',
							data: characterData.voice,
							onReroll: () => reroll( 'voice' ),
							loading:
								status === 'resolving' &&
								characterData.voice === undefined,
						},
					] }
				/>
			</div>
		</div>
	);
};
export default Character;
