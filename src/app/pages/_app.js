// pages/_app.js
import '../styles/globals.css';
import '../styles/floating-button.css'; // Añade esta línea
import FloatingContactButton from '../components/FloatingContactButton';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <FloatingContactButton />
    </>
  );
}

export default MyApp;