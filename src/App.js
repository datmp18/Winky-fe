import logo from './logo.svg';
import './App.css';
import Slidebar from './layout/Slidebar';

import { Outlet } from 'react-router-dom';
function App() {

  return (
    <div className="w-full h-[100vh] bg-black flex">
      <div className='  relative h-[100vh]   text-white  px-2    '>
        <Slidebar />
      </div>

      <div className="w-full h-full  pl-2  ">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
