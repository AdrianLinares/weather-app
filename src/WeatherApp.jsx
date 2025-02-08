// Importamos useState de React para manejar el estado de nuestros componentes
import { useState } from "react";
// Importamos la imagen que usaremos en el encabezado
import image from "./components/weather.png";

// Definimos el componente principal WeatherApp como una función
export const WeatherApp = () => {
    // Obtenemos las variables de entorno necesarias para la API
    const urlBase = import.meta.env.VITE_BASE_URL; // URL base de la API
    const API_KEY = import.meta.env.VITE_API_KEY; // Clave de API necesaria para hacer peticiones

    // Definimos los estados (variables que cuando cambian hacen que el componente se actualice)
    const [city, setCity] = useState(""); // Estado para guardar el nombre de la ciudad
    const [dataWeather, setdataWeather] = useState(null); // Estado para guardar los datos del clima
    const [error, setError] = useState(""); // Estado para manejar mensajes de error

    // Función que se ejecuta cada vez que el usuario escribe en el input
    const handleChangeCity = (e) => {
        setCity(e.target.value); // Actualiza el estado 'city' con lo que el usuario escribe
    };

    // Función que se ejecuta cuando se envía el formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        const trimmedCity = city.trim(); // Elimina espacios en blanco al inicio y final

        // Verifica si el campo está vacío
        if (!trimmedCity) {
            setError("Please enter a city name");
            setdataWeather(null);
            return;
        }

        // Verifica si el nombre de la ciudad contiene caracteres válidos
        const cityRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;
        if (!cityRegex.test(trimmedCity)) {
            setError(
                "Invalid city name. Only letters, accents, spaces, hyphens and apostrophes are allowed"
            );
            setdataWeather(null);
            return;
        }

        setError(""); // Limpia cualquier error previo
        setCity(trimmedCity); // Actualiza el estado con la ciudad sin espacios extras
        fetchWeather(); // Llama a la función que obtiene los datos del clima
    };

    // Función asíncrona que hace la petición a la API del clima
    const fetchWeather = async () => {
        try {
            // Hace la petición a la API usando fetch
            const response = await fetch(`${urlBase}key=${API_KEY}&q=${city}`);

            // Verifica si la respuesta no fue exitosa
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }

            // Si la respuesta fue exitosa, convierte los datos a JSON
            const data = await response.json();
            setdataWeather(data); // Guarda los datos del clima en el estado
            setError(""); // Limpia cualquier error previo
        } catch (error) {
            // Si ocurre algún error durante la petición
            console.error("An error has occurred: ", error);
            setError(error.message || "Failed to fetch weather data");
            setdataWeather(null);
        }
    };

    // Renderizado del componente (lo que se muestra en pantalla)
    return (
        <div className="container">
            {/* Encabezado con imagen y título */}
            <h1>
                <img src={image} alt="Weather icon" />
                Simple Weather App
            </h1>

            {/* Formulario para buscar una ciudad */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={handleChangeCity}
                    placeholder="Enter city name"
                />
                <button type="submit">Search</button>
            </form>

            {/* Muestra mensaje de error si existe */}
            {error && <div className="error">{error}</div>}

            {/* Muestra los resultados del clima si existen datos */}
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
                        <img
                            src={dataWeather.current.condition.icon}
                            alt="Weather condition icon"
                        />
                    </h2>
                    <h2>Real Feel: {dataWeather.current.feelslike_c} °C</h2>
                    <h2>Humidity: {dataWeather.current.humidity} %</h2>
                    <h2>Wind: {dataWeather.current.gust_kph} Km/h</h2>
                    <p className="p">
                        Local Time: {dataWeather.location.localtime}
                    </p>
                    <p className="p">Time Zone: {dataWeather.location.tz_id}</p>

                    {/* Atribución requerida por la API */}
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
