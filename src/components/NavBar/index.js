import React from 'react';
import styles from './index.module.scss';
import Icon from '../Icon';
import withRouter from '@/utils/withRouter';
import classNames from 'classnames';

function Navbar({ children, extra, onLeftClick, navigate, className }) {

    const onClick = () => {
        if (onLeftClick) {
            onLeftClick();
        } else {
            navigate(-1);
        }
    };
    return (
        <div className={classNames(styles.root,className)}>
            {/* 后退按钮 */}
            <div className="left">
                <Icon type="icon-fanhui" onClick={onClick} />
            </div>
            {/* 居中标题 */}
            <div className="title">{children || '标题'}</div>
            {/* 右侧内容 */}
            <div className="right">{extra}</div>
        </div>
    )
}

export default withRouter(Navbar);
// export default Navbar;