/**
 * External dependencies
 */
import randomItem from 'random-item';

/**
 * Internal dependencies
 */
import { rand } from './rand';

/**
 * Parse template syntax.
 *
 * handles multiple "kinds" of template syntax
 *
 * A string containing '{alpha/beta}' will choose one at random
 *
 * A string starting with a $ symbol is a reference for any passed content
 * so '{$colour}' becomes 'blue' if `content` was passed as { colour: 'blue' }
 *
 * A string container using the linked format (symbol, double colon) e.g {X::alpha/beta}
 * will ensure that any other placeholder in the string that uses the same linked symbol
 * returns the same index of random that the first placeholder with that symbol did
 *
 * Based on thomascgray/fantasy-content-generator.
 *
 * @param {string} string Template string.
 * @param {Object} content Object containing content to insert.
 */
export const parseContentTemplate = ( string, content = {} ) => {
	const regex = /{(.+?)}/gm;
	const matches = string.match( regex );
	const linkedPlaceholderIndexes = {};

	if ( matches ) {
		// is our match a placeholder setup
		matches.forEach( ( match ) => {
			const linkedPlaceholderMatches = /{(.+?)::(.+?)}/gm.exec( match );
			if ( linkedPlaceholderMatches ) {
				const rawLinkToken = linkedPlaceholderMatches[ 1 ];
				if ( linkedPlaceholderIndexes[ rawLinkToken ] !== null ) {
					// if we're already setup
					const replacement = linkedPlaceholderMatches[ 2 ].split(
						'/'
					)[ linkedPlaceholderIndexes[ rawLinkToken ] ];
					string = string.replace( match, replacement );
				} else {
					// if not, we need to do the first one and add the index into the linkedPlaceholderIndexes
					const allPlaceholderChunks = linkedPlaceholderMatches[ 2 ].split(
						'/'
					);
					const newIndex = rand( 0, allPlaceholderChunks.length - 1 );
					const replacement = allPlaceholderChunks[ newIndex ];
					linkedPlaceholderIndexes[ rawLinkToken ] = newIndex; // set it up for further matches
					string = string.replace( match, replacement );
				}
			}
		} );

		matches.forEach( ( match ) => {
			if ( match.charAt( 1 ) === '$' ) {
				const replacementVarName = match.substring(
					2,
					match.length - 1
				);
				string = string.replace( match, content[ replacementVarName ] );
			} else {
				const replacement = randomItem(
					match
						.substring( 1 )
						.substring( 0, match.length - 2 )
						.split( '/' )
				);
				string = string.replace( match, replacement );
			}
		} );
	}

	return string;
};
