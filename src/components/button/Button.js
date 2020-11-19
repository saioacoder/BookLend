import './Button.scss';

const Button = ({ className, active, onClick, children }) => {
	className = className ? ` ${className}` : '';
	return (
		<button
			className={active ? `button is-active${className}` : `button${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;