import { CssBaseline, Stack } from '@mui/material';
import Header from '#component/Header.tsx';
import MarketPlace from '#page/MarketPlace.tsx';

function App() {

	return (
		<>
			<CssBaseline />
			<Stack >
				<Header />
				<Stack>
					<MarketPlace />
				</Stack>
				{/* 
				<Footer /> */}
			</Stack>
		</>
	);
}

export default App;
