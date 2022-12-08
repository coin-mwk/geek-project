import { Navigate, useLocation} from 'react-router-dom';
import { hasToken } from '@/utils/storage';



export default function AuthRoute({children}){
    const location = useLocation();
    return hasToken()?(children):(<Navigate to="/login" replace state={ {path:location.pathname} }/>)
}
