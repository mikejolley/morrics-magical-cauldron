/**
 * External dependencies
 */
import { useCallback } from 'react';
import randomItem from 'random-item';
import { stripHtml } from 'string-strip-html';

/**
 * Internal dependencies
 */
import { useTavernDataQuery } from 'hooks/queries/use-tavern-data-query';
import { generateName } from './utils';
import { filterCallbacks, resolveAllCallbacks } from 'shared/utils';
import { tavernTraits, tavernReputation } from 'shared/data';

export const useTavernGenerator = () => {
	const getTavernData = useTavernDataQuery();
	const getCallbacks = useCallback( ( {} ) => {
		const tavernDataPromise = async ( type, fallback = '' ) => {
			try {
				return await getTavernData( {
					type,
				} )
					.then( ( { data: sourceData } ) => {
						const randomSourceData = randomItem(
							sourceData?.tavernData?.nodes || []
						);
						return Promise.resolve( {
							content:
								stripHtml( randomSourceData.content ).result ||
								fallback,
							author: randomSourceData?.author?.node?.name || '',
						} );
					} )
					.catch( () => {
						return Promise.resolve( { content: fallback } );
					} );
			} catch {
				return Promise.resolve( { content: fallback } );
			}
		};

		const callbacks = {
			name: ( { source = 'user' } ) => {
				const generatedName = generateName();

				return source === 'user'
					? tavernDataPromise( 'name', generatedName )
					: {
							content: generatedName,
							author: '',
					  };
			},
			description: () => tavernDataPromise( 'description' ),
			drink: () => tavernDataPromise( 'drink' ),
			patrons: () => tavernDataPromise( 'patrons' ),
			trait: () => Promise.resolve( randomItem( tavernTraits ) ),
			reputation: () => Promise.resolve( randomItem( tavernReputation ) ),
		};
		return {
			callbacks,
			resolveCallbacks: ( fields = null, options = {} ) =>
				resolveAllCallbacks(
					filterCallbacks( callbacks, fields ),
					options
				),
		};
	}, [] );

	return getCallbacks;
};
