import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import theme from '../src/components/theme';
import { Provider } from 'react-redux';
import createWrapper from 'next-redux-wrapper'
import store from '../src/redux/store'
import '../src/helper/style.css'
import { Store } from '@material-ui/icons';

export const cache = createCache({ key: 'css', prepend: true });

function MyApp(props: AppProps) {
	const { Component, pageProps } = props;

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement!.removeChild(jssStyles);
		}
	}, []);

	return (
		<CacheProvider value={cache}>
			<Head>
				<title>My page</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Provider store={store} >
				<Component {...pageProps} />
				</Provider>
				
			</ThemeProvider>
		</CacheProvider>
	);
}

const makeStore = () => store;

export default createWrapper(makeStore)(MyApp);