import './style.scss';
import Loading from '../loading';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string|Object} props.value Data to show.
 * @param {string} props.author Author, if user contributed.
 * @param {Function} props.onClick Ran on click.
 * @param {string} props.prefix Prepended to the value.
 * @param {string} props.suffix Appended to the value.
 * @param {boolean} props.loading True when loading content.
 */
const InlineField = ( {
	value = '-',
	author = '',
	onClick,
	prefix = '',
	suffix = '',
	loading = false,
} ) => {
	if ( loading ) {
		return <Loading className={ `inline-data` } message={ false } />;
	}
	return (
		<>
			<button
				className={ `inline-data` }
				onClick={ onClick }
				data-tip={ author ? `Submitted by ${ author }` : '' }
			>
				<div
					className={ `inline-data-value` }
					dangerouslySetInnerHTML={ {
						__html: `${ prefix } ${ value } ${ suffix }`,
					} }
				/>
			</button>
		</>
	);
};

export default InlineField;
