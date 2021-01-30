/**
 * External dependencies
 */
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import Select from '@components/select';
import Field from '@components/field';
import { useSubmitContent } from '@hooks';
import Success from '@components/success';
import { races } from '@shared/data';
import { contentTypes } from './constants';

export const SubmitContentForm = () => {
	const [ contentType, setContentType ] = useState( 'feature' );
	const currentContentType = contentTypes[ contentType ];
	const isSubscribed = useRef( true );
	const [ moral, setMoral ] = useState( 'any' );
	const [ ethic, setEthic ] = useState( 'any' );
	const [ gender, setGender ] = useState( 'any' );
	const [ race, setRace ] = useState( 'any' );
	const [ content, setContent ] = useState( '' );
	const [ success, setSuccess ] = useState();
	const { submitContent, error, setError, status } = useSubmitContent();

	useEffect( () => {
		isSubscribed.current = true;
		return () => ( isSubscribed.current = false );
	}, [] );

	// If the content or type changes, clear status.
	useEffect( () => {
		if ( content ) {
			setSuccess( '' );
			setError( '' );
		}
	}, [ content ] );

	useEffect( () => {
		setSuccess( '' );
		setError( '' );
	}, [ contentType ] );

	const onSubmit = ( e ) => {
		e.preventDefault();
		submitContent( {
			content,
			moral,
			ethic,
			race,
			gender,
			type: contentType,
		} ).then( ( data ) => {
			if ( isSubscribed.current && data ) {
				setContent( '' );
				if ( data?.submitCharacterData?.status === 'publish' ) {
					setSuccess(
						'Thanks! Your content was successfully submitted!'
					);
				}
				if ( data?.submitCharacterData?.status === 'pending' ) {
					setSuccess(
						'Thanks! Your content is in the moderation queue and will be approved by an admin.'
					);
				}
			}
		} );
	};

	return (
		<form onSubmit={ onSubmit } className="submit-content-form">
			{ error && (
				<div className="error-notice">
					<FontAwesomeIcon
						icon={ faSkullCrossbones }
						aria-hidden={ true }
					/>
					<p>{ error }</p>
				</div>
			) }
			{ success && ! error && status === 'resolved' && (
				<Success hero={ false }>{ success }</Success>
			) }
			<section className="submit-content-form_group">
				<Select
					label="Content Type"
					hiddenLabel={ false }
					value={ contentType }
					onChange={ ( value ) => {
						setContentType( value );
					} }
					options={ Object.entries( contentTypes ).map(
						( [ id, { name } ] ) => ( {
							value: id,
							label: name,
						} )
					) }
				/>
				<p className="content-description">
					{ currentContentType.description } Example:{ ' ' }
					<em>{ currentContentType.example }</em>
				</p>
				<Field
					label="Content"
					placeholder="Enter some text"
					description="Please use third-person language and they/them/their pronouns."
					grow={ true }
					onChange={ ( value ) => {
						setContent( value );
					} }
					disabled={ status === 'resolving' }
					value={ content }
				/>
				<div className="submit-content-form__selects">
					<Select
						label="Ethic Alignment"
						hiddenLabel={ false }
						value={ ethic }
						disabled={ status === 'resolving' }
						onChange={ ( value ) => {
							setEthic( value );
						} }
						options={ [
							{
								value: 'any',
								label: 'Any',
							},
							{
								value: 'lawful',
								label: 'Lawful',
							},
							{
								value: 'neutral',
								label: 'Neutral',
							},
							{
								value: 'chaotic',
								label: 'Chaotic',
							},
						] }
					/>
					<Select
						label="Moral Alignment"
						hiddenLabel={ false }
						value={ moral }
						disabled={ status === 'resolving' }
						onChange={ ( value ) => {
							setMoral( value );
						} }
						options={ [
							{
								value: 'any',
								label: 'Any',
							},
							{
								value: 'good',
								label: 'Good',
							},
							{
								value: 'neutral',
								label: 'Neutral',
							},
							{
								value: 'evil',
								label: 'Evil',
							},
						] }
					/>
					<Select
						label="Race"
						hiddenLabel={ false }
						value={ race }
						disabled={ status === 'resolving' }
						onChange={ ( value ) => {
							setRace( value );
						} }
						options={ [
							{
								value: 'any',
								label: 'Any Race',
							},
							...Object.values( races ).map(
								( { id, singular } ) => ( {
									value: id,
									label: singular,
								} )
							),
						] }
					/>
					<Select
						label="Gender"
						hiddenLabel={ false }
						value={ gender }
						onChange={ ( value ) => setGender( value ) }
						options={ [
							{ value: 'any', label: 'Any Gender' },
							{ value: 'male', label: 'Male' },
							{ value: 'female', label: 'Female' },
						] }
					/>
				</div>
			</section>
			<p>
				<button
					className="button button--center button--large"
					onClick={ onSubmit }
					disabled={ status === 'resolving' }
				>
					Submit Content
				</button>
			</p>
		</form>
	);
};

export default SubmitContentForm;
