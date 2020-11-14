import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from './components/footer/Footer';
import Header from './components/header/Header';

import Book from './pages/book';
import Collection from './pages/collection';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Landing from './pages/landing';
import MyBooks from './pages/myBooks';

function App() {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Landing />
					</Route>
					<Route exact path="/admin/inicio/">
						<Dashboard />
					</Route>
					<Route exact path="/admin/coleccion/">
						<Collection />
					</Route>
					<Route exact path="/inicio/">
						<Home />
					</Route>
					<Route exact path="/libro/">
						<Book />
					</Route>
					<Route exact path="/mis-prestamos/">
						<MyBooks />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</>
	);
}

export default App;
