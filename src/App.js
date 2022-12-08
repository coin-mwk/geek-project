
import React, { Suspense, useEffect } from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import { hasToken } from './utils/storage';
import requests from './utils/request';



const Login = React.lazy(() => import('@/pages/Login'));
const Home = React.lazy(() => import('@/pages/Layout'));
const Edit = React.lazy(() => import('@/pages/Profile/Edit'));
const ProfileChat = React.lazy(() => import('@/pages/Profile/Chat'));
const NotFound = React.lazy(()=>import('./pages/NotFound'));
const FeedBack = React.lazy(()=>import('@/pages/Profile/Feedback'))



function App() {
  

  return (
    <div className="App">
      {/* 配置一级路由 */}
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home/*' element={<Home />} />
          <Route path='/login' element={<Login />} />

          {/* 需要登录才能访问的页面 */}
          <Route path='/profile/edit' element={
            <AuthRoute>
              <Edit />
            </AuthRoute>
          }></Route>
          <Route path='/profile/chat' element={
            <AuthRoute>
              <ProfileChat />
            </AuthRoute>
          }></Route>
          <Route path='/profile/feedback' element={
            <AuthRoute>
              <FeedBack/>
            </AuthRoute>
          }/>
          

       <Route path='*' element={<NotFound />}></Route>

      </Routes>
    </Suspense>
    </div >
  );
}

export default App;
