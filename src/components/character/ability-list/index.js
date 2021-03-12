import AbilityItem from './item';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const AbilityList = ( { abilities, onClick } ) => {
	if ( ! abilities ) {
		return null;
	}
	return (
		<ul className="ability-list">
			{ Object.entries( abilities ).map( ( [ key, value ] ) => (
				<AbilityItem name={ key } key={ key } score={ value } />
			) ) }
			<li>
				<button
					onClick={ onClick }
					className="ability__reroll reroll-button"
				>
					<FontAwesomeIcon icon={ faDiceD20 } />
				</button>
			</li>
		</ul>
	);
};

export default AbilityList;
