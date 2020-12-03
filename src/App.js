import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from 'firebase/app';

import firebaseConfig from './config';
import { setLibrary } from './redux/actions/libraryActions';
import { setUser } from './redux/actions/userActions';
import { getLibraryById } from './logic/library';
import { registerAuthStateChangeHandler, getUserById } from './logic/user';

import Footer from './components/footer';
import Header from './components/header';

import Book from './pages/book';
import Collection from './pages/collection';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Landing from './pages/landing';
import MyBooks from './pages/myBooks';

firebase.initializeApp(firebaseConfig);

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		registerAuthStateChangeHandler(async (user) => {
		  	if(user) {
				const { idUser, name: nameUser, isAdmin, idLibrary } = await getUserById(user.uid);
				const { name: nameLibrary, categories: categoriesLibrary } = await getLibraryById(idLibrary);
				dispatch(setUser({ idUser, name: nameUser, isAdmin }));
				dispatch(setLibrary({ idLibrary, nameLibrary, categoriesLibrary }));
			} else {
				dispatch(setUser(null));
				dispatch(setLibrary(null));
			}
		})
	}, [dispatch]);

	return (
		<Router>
			<Header />
			<main className="container">
				<Switch>
					<Route exact path="/">
						<Landing />
					</Route>
					<Route exact path="/:idLibrary/admin/">
						<Dashboard />
					</Route>
					<Route exact path="/:idLibrary/admin/coleccion/">
						<Collection />
					</Route>
					<Route exact path="/:idLibrary/">
						<Home />
					</Route>
					<Route exact path="/:idLibrary/libro/:idBook">
						<Book />
					</Route>
					<Route exact path="/:idLibrary/mis-prestamos/">
						<MyBooks />
					</Route>
				</Switch>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
