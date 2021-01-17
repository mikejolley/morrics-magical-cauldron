import { races } from '@shared/data';

export const getRace = ( raceId ) => {
	return races[ raceId ] ? races[ raceId ] : {};
};

export const getRaceProp = ( raceId, prop ) => {
	const race = getRace( raceId );
	return race[ prop ] || null;
};
