const baseUrl="https://restcountries.com/v3.1"

const fetchApi = async (search,filter="") => {

    try {
        console.log(`${baseUrl}/${search}/${filter}`);
        const res = await fetch(`${baseUrl}/${search}/${filter}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        alert ("Sorry, the country was not found"); // החזרת השגיאה למערכת הקריאה
    }

  };


  export {fetchApi}