import './Button.scss';

const Button = ({ children, active, onClick }) => {
  return (
    <button onClick={onClick} className={active ? 'button is-active' : 'button'}>{children}</button>
  )
}

export default Button;