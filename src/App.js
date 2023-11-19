import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './assets/css/style.scss'
import { RouterProvider } from 'react-router-dom';
import ProjectRouter from './components/router/ProjectRouter';
import { useEffect, useState } from 'react';
import PublicRouter from './components/router/PublicRouter';
import axios from 'axios';
import './AxiosInterceptor';

function App() {
  const tokenExists = !!localStorage.token; // Check if token exists in localStorage

  // Use the tokenExists value to set auth
  const [auth, setAuth] = useState(tokenExists);

  useEffect(() => {
    console.log("localStorage.token:", localStorage.token);

    if (tokenExists) {
      console.log("Setting auth to true");
      //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
    }

    console.log("auth:", auth);
  }, [tokenExists]); // Use tokenExists as a dependency

  return (
    <>
      {auth ? (
        <RouterProvider router={ProjectRouter} />
      ) : (
        <RouterProvider router={PublicRouter} />
      )}
    </>
  );
}

export default App;
