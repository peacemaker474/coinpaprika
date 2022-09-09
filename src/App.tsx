import Header from './components/Header/Header';
import Router from './Router';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ScrollTopBtn from './components/common/ScrollTopBtn';
import { isDarkAtom } from './atoms/atom';

const Wrapper = styled.div<{ isDark: boolean }>`
  width: 100vw;
  position: relative;
  background-color: ${({ theme, isDark }) => isDark ? theme.black.mainColor : theme.white.mainColor};
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Wrapper isDark={isDark}>
      <Header />
      <ScrollTopBtn />
      <Router />
    </Wrapper>
  );
}

export default App;
