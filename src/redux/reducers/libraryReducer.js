const defaultLibrary = {
	idLibrary: '',
	nameLibrary: '',
	categoriesLibrary: []
};

export default function libraryReducer(state = defaultLibrary, action) {
	switch (action.type) {
		case 'SET_LIBRARY': {
			return { ...action.payload };
		}
		default: {
			return state;
		}
	}
}