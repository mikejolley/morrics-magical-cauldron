import { getRaceProp } from '@shared/utils';
import InlineData from '../inline-data';
import AbilityList from './ability-list';
import TraitList from './trait-list';
import './style.scss';
import { alignments } from '@shared/data';

const Character = ( { characterData, onClickData, onRemove } ) => {
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
						onClick={ () => onClickData( 'name' ) }
					/>
					{ ` is ` }
					<InlineData
						value={ age }
						onClick={ () => onClickData( 'age' ) }
					/>
					{ ` ` }
					<InlineData
						value={ occupation }
						onClick={ () => onClickData( 'occupation' ) }
					/>
					{ ` who is ` }
					<InlineData
						value={ weight }
						onClick={ () => onClickData( 'weight' ) }
					/>
					{ ` and stands ` }
					<InlineData
						value={ height }
						onClick={ () => onClickData( 'height' ) }
						suffix=" tall."
					/>
				</p>
				<p>
					<InlineData
						value={ appearance }
						onClick={ () => onClickData( 'appearance' ) }
					/>
				</p>
				<p>
					<InlineData
						value={ characterData.clothing?.description }
						author={ characterData.clothing?.author }
						onClick={ () => onClickData( 'clothing' ) }
					/>
				</p>
				<p>
					<InlineData
						value={ characterData.distinguishingMark?.description }
						author={ characterData.distinguishingMark?.author }
						onClick={ () => onClickData( 'distinguishingMark' ) }
					/>
				</p>
			</div>
			<div className="section">
				<AbilityList
					abilities={ abilities }
					characterAge={ age }
					onReroll={ () => onClickData( 'abilities' ) }
				/>
			</div>
			<div className="section">
				<TraitList
					traits={ [
						{
							name: 'Personality',
							data: characterData.personality,
							onReroll: () => onClickData( 'personality' ),
						},
						{
							name: 'Ideal',
							data: characterData.ideal,
							onReroll: () => onClickData( 'ideal' ),
						},
						{
							name: 'Bond',
							data: characterData.bond,
							onReroll: () => onClickData( 'bond' ),
						},
						{
							name: 'Flaw',
							data: characterData.flaw,
							onReroll: () => onClickData( 'flaw' ),
						},
						{
							name: 'Voice',
							data: characterData.voice,
							onReroll: () => onClickData( 'voice' ),
						},
						{
							name: 'Plot Hook',
							data: characterData.plotHook,
							onReroll: () => onClickData( 'plotHook' ),
						},
					] }
				/>
			</div>
		</div>
	);
};
export default Character;
