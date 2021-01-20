import AbilityItem from './item';
import './style.scss';
import { abilityScoreAgeModifiers } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

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
					<FontAwesomeIcon icon={ faDiceD20 } />
				</button>
			</li>
		</ul>
	);
};

export default AbilityList;
