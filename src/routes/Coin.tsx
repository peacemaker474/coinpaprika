import { useQuery } from "react-query";
import { Route, Routes, useLocation, useParams, useMatch } from "react-router";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from "../api/api";
import Chart from "./Chart";
import Price from "./Price";
import { PriceData } from "../interface";
import Loading from "../components/Loading";
import ChangeBtn from "../components/ChangeBtn";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
    color: ${props => props.theme.textColor};
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const HomeLink = styled(Link)`
    width: 30px;
    height: 30px;
    display: block;
    position: absolute;
    top: 45%;
    left: 10%;
    transform: translateY(-45%);
    font-size: 28px;
    text-align: center;
    background-color: white;
    color: black;
    border-radius: 50%;
    line-height: 35px;
    text-decoration: none;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.boxColor};
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
    text-align: center;
    text-trasnform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: ${props => props.theme.boxColor};
    padding: 7px 0;
    border-radius: 10px;
    color: ${props => 
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
        color: ${props => props.theme.textColor};
        text-decoration: none;
    }
`;


interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    contract: string;
    platform: string;
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

function Coin () {
    const { coinId } = useParams();
    const {state} = useLocation();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const {
        isLoading: infoLoading,
        data: infoData
    } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const {
        isLoading: tickersLoading, 
        data: tickersData
    } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {
        refetchInterval: 5000,
    });
    const loading = infoLoading || tickersLoading;

    return (
        <Container>
            <Helmet>
                <title> {state?.name ? state.name : loading ? "Loading" : infoData?.name} </title>
            </Helmet>
            <Header>
                <HomeLink to="/"> &larr; </HomeLink>
                <Title> {state?.name ? state.name : loading ? "Loading" : infoData?.name} </Title>
                <ChangeBtn />
            </Header>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span> Rank:</span>
                            <span> {infoData?.rank} </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span> Symbol: </span>
                            <span> {infoData?.symbol} </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span> Price: </span>
                            <span> {tickersData?.quotes.USD.price} </span>
                        </OverviewItem>
                    </Overview>
                    <Description> {infoData?.description} </Description>
                    <Overview>
                        <OverviewItem>
                            <span> Total Supply: </span>
                            <span> {tickersData?.total_supply} </span>
                        </OverviewItem>
                        <OverviewItem>
                            <span> Max Supply </span>
                            <span> {tickersData?.max_supply} </span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}> Price </Link>
                        </Tab>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}> Chart </Link>
                        </Tab>
                    </Tabs>
                    <Routes>
                        <Route path="price" element={ <Price coinId={coinId} tickersData={tickersData}/>} />
                        <Route path="chart" element={ <Chart coinId={coinId}/>} />
                    </Routes>
                </>
            )
            }
        </Container>
    )
}

export default Coin;