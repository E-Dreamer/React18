import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
// 懒加载
const Login = React.lazy(() => import('./pages/login/index'))
function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path='/' element={<Login />}></Route>
        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}

export default App;
