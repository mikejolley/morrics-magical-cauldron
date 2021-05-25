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

			/**
			 * Get random data from the server in order to create a roll table.
			 *
			 * @param {string} type Type of data.
			 * @param {number} limit Number of records to retrieve.
			 */
			const getDataPromise = async ( type, limit = 1 ) => {
				try {
					return await getTavernData( {
						type,
						limit,
					} )
						.then( ( { data: sourceData } ) => {
							const dataList =
								sourceData?.tavernData?.nodes || [];

							return Promise.resolve(
								dataList.map( ( { content, author } ) => {
									return {
										content: stripHtml( content ).result,
										author: author?.node?.name || '',
									};
								} )
							);
						} )
						.catch( () => {
							return Promise.resolve( [] );
						} );
				} catch {
					return Promise.resolve( [] );
				}
			};

			const generateRollTable = (
				sourceData = [],
				content,
				size = 20
			) => {
				return [ ...new Array( size ) ].map( ( _item, index ) => {
					return sourceData[ index ]
						? sourceData[ index ]
						: {
								content:
									typeof content === 'function'
										? content()
										: content,
								author: '',
						  };
				} );
			};

			const callbacks = {
				name: () =>
					getDataPromise( 'name', 20 ).then( ( data ) =>
						randomItem(
							generateRollTable( data, () => generateName(), 40 )
						)
					),
				description: () =>
					getDataPromise( 'description' ).then( ( data ) =>
						randomItem( data )
					),
				drink: () =>
					getDataPromise( 'drink' ).then( ( data ) =>
						randomItem( data )
					),
				patrons: () =>
					getDataPromise( 'patrons' ).then( ( data ) =>
						randomItem( data )
					),
				trait: () => Promise.resolve( generateTrait() ),
				reputation: () =>
					Promise.resolve( randomItem( tavernReputation ) ),
				lifestyle: () =>
					Promise.resolve( generateLifestyle( socialClass ) ),
				rooms: () => Promise.resolve( generateRooms( socialClass ) ),
				socialClass: () => Promise.resolve( socialClass ),
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
