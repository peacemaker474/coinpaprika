const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchGetCoinLists = async () => {
    return fetch(`${BASE_URL}/coins`).then((res) =>
        res.json()
    );
}

export const fetchGetCoinInfo = async (coinId: string) => {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((res) =>
        res.json()
    );
}

export const fetchGetCoinPrice = async (coinId: string) => {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) =>
        res.json()
    );
}

export const fetchGetCoinHistory = async (coinId: string) => {
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((res) =>
        res.json()
    );
}