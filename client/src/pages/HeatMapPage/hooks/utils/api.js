export const URL_API_RM = 'https://rickandmortyapi.com/api/episode?page=1';

export const api = (url, params = {}) =>
    fetch(url, params).then((response) => response.json());
