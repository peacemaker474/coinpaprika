import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../../atoms/atom';
import Toggle from './Toggle';

const MainHeader = styled.header`
    max-width: 480px;
    height: 150px;
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

const MainGoingBack = styled.button`
    all: unset;
    width: 10%;
    height: 50%;
    font-size: 2.5rem;
    color: white;
    text-align: center;
    cursor: pointer;
`;

const MainTitle = styled.h2<{ isDark: boolean }>`
    width: 75%;
    height: 50%;
    font-size: 2.5rem;
    line-height: 75px;
    text-align: center;
    color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor};
`;



function Header() {
    const isDark = useRecoilValue(isDarkAtom);
    const navigate = useNavigate();

    const handleGoingBack = () => {
        navigate("/");
    }

    return (
        <MainHeader>
            <MainGoingBack onClick={handleGoingBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" style={{ paddingTop: 10 }} viewBox="0 0 448 512" fill={isDark ? "rgb(255, 255, 255)" : "rgb(33, 37, 42)"}>
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </MainGoingBack>
            <MainTitle isDark={isDark}> Best Coin Lists </MainTitle>
            <Toggle />
        </MainHeader>
    );
}

export default Header;