import { useOutletContext } from "react-router-dom";
import { useQuery } from 'react-query';
import styled from "styled-components";
import { fetchGetCoinHistory } from "../../network/api";
import LoadingPage from "../../pages/LoadingPage";
import ApexCharts from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from "../../atoms/atom";

const Wrapper = styled.div`
    width: 100%;
`;

const ErrorMessage = styled.h2<{ isDark: boolean; }>`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor};
`;

interface ICoinID {
    coinId: string;
}

interface ICoinHistory {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
}

function CoinChart() {
    const { coinId } = useOutletContext<ICoinID>();
    const isDark = useRecoilValue(isDarkAtom);
    const { data, isLoading, isFetching } = useQuery<ICoinHistory[]>(['coinHistory', coinId], () => fetchGetCoinHistory(coinId));
    const chartOptions: any = {
        chart: {
            width: 500,
            height: 500,
            background: "transparent",
            foreColor: isDark ? "white" : "black",
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                },
            },
        },
        theme: {
            mode: isDark ? "light" : "dark"
        },
        title: {
            text: 'CoinPrice Chart',
            align: 'left',
            style: {
                fontSize: '18px',
            }
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            show: false,
            tooltip: {
                enabled: true
            }
        },
        grid: {
            show: false,
        },
    }
    if (isLoading || isFetching) return <LoadingPage />

    return (
        <Wrapper>
            {
                Object.keys(data!).includes('error') ?
                    <ErrorMessage isDark={isDark}> We don't have Coin Price Information</ErrorMessage> :
                    <ApexCharts
                        type="candlestick"
                        series={[{
                            data: data?.map((price) => {
                                return {
                                    x: new Date(price.time_open),
                                    y: [parseFloat(price.open), parseFloat(price.high), parseFloat(price.low), parseFloat(price.close)]
                                }
                            }) ?? []
                        }]}
                        options={chartOptions}
                    />
            }
        </Wrapper>
    );
}

export default CoinChart;