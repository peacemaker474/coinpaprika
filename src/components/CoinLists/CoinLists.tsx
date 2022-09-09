import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../../atoms/atom';
import { fetchGetCoinLists } from '../../network/api';
import LoadingPage from '../../pages/LoadingPage';
import useIntersectionObserver from '../../hooks/useInfinityScroll';

const MainCoinLists = styled.ul<{ isDark: boolean }>`
    li {
        background-color: ${({ theme, isDark }) => isDark ? theme.black.boxColor : "none"};
        border: 1px solid ${({ isDark }) => isDark ? "none" : "rgb(127, 127, 127)"};

        a {
            color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor};
        }
    }
`;

const CoinList = styled.li`
    width: 90%;
    height: 70px;
    border-radius: 10px;
    margin: 0 auto;
    line-height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:not(:last-child) {
        margin-bottom: 25px;
    }

    &:first-child {
        margin-top: 15px;
    }

    &:hover {
        font-weight: bold;
    }
`;

const CoinTitle = styled(Link)`
    width: 100%;
    padding-left: 10px;
`;

const CoinImage = styled.img`
    width: 30px;
    height: 30px;
    margin-left: 10px;
`;

interface CoinData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function CoinLists() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);
    const [showdata, setShowData] = useState<CoinData[]>() as any[];
    const isDark = useRecoilValue(isDarkAtom);
    const { data, isLoading, isFetching } = useQuery<CoinData[]>(["allCoins"], fetchGetCoinLists, {
        select: (data) => data.slice(0, 150),
        onSuccess: (data) => setShowData(data?.slice(0, 15)),
    });

    const getMoreItem = async () => {
        setIsLoaded(true);
        setItemIndex((i) => i + 1);
        setShowData(showdata?.concat(data?.slice(itemIndex * 15, (itemIndex + 1) * 15)));
        setIsLoaded(false);
    };

    const onIntersect: IntersectionObserverCallback = async (
        [entry],
        observer
    ) => {
        if (entry.isIntersecting && !isLoaded) {
            observer.unobserve(entry.target);
            await getMoreItem();
            observer.observe(entry.target);
        }
    };

    const { setTarget } = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
        onIntersect,
    })

    if (isLoading || isFetching) return <LoadingPage />

    return (
        <MainCoinLists isDark={isDark}>
            {
                showdata?.map((coin: CoinData) => (
                    <CoinList key={coin.id}>
                        <CoinImage src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                        <CoinTitle to={`/${coin.id}`} state={{ name: coin.name }}> {coin.name} → </CoinTitle>
                    </CoinList>
                ))
            }
            <div ref={setTarget}> {isLoaded && <LoadingPage />} </div>
        </MainCoinLists>
    );
}

export default CoinLists;