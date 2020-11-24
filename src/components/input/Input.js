const Input = ({
	id,
	label,
	value,
	placeholder,
	hasError,
	errorMessage,
	onChange,
	className,
	type='text'
}) => {
	className = className ? ` ${className}` : '';
	return (
		<div className={hasError ? `formField formField_error${className}` : `formField${className}`}>
			<div className="formField_field">
				<label>{label}</label>
				<input
					type={type}
					id={id}
					name={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
			{(hasError && errorMessage) && <p className="formField_errorMessage">{errorMessage}</p>}
		</div>
	);
};

export default Input;