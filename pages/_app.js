import { CreativeProvider } from '@/component/CreativeProvider';
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <CreativeProvider>
      <ToastContainer position="top-center" theme="colored" />
      <Component {...pageProps} />
    </CreativeProvider>
  )
}
