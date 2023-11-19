import './App.css';
import Directory from './pages/Directory';
import Profile from './pages/Profile';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Directory />,
  },
  {
    path: "/user-details/:id",
    element: <Profile />,
  }
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}


export default App;
