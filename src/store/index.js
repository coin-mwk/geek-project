import {createStore, applyMiddleware} from 'redux';
import  thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './reducers'
import { getTokenInfo } from '@/utils/storage';

//三个参数 1、指定reducer 2、指定store初始值 3、指定中间件
const store = createStore(
    reducer, 
    {
        login:getTokenInfo(),
    },
    composeWithDevTools(applyMiddleware(thunk))
);
// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))


export default store;
