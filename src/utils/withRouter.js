// 封装withRouter,使得函数组件具有路由功能
import {useLocation, useNavigate} from 'react-router';

export default function withRouter(Child) {
  return function(props){
    const location = useLocation();
    const navigate = useNavigate();
    return <Child {...props} navigate={navigate} location={location} />
  }
}
