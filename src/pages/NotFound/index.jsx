import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
    let navigate = useNavigate();
    const timeRef = useRef(-1 );
    // console.log("开始执行");
    const [time, setTime] = useState(5);

    useEffect(() => {
        let timer = setInterval(() => {
            setTime(time => {
                if (time === 1) {
                    navigate('/home', { replace: true })
                }
                return time - 1
            })
        }, 1000)
        return () => {
            clearInterval(timer);
        }

    }, [time])



    return (
        <div>
            <h1>访问的页面不存在!!!</h1>
            <p>{time}秒后返回<Link to='/home'>主页</Link>....</p>
        </div>
    )
}
