import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { ICoinPrice } from "../../pages/CoinsPage";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from "../../atoms/atom";

const Wrapper = styled.div`
    width: 100%;
    height: 30%;
`;

const Overview = styled.section<{ isDark: boolean }>`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme, isDark }) => isDark ? theme.black.boxColor : theme.white.boxColor};
    box-shadow: ${({ isDark }) => isDark ? "none" : "4px 12px 30px 6px rgb(0 0 0 / 9%)"};
    color: ${({ theme, isDark }) => isDark ? theme.black.textColor : theme.white.textColor};
    border-radius: 15px;
    margin-bottom: 10px;
`;

const PriceTitle = styled.span`
    display: block;
    padding-left: 10px;
    width: 50%;
    height: 100%;
    line-height: 50px;
    font-size: 14px;
`;

const PriceInfo = styled(PriceTitle)`
    padding-left: 0;
    font-size: 16px;
`;

interface IPriceProps {
    coinPrice: ICoinPrice;
}

function CoinPrice() {
    const isDark = useRecoilValue(isDarkAtom);
    const { coinPrice } = useOutletContext<IPriceProps>();


    return (
        <Wrapper>
            <Overview isDark={isDark}>
                <PriceTitle> Prcie: </PriceTitle>
                <PriceInfo> $ {coinPrice?.quotes.USD.price} </PriceInfo>
            </Overview>
            <Overview isDark={isDark}>
                <PriceTitle> Max change rate in last 24h: </PriceTitle>
                <PriceInfo> {coinPrice?.quotes.USD.market_cap_change_24h} % </PriceInfo>
            </Overview>
            <Overview isDark={isDark}>
                <PriceTitle> Change rate (last 30 Minutes):  </PriceTitle>
                <PriceInfo> {coinPrice?.quotes.USD.percent_change_30m} % </PriceInfo>
            </Overview>
            <Overview isDark={isDark}>
                <PriceTitle> Change rate (last 1 hours):  </PriceTitle>
                <PriceInfo> {coinPrice?.quotes.USD.percent_change_1h} % </PriceInfo>
            </Overview>
            <Overview isDark={isDark}>
                <PriceTitle> Change rate (last 6 hours):  </PriceTitle>
                <PriceInfo> {coinPrice?.quotes.USD.percent_change_6h} % </PriceInfo>
            </Overview>
            <Overview isDark={isDark}>
                <PriceTitle> Change rate (last 12 hours):  </PriceTitle>
                <PriceInfo> {coinPrice?.quotes.USD.percent_change_12h} % </PriceInfo>
            </Overview>
        </Wrapper>
    );
}

export default CoinPrice;