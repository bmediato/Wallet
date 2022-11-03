const urlCoins = 'https://economia.awesomeapi.com.br/json/all';

const getCoins = async () => {
  const response = await fetch(urlCoins);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getCoins;
