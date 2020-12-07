const Input = ({
	id,
	label,
	value,
	placeholder,
	hasError,
	errorMessage,
	onChange,
	className,
	type='text',
	disabled=false
}) => {
	className = className ? ` ${className}` : '';
	return (
		<div className={hasError ? `formField formField_error${className}` : `formField${className}`}>
			<div className={disabled ? 'formField_field formField__disabled' : 'formField_field'}>
				<label>{label}</label>
				<input
					type={type}
					id={id}
					name={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
			</div>
			{(hasError && errorMessage) && <p className="formField_errorMessage">{errorMessage}</p>}
		</div>
	);
};

export default Input;