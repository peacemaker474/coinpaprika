import { Routes, Route } from 'react-router-dom';
import CoinChart from './components/CoinsDetali/CoinChart';
import CoinPrice from './components/CoinsDetali/CoinPrice';
import CoinsPage from './pages/CoinsPage';
import HomePage from './pages/HomePage';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:coinId" element={<CoinsPage />}>
                <Route path="price" element={<CoinPrice />} />
                <Route path="chart" element={<CoinChart />} />
            </Route>
        </Routes>
    )
}

export default Router;