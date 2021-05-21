/**
 * External dependencies
 */
import { useCallback } from 'react';

/**
 * Internal dependencies
 */
import { generateName } from './utils';
import { filterCallbacks, resolveAllCallbacks } from 'shared/utils';

export const useTavernGenerator = () => {
	const getCallbacks = useCallback( ( {} ) => {
		const callbacks = {
			name: () => {
				const generatedName = generateName();

				return Promise.resolve( {
					content: generatedName,
					author: '',
				} );
			},
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
