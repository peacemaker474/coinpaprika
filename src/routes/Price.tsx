import styled from "styled-components";
import { PriceData } from "../interface";

const Overview = styled.section`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${props => props.theme.accentColor};
    color: ${props => props.theme.textColor};
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

interface PriceProps {
    coinId: string | undefined;
    tickersData: PriceData | undefined;
}

function Price({coinId, tickersData}: PriceProps) {
    return (
        <>
            <Overview>
                <PriceTitle> Prcie: </PriceTitle>
                <PriceInfo> $ {tickersData?.quotes.USD.price} </PriceInfo>
            </Overview>
            <Overview>
                <PriceTitle> Max change rate in last 24h: </PriceTitle>
                <PriceInfo> {tickersData?.quotes.USD.market_cap_change_24h} % </PriceInfo>
            </Overview>
            <Overview>
                <PriceTitle> Change rate (last 30 Minutes):  </PriceTitle>
                <PriceInfo> {tickersData?.quotes.USD.percent_change_30m} % </PriceInfo>
            </Overview>
            <Overview>
                <PriceTitle> Change rate (last 1 hours):  </PriceTitle>
                <PriceInfo> {tickersData?.quotes.USD.percent_change_1h} % </PriceInfo>
            </Overview>
            <Overview>
                <PriceTitle> Change rate (last 6 hours):  </PriceTitle>
                <PriceInfo> {tickersData?.quotes.USD.percent_change_6h} % </PriceInfo>
            </Overview>
            <Overview>
                <PriceTitle> Change rate (last 12 hours):  </PriceTitle>
                <PriceInfo> {tickersData?.quotes.USD.percent_change_12h} % </PriceInfo>
            </Overview>
        </>
    )
}

export default Price;