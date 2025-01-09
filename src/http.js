export async function fetchData() {
    console.log('llegue');
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const resData = await response.json();

    if(!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return resData.categories;   
}