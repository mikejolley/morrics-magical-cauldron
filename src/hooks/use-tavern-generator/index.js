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
import {
	generateName,
	generateTrait,
	generateLifestyle,
	randomSocialClass,
	generateRooms,
} from './utils';
import { filterCallbacks, resolveAllCallbacks } from 'shared/utils';
import { tavernReputation } from 'shared/data';

export const useTavernGenerator = () => {
	const getTavernData = useTavernDataQuery();
	const getCallbacks = useCallback(
		( { socialClass: selectedSocialClass } ) => {
			/**
			 * Randomizes the incoming options if missing or blank -- these options are generated first since other data
			 * may require them. Because other generators rely on these, they cannot be rerolled individually.
			 */
			const socialClass = selectedSocialClass || randomSocialClass();

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
									stripHtml( randomSourceData.content )
										.result || fallback,
								author:
									randomSourceData?.author?.node?.name || '',
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
				socialClass: () => Promise.resolve( socialClass ),
				description: () => tavernDataPromise( 'description' ),
				drink: () => tavernDataPromise( 'drink' ),
				patrons: () => tavernDataPromise( 'patrons' ),
				trait: () => Promise.resolve( generateTrait() ),
				reputation: () =>
					Promise.resolve( randomItem( tavernReputation ) ),
				lifestyle: () =>
					Promise.resolve( generateLifestyle( socialClass ) ),
				rooms: () => Promise.resolve( generateRooms( socialClass ) ),
			};
			return {
				callbacks,
				resolveCallbacks: ( fields = null, options = {} ) =>
					resolveAllCallbacks(
						filterCallbacks( callbacks, fields ),
						options
					),
			};
		},
		[]
	);

	return getCallbacks;
};
