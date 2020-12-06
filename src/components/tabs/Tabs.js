import { useState } from 'react';

import './Tabs.scss';

const Tabs = ({ changeFilter }) => {

	const [allSel, setAllSel] = useState(' tabs_item__sel');
	const [reservedSel, setReservedSel] = useState('');
	const [lentSel, setLentSel] = useState('');

	const handleClick = (type) => {
		setAllSel('');
		setReservedSel('');
		setLentSel('');
		if(type === '') {
			setAllSel(' tabs_item__sel');
		} else if(type === 'reserved') {
			setReservedSel(' tabs_item__sel');
		} else {
			setLentSel(' tabs_item__sel');
		}
		changeFilter(type);
	};

	return (
		<div className="tabs">
			<button onClick={() => handleClick('')} className={`tabs_item${allSel}`}>Todos</button>
			<button onClick={() => handleClick('reserved')} className={`tabs_item${reservedSel}`}>Reservados</button>
			<button onClick={() => handleClick('lent')} className={`tabs_item${lentSel}`}>En préstamo</button>
		</div>
	);

};

export default Tabs;