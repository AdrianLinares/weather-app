import { useState } from "react";
import image from "./components/weather.png";
export const WeatherApp = () => {
    const urlBase = import.meta.env.VITE_BASE_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [city, setCity] = useState("");
    const [dataWeather, setdataWeather] = useState(null);
    const [error, setError] = useState("");

    const handleChangeCity = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedCity = city.trim();

        // Validación básica
        if (!trimmedCity) {
            setError("Please enter a city name");
            setdataWeather(null);
            return;
        }

        // Validación con regex para nombres de ciudades
        const cityRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
        if (!cityRegex.test(trimmedCity)) {
            setError(
                "Invalid city name. Only letters, accents, spaces, hyphens and apostrophes are allowed"
            );
            setdataWeather(null);
            return;
        }

        setError(""); // Limpiar errores si la validación es exitosa
        setCity(trimmedCity); // Actualizar con versión sin espacios
        fetchWeather();
    };

    const fetchWeather = async () => {
        try {
            const response = await fetch(`${urlBase}key=${API_KEY}&q=${city}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }

            const data = await response.json();
            setdataWeather(data);
            // console.log(data);
            setError(""); // Limpiar errores si la solicitud es exitosa
        } catch (error) {
            console.error("An error has occurred: ", error);
            setError(error.message || "Failed to fetch weather data");
            setdataWeather(null);
        }
    };

    return (
        <div className="container">
            <h1>
                <img src={image} />
                Simple Weather App
            </h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={handleChangeCity}
                    placeholder="Enter city name"
                />
                <button type="submit">Search</button>
            </form>

            {error && <div className="error">{error}</div>}

            {dataWeather && (
                <div className="weather-results">
                    <p className="attribution">City / Country / Region</p>
                    <h2>
                        {dataWeather.location.name} /{" "}
                        {dataWeather.location.country} /{" "}
                        {dataWeather.location.region}
                    </h2>
                    <p className="attribution">Current Weather:</p>
                    <h2>
                        {dataWeather.current.temp_c} °C /{" "}
                        {dataWeather.current.condition.text}
                        <br />
                        <img src={dataWeather.current.condition.icon} />
                    </h2>
                    <h2>Real Feel: {dataWeather.current.feelslike_c} °C</h2>
                    <h2>Humidity: {dataWeather.current.humidity} %</h2>
                    <h2>Wind: {dataWeather.current.gust_kph} Km/h</h2>
                    <p className="p">
                        Local Time: {dataWeather.location.localtime}
                    </p>
                    <p className="p">Time Zone: {dataWeather.location.tz_id}</p>

                    <p className="attribution">
                        Powered by{" "}
                        <a
                            href="https://www.weatherapi.com/"
                            title="Free Weather API"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WeatherAPI.com
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};
