import { ToastContainer, Slide } from "react-toastify";
import '../styles/globals.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return <div>
  <Component {...pageProps} />
  <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnHover
        transition={Slide}
      />
  </div>
}

export default MyApp
