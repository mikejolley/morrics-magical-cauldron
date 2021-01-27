import './style.scss';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string|Object} props.value Data to show.
 * @param {string} props.author Author, if user contributed.
 * @param {Function} props.onClick Ran on click.
 * @param {string} props.prefix Prepended to the value.
 * @param {string} props.suffix Appended to the value.
 */
const InlineField = ( {
	value = '-',
	author = '',
	onClick,
	prefix = '',
	suffix = '',
} ) => {
	return (
		<button className={ `inline-data` } onClick={ onClick }>
			<span
				className={ `inline-data-value` }
				dangerouslySetInnerHTML={ {
					__html: `${ prefix } ${ value } ${ suffix }`,
				} }
			/>
			{ author && <cite>{ `Submitted by ${ author }` }</cite> }
		</button>
	);
};

export default InlineField;
