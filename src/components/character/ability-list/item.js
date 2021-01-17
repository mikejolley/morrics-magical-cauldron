import AbilityModifier from './modifier';

const AbilityItem = ( { name, score } ) => {
	return (
		<li className="ability">
			<span className="ability__name">{ name }</span>
			<AbilityModifier score={ score } />
			<span className="ability__score">{ score }</span>
		</li>
	);
};

export default AbilityItem;
