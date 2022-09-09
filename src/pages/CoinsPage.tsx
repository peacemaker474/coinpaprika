import { useLocation, useParams, Outlet } from 'react-router-dom';
import { useQueries } from 'react-query';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import CoinsDetail from '../components/CoinsDetali/CoinsDetail';
import { fetchGetCoinInfo, fetchGetCoinPrice } from '../network/api';
import { isDarkAtom } from '../atoms/atom';

const CoinsWrapper = styled.div`
    max-width: 480px;
    height: 100vh;
    margin: 0 auto;
`;

const CoinTitle = styled.h2<{ isDark: boolean }>`
    font-size: 32px;
    margin 30px 0;
    text-align: center;
    color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor}
`;

interface RouteState {
    state: {
        name: string;
    }
}

export interface ICoinInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

export interface ICoinPrice {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    }
}

function CoinsPage() {
    const { state } = useLocation() as RouteState;
    const { coinId } = useParams();
    const isDark = useRecoilValue(isDarkAtom);

    // 추후의 useQueryResult에 대한 타입 선언이 필요
    const coinData = useQueries([
        {
            queryKey: ['CoinInfo', coinId],
            queryFn: () => fetchGetCoinInfo(coinId!)
        },
        {
            queryKey: ['CoinPrice', coinId],
            queryFn: () => fetchGetCoinPrice(coinId!)
        }
    ]);

    const isLoading = coinData.some((res) => res.isLoading);

    return (
        <CoinsWrapper>
            <CoinTitle isDark={isDark}> {state?.name ? state.name : isLoading ? "Loading" : coinData[0]?.data.name} </CoinTitle>
            <CoinsDetail
                coinInfo={coinData[0]?.data!}
                coinPrice={coinData[1]?.data!}
                loading={isLoading}
            />
            <Outlet context={{ coinId, coinPrice: coinData[1]?.data }} />
        </CoinsWrapper>
    )
}

export default CoinsPage;