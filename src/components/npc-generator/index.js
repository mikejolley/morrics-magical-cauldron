/**
 * External dependencies
 */
import { useQuery } from '@apollo/client';

/**
 * Internal dependencies
 */
import { GET_PLAYER_DATA } from './queries';
import Generator from './generator';
import Loading from '../loading';
import Error from '../error';
import './style.scss';

const NpcGenerator = () => {
	const { loading, error, data } = useQuery( GET_PLAYER_DATA );

	if ( loading ) {
		return <Loading />;
	}

	if ( error || ! data.characterData ) {
		return <Error />;
	}
	return <Generator data={ data.characterData.nodes } />;
};

export default NpcGenerator;
