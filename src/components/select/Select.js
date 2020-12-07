import './Select.scss';

const Select = ({
	id,
	label,
	value,
	placeholder,
	hasError,
	errorMessage,
	onChange,
	options,
	className,
}) => {
	className = className ? ` ${className}` : '';

	return (
		<div className={hasError ? `select formField formField_error${className}` : `select formField${className}`}>
			<div className="formField_field">
				<label>{label}</label>
				<select
					id={id}
					name={id}
					onChange={onChange}
				>
					<option value="-1">{placeholder}</option>
					{options && options.map((item, i) => (
						<option key={`categories${i}`} value={i}>{item}</option>
					))}
				</select>
			</div>
			{(hasError && errorMessage) && <p className="formField_errorMessage">{errorMessage}</p>}
		</div>
	);
};

export default Select;