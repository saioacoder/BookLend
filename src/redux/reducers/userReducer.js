const defaultUser = {
	idUser: '',
	name: '',
	isAdmin: false,
	idLibrary: ''
};

export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case 'SET_USER': {
			return { ...action.payload };
		}
		default: {
			return state;
		}
	}
}