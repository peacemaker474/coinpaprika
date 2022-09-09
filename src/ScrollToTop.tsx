import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 스크롤을 내린 상태에서 코인 가격과 차트가 있는 상세페이지로 이동할 경우, Header 영역이 안 보이게 되는데,
// scroll을 맨 위로 올려주도록 하였음.

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [pathname]);

    return <></>;
}

export default ScrollToTop;