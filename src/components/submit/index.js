/**
 * External dependencies
 */
import { useState } from 'react';
import { Redirect } from '@reach/router';

/**
 * Internal dependencies
 */
import Select from '@components/select';
import Field from '@components/field';
import './style.scss';
import { contentTypes } from './constants';
import { useAuth } from '@hooks';

const Submit = () => {
	const { isLoggedIn } = useAuth();
	const [ contentType, setContentType ] = useState( 'clothing' );
	const [ moral, setMoral ] = useState( 'any' );
	const [ ethic, setEthic ] = useState( 'any' );
	const [ content, setContent ] = useState( '' );
	//const { submit } = useSubmitMutation();
	const currentContentType = contentTypes[ contentType ];

	if ( ! isLoggedIn ) {
		return <Redirect to="/account" noThrow />;
	}

	const onSubmit = () => {
		// add status to this hook.
		//submit( content, moral, ethic, contentType );
	};

	return (
		<div className="section submit-content">
			<hgroup>
				<h2>Submit Content</h2>
				<div>
					<Select
						label="Content Type"
						value={ contentType }
						onChange={ ( value ) => {
							setContentType( value );
						} }
						hiddenLabel={ true }
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
				</div>
			</hgroup>
			<div className="submit-content-form">
				<div className="submit-content-form__group">
					<Field
						label="Content"
						placeholder="Enter some text"
						description="Please use third-person language and they/them/their pronouns."
						grow={ true }
						onChange={ ( value ) => {
							setContent( value );
						} }
						value={ content }
					/>
					<div className="submit-content-form__alignment">
						<Select
							label="Moral Alignment"
							hiddenLabel={ false }
							value={ moral }
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
							label="Ethic Alignment"
							hiddenLabel={ false }
							value={ ethic }
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
					</div>
				</div>
				<button
					className="button button--center button--large"
					onClick={ onSubmit }
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Submit;
