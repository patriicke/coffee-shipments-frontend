import { NavigateFunction } from 'react-router-dom';

export const queryString = (query?: string): string => {
    return query ? `${query}` : '';
};

export const updateQuerySearchParams = (
    navigate: NavigateFunction,
    keyword: string
) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', keyword.toString());
    const newSearch = searchParams.toString();

    navigate(`${location.pathname}?${newSearch}`);
};
