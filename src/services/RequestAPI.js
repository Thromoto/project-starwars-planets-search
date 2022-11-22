const requestApi = async () => {
  try {
    const response = await fetch('https://swapi.dev/api/planets');
    const { results } = await response.json();
    const data = Object.values(results).filter((el) => el !== 'residents');
    console.log(data);
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default requestApi;
