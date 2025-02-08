# Weather App

A simple and elegant weather application built with React that allows users to check current weather conditions for any city worldwide.

## Features

-   Real-time weather data fetching
-   Clean and responsive UI
-   Current temperature display
-   Weather conditions with icons
-   Additional weather details including:
    -   Real feel temperature
    -   Humidity levels
    -   Wind speed
    -   Local time
    -   Time zone information

## Technologies Used

-   React.js
-   CSS3 with Flexbox
-   WeatherAPI.com for weather data
-   Vite as build tool

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/weather-app.git
```

2. Navigate to the project directory:

```bash
cd weather-app
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add your WeatherAPI.com API key:

```env
VITE_API_KEY=your_api_key_here
VITE_BASE_URL=http://api.weatherapi.com/v1/current.json?
```

5. Start the development server:

```bash
npm run dev
```

## Usage

1. Enter a city name in the search box
2. Click the "Search" button or press Enter
3. View the current weather conditions for the specified city

## Input Validation

The app includes validation for city names:

-   Cannot be empty
-   Must contain only letters, accents, spaces, hyphens, and apostrophes

## Error Handling

The app handles various error scenarios:

-   Invalid city names
-   Network errors
-   API response errors
-   Empty input validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

-   Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
-   Icons and weather conditions from WeatherAPI.com
