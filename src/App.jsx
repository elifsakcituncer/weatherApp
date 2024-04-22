import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState([
    'Ankara',
    'Istanbul',
    'Izmir',
    'Adana',
    'Bursa',
    'Bolu',
    'Mardin',
    'Eskişehir',
    'Gaziantep',
    'Hatay',
    'Konya',
    'Malatya',
    'Muğla',
    'Tokat',

    // Daha fazla şehir ekleyebilirsiniz
  ]);

  // Seçilen şehre göre hava durumu verilerini güncellemek için useEffect kullanımı
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WWEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Hava durumu verileri yüklenemedi:', error);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  // Konum değişikliğini işleyen fonksiyon
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'>Hava Durumu Uygulaması</h1>
        <div className='input-container'>
          <input
            className='location-input'
            type='text'
            placeholder='Şehir giriniz'
            value={location}
            onChange={handleLocationChange}
          />
        </div>

        <div className='sidebar'>
          <h2>Şehir Seçimi</h2>
          <select onChange={handleLocationChange} value={location}>
            <option value="">Şehir seçiniz</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        {weatherData && (
          <div className='weather-container'>
            {weatherData.forecast.forecastday.map((day) => (
              <div className='day-container' key={day.date}>
                <h2 className='date'>{day.date}</h2>
                <img
                  className='weather-icon'
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
                <p className='temperature'>{day.day.avgtemp_c}°C</p>
                <p className='temperature'>{day.day.condition.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;