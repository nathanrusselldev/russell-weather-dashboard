var cityArray = []
var APIkey = "3b1450fc2cf02f3c6fdcfa78f0c49954"


function searchCity() {
    cityName = $(".input_text").val();
    cityArray.push(cityName);
    console.log("you can use jquery(sort of)") // sanity checks
    console.log(cityArray) // sanity checks
    console.log(cityName) // sanity checks
    getWeather()

}

$(".submit").click(searchCity)

function getWeather() {

    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&units=Imperial&appid=" + APIkey;

    fetch(requestURL)
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            console.log(data.name)
            
            $(".city").text(data.name)
            $(".descr").text(data.weather[0].description)
            $(".temp").text("Temperature: " + data.main.temp +"° Farenheit")
            $(".humidity").text("Humidity: " + data.main.humidity + "%")
        
        function getUv() {

            var longitude = data.coord.lat
            var latitude = data.coord.lon
            var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latitude +"&lon="+ longitude +"&exclude=hourly,daily&appid=" + APIkey;

            fetch(uvUrl)
                .then(function(response2) {
                    console.log(response2)
                    return response2.json()
                })
                .then(function(data2) {
                    console.log(data2)
                    $(".uv").text("Uvi Index: " + data2.current.uvi);

                    var uvDanger = data2.current.uvi;

                    if (uvDanger < 2) {
                        $(".uv").addClass("bg-success");
                    }

                    else {
                        $(".uv").addClass("bg-light");
                    }

                })
        }
        getUv() 
        
    })   
    

}


