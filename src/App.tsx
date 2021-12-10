import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { isDarkAtom } from './atomos';
import {ReactQueryDevtools} from 'react-query/devtools';
import Router from './routes/Router';
import GlobalStyles from './styles/GlobalStyles';
import { darkTheme, lightTheme } from './styles/theme';

function App () {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  )
}

export default App;
