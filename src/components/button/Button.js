import './Button.scss';

const Button = ({ className, disabled, active, onClick, children }) => {
	className = className ? ` ${className}` : '';
	return (
		<button
			className={active ? `button is-active${className}` : `button${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;