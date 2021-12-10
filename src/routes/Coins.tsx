import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api/api';
import Loading from '../components/Loading';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import ChangeBtn from '../components/ChangeBtn';

const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    height: 100vh;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    font-size: 36px;
    color: ${props => props.theme.textColor};
`;

const AllCoin = styled.ul``;

const CoinList = styled.li`
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid ${props => props.theme.accentColor};
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        color: ${props => props.theme.textColor};
        transition: color, .2s, ease-in;
        font-size: 22px;
        text-decoration: none;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins () {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Helmet>
                <title> 1405 Coin </title>
            </Helmet>
            <Header>
                <Title> 1405 Coin </Title>
                <ChangeBtn />
            </Header>
            {isLoading ? (
                <Loading />
            ) : (
                <AllCoin>
                    {data?.slice(0, 100).map(coin => (
                        <CoinList key={coin.id}>
                            <Link to={`/${coin.id}`} state={{name: coin.name}}>
                                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`} />
                                {coin.name} &rarr;
                            </Link>
                        </CoinList>
                    ))}
                </AllCoin>
            )}
        </Container>
    );
}

export default Coins;