import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from "../atoms/atom";

const Wrapper = styled.div<{ isDark: boolean }>`
    width: 100%;
    color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor};
    text-align: center;
`;

function LoadingPage() {
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <Wrapper isDark={isDark}>
            Loading...
        </Wrapper>
    )
}

export default LoadingPage;