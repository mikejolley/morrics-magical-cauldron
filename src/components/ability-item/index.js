const getModifier = ( score ) => {
	let modifier = '';

	if ( score === 1 ) {
		modifier = '-5';
	} else if ( score <= 3 ) {
		modifier = '-4';
	} else if ( score <= 5 ) {
		modifier = '-3';
	} else if ( score <= 7 ) {
		modifier = '-2';
	} else if ( score <= 9 ) {
		modifier = '-1';
	} else if ( score <= 11 ) {
		modifier = '+0';
	} else if ( score <= 13 ) {
		modifier = '+1';
	} else if ( score <= 15 ) {
		modifier = '+2';
	} else if ( score <= 17 ) {
		modifier = '+3';
	} else if ( score <= 19 ) {
		modifier = '+4';
	} else if ( score <= 21 ) {
		modifier = '+5';
	} else if ( score <= 23 ) {
		modifier = '+6';
	} else if ( score <= 25 ) {
		modifier = '+7';
	} else if ( score <= 27 ) {
		modifier = '+8';
	} else if ( score <= 29 ) {
		modifier = '+9';
	} else {
		modifier = '+10';
	}

	return modifier;
};

const AbilityItem = ( { name, score } ) => {
	return (
		<li>
			{ name } <strong>{ getModifier( score ) }</strong>{ ' ' }
			<span>{ score }</span>
		</li>
	);
};

export default AbilityItem;
