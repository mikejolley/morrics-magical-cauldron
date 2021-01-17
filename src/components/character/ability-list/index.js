import AbilityItem from './item';
import './style.scss';
import { abilityScoreAgeModifiers } from './utils';

const AbilityList = ( { abilities, characterAge, onReroll } ) => {
	const ageModifier = Object.keys(
		abilityScoreAgeModifiers
	).find( ( ageGroup ) => characterAge.includes( ageGroup ) );

	return (
		<ul className="ability-list">
			{ Object.entries( abilities ).map( ( [ key, value ] ) => (
				<AbilityItem
					name={ key }
					key={ key }
					score={
						abilityScoreAgeModifiers[ ageModifier ] &&
						abilityScoreAgeModifiers[ ageModifier ][ key ]
							? Math.max(
									0,
									value +
										abilityScoreAgeModifiers[ ageModifier ][
											key
										]
							  )
							: value
					}
				/>
			) ) }
			<li>
				<button
					onClick={ onReroll }
					className="ability__reroll reroll-button"
				>
					<span aria-label="Reroll" role="img">
						🎲
					</span>
				</button>
			</li>
		</ul>
	);
};

export default AbilityList;
