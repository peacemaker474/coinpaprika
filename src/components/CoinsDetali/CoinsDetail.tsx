import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from "../../atoms/atom";
import { ICoinInfo, ICoinPrice } from "../../pages/CoinsPage";
import LoadingPage from "../../pages/LoadingPage";

const Wrapper = styled.div`
    width: 100%;
`;

const Overview = styled.div<{ isDark: boolean }>`
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme, isDark }) => isDark ? theme.black.boxColor : theme.white.boxColor};
    box-shadow: ${({ isDark }) => isDark ? "none" : "4px 12px 30px 6px rgb(0 0 0 / 9%)"};
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div<{ isDark: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
    span {
        color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor};
    }
`;
const Description = styled.p<{ isDark: boolean }>`
    margin: 20px 0px;
    line-height: 20px;
    padding-left: 5px;
    color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor};
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean, isDark: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 400;
    background-color: ${({ theme, isDark }) => isDark ? theme.black.boxColor : theme.white.boxColor};
    box-shadow: ${({ isDark }) => isDark ? "none" : "4px 12px 30px 6px rgb(0 0 0 / 9%)"};
    padding: 7px 0px;
    border-radius: 10px;
    a {
        display: block;
        font-weight: bold;
        color: ${({ theme, isActive, isDark }) =>
        !isActive ? theme.arrowColor : isDark ? theme.black.textColor : theme.white.textColor};
    }
`;

interface IDetailProps {
    coinInfo: ICoinInfo;
    coinPrice: ICoinPrice;
    loading: boolean;
}


function CoinsDetail({ coinInfo, coinPrice, loading }: IDetailProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    return (
        <Wrapper>
            {loading ? (
                <LoadingPage />
            ) : (
                <>
                    <Overview isDark={isDark}>
                        <OverviewItem isDark={isDark}>
                            <span>Rank:</span>
                            <span>{coinInfo?.rank}</span>
                        </OverviewItem>
                        <OverviewItem isDark={isDark}>
                            <span>Symbol:</span>
                            <span>${coinInfo?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem isDark={isDark}>
                            <span>Open Source:</span>
                            <span>{coinInfo?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description isDark={isDark}>{coinInfo?.description}</Description>
                    <Overview isDark={isDark}>
                        <OverviewItem isDark={isDark}>
                            <span>Total Suply:</span>
                            <span>{coinPrice?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem isDark={isDark}>
                            <span>Max Supply:</span>
                            <span>{coinPrice?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={!chartMatch} isDark={isDark}>
                            <Link to="chart">Chart</Link>
                        </Tab>
                        <Tab isActive={!priceMatch} isDark={isDark}>
                            <Link to="price">Price</Link>
                        </Tab>
                    </Tabs>
                </>
            )}
        </Wrapper>
    );
}

export default CoinsDetail;
