export async function fetchData(endpoint, query) {

    let url = `https://www.themealdb.com/api/json/v1/1/${ endpoint }.php`;

    if(query) {
        url += `?${ query }`;
    }
    
    const response = await fetch(url);
    const resData = await response.json();

    if(!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return resData;   
};