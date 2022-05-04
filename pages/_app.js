import SupthoEditorChallenge from './index.js';
import css from '../styles/global.css';

// This top-level App object is a wrapper around SupthoEditorChallenge
// This wrapper is included to enable adding our own custom global CSS
// See https://nextjs.org/docs/advanced-features/custom-app for more info
function App() {
  return <SupthoEditorChallenge/>
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App