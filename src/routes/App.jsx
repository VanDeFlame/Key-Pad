import React from 'react';
import Layout from '@containers/Layout';
import AppContext from '@context/AppContext';
import useInitialState from '@hooks/useInitialState';
import Abc from '@containers/Abc';
import '@styles/global.scss';

const App = () => {
	const initialState = useInitialState();
	return (
		<AppContext.Provider value={initialState}>
				<Layout>
					<Abc></Abc>
				</Layout>
		</AppContext.Provider>
	);
}

export default App;