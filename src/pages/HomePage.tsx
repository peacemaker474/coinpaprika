import styled from 'styled-components';
import CoinLists from '../components/CoinLists/CoinLists';

const HomeWrapper = styled.div`
    max-width: 480px;
    margin: 0 auto;
`;

const HomeMain = styled.main`
    height: 90%;
`;

function HomePage() {
    return (
        <HomeWrapper>
            <HomeMain>
                <CoinLists />
            </HomeMain>
        </HomeWrapper>
    )
}

export default HomePage;