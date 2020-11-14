import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from 'firebase/app';

import firebaseConfig from './config';

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
	return (
		<Router>
			<Header />
			<main className="container">
				<Switch>
					<Route exact path="/">
						<Landing />
					</Route>
					<Route exact path="/:libraryId/admin/inicio/">
						<Dashboard />
					</Route>
					<Route exact path="/:libraryId/admin/coleccion/">
						<Collection />
					</Route>
					<Route exact path="/:libraryId/inicio/">
						<Home />
					</Route>
					<Route exact path="/:libraryId/libro/:bookId">
						<Book />
					</Route>
					<Route exact path="/:libraryId/mis-prestamos/">
						<MyBooks />
					</Route>
				</Switch>
			</main>
			<Footer />
		</Router>
	);
};

export default App;