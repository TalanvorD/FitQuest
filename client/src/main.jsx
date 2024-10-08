import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Error from './pages/Error';
import TestPage from './pages/TestPage.jsx';
import Landingpage from './pages/Landingpage.jsx';
import FormPage from './pages/Formpage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:username',
        element: <Profile />
      },
      {
        path: '/testpage',
        element: <TestPage />
      },
      {
        path: '/landingpage',
        element: <Landingpage />
      },
      {
        path: '/formpage',
        element: <FormPage />
      } 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
