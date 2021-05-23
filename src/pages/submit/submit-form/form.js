/**
 * External dependencies
 */
import { useState, useEffect, useReducer } from 'react';

/**
 * Internal dependencies
 */
import Select from 'components/select';
import Field from 'components/field';
import { useSubmitContent } from 'hooks';
import Success from 'components/success';
import reducer from './reducer';

export const Form = ( { contentType, subContentTypes, OptionsComponent } ) => {
	const [ selectedType, setSelectedType ] = useState(
		Object.keys( subContentTypes )[ 0 ]
	);
	const [ options, setOptions ] = useState( {} );
	const [ success, setSuccess ] = useState();
	const { submitContent, status } = useSubmitContent( contentType );
	const [ contentState, dispatch ] = useReducer( reducer, {} );

	const insertRow = () => {
		dispatch( { type: 'INSERT' } );
	};

	const removeRow = ( id ) => {
		dispatch( { type: 'REMOVE', id } );
	};

	const updateRow = ( id, content ) => {
		dispatch( { type: 'UPDATE', id, content } );
	};

	const setError = ( id, error ) => {
		dispatch( { type: 'SET_ERROR', id, error } );
	};

	const reset = () => {
		dispatch( { type: 'SET_PRISTINE' } );
	};

	const selectedTypeData = subContentTypes[ selectedType ];

	useEffect( () => {
		setSuccess( '' );
	}, [ selectedType, options ] );

	useEffect( () => {
		if ( Object.keys( contentState ).length === 0 ) {
			reset();
		}
	}, [ contentState ] );

	const onSubmit = ( e ) => {
		e.preventDefault();
		setSuccess( '' );

		const submitPromises = Object.entries( contentState )
			.filter( ( [ , { content } ] ) => content.length )
			.map( ( [ id, { content } ] ) => {
				return submitContent( {
					content,
					type: selectedType,
					...options,
				} )
					.then( ( data ) => {
						removeRow( id );
						return data;
					} )
					.catch( ( error ) => {
						setError( id, error.message );
						throw error;
					} );
			} );

		if ( submitPromises.length > 0 ) {
			Promise.any( submitPromises )
				.then( () => {
					setSuccess(
						'Thanks! Your content was successfully submitted!'
					);
				} )
				.catch( () => {} );

			Promise.all( submitPromises )
				.then( () => {
					reset();
				} )
				.catch( () => {} );
		} else {
			reset();
		}
	};

	return (
		<form onSubmit={ onSubmit } className="submit-content-form">
			{ success && status === 'resolved' && (
				<Success hero={ false }>{ success }</Success>
			) }
			<section className="submit-content-form_group">
				<Select
					label="Content Type"
					hiddenLabel={ false }
					value={ selectedType }
					onChange={ ( value ) => {
						setSelectedType( value );
					} }
					options={ Object.entries( subContentTypes ).map(
						( [ id, { name } ] ) => ( {
							value: id,
							label: name,
						} )
					) }
				/>

				<p className="content-description">
					{ selectedTypeData.description } Example:{ ' ' }
					<em>{ selectedTypeData.example }</em>
				</p>

				<OptionsComponent onChange={ setOptions } status={ status } />

				{ Object.entries( contentState ).map(
					( [ id, { content, error } ], index ) => {
						return (
							<Field
								key={ id }
								hideLabel={ index > 0 }
								label="Content"
								placeholder="Enter some text..."
								grow={ true }
								error={ error }
								onChange={ ( value ) => {
									setSuccess( '' );
									updateRow( id, value );

									if (
										content.length &&
										index + 1 ===
											Object.keys( contentState ).length
									) {
										insertRow();
									}
								} }
								disabled={ status === 'resolving' }
								value={ content }
							/>
						);
					}
				) }

				<button
					className="button button--center button--large"
					onClick={ onSubmit }
					disabled={ status === 'resolving' }
				>
					{ `Submit ${ selectedTypeData.name }` }
				</button>
			</section>
		</form>
	);
};

export default Form;
