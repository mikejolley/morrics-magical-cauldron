const AbilityModifier = ( { score } ) => {
	const modifier = Math.floor( ( parseInt( score, 10 ) - 10 ) / 2 );
	return (
		<span className="ability__modifier">
			{ modifier < 0 ? modifier : `+${ modifier }` }
		</span>
	);
};

export default AbilityModifier;
