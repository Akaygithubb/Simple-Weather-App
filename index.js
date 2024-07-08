//* Initializing variables

const temperaturefield = document.querySelector(".weather1");
const cityfield = document.querySelector(".weather2 p");
const datefield = document.querySelector(".weather2 span");
const weatherfield = document.querySelector(".weather3 span");
const emojifield = document.querySelector(".weather3 img");
const searchfield = document.querySelector(".searchfield");
const form = document.querySelector("form");


let target = "New Delhi";

//* fetching data function
const fetchdata = async (target) => {
    try {
        const url = (`
            https://api.weatherapi.com/v1/current.json?key=162e24c26b1340a2aed171035241106&q=${target}`);
            
                const response = await fetch(url);
                const data = await response.json();
            
                
                const { current: { temp_c, condition: { icon, text } }, location: { name, localtime } } = data;
                //* destructuring of data
                updatedom(temp_c, name,localtime, icon, text);
            }
     catch (error) {
       alert("location Not Found") 
    }
}


//* dom manipulation function
function updatedom(temp, city,time, emoji, text) {
    //* getting date time and day using split function
    const exactdate = time.split(" ")[0];
    const exacttime = time.split(" ")[1];
    const exactday = new Date(exactdate).getDay();
    temperaturefield.innerText = temp;
    cityfield.innerText = city;
    datefield.innerText=`${exacttime}-${getfulldayname(exactday)}-${exactdate}`;
    emojifield.src = emoji;
    weatherfield.innerText = text;
}

fetchdata(target);
//* this is for default value of all things or case


//* function to get date in strings
function getfulldayname(num) {
    switch (num) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";


        default:
            return "Dont Know";

    }
}


//* function to use in search button call
const search=(e)=>{
    e.preventDefault();
    target=searchfield.value;
    fetchdata(target);
}

//* adding eventlistener
form.addEventListener("submit",search);