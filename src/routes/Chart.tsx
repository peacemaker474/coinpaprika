import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api/api";
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from "recoil";
import Loading from "../components/Loading";
import { isDarkAtom } from "../atomos";

interface ChartProps {
    coinId: string | undefined;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data: chartData} = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    )
    return (
        <div>
            {isLoading ? (
            <Loading />
            ) : ( 
                <ApexChart 
                    type="candlestick"
                    series={[
                        {
                            name: "Price",
                            data: chartData?.map((price) => ({
                                x: price.time_close,
                                y: [price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)]
                            })),
                        }
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? 'dark' : "light",
                        },
                        chart: {
                            type: "candlestick",
                            height: 300,
                            width: 300,
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
                        xaxis: {
                            type: "datetime",
                            
                        },
                        yaxis: {
                            show: false,
                        },
                        grid: {
                            show: false,
                        }
                    }}
                />
            )}
        </div>
    )
}

export default Chart;