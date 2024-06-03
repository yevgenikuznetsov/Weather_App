import { objectNotEmpty } from "../../util/util";
import CityCurrentDayWeather from "./CityCurrentDayWeather";
import CityFiveDayWeather from "./CityFiveDayWeather";
import { WeatherInformationWrapper } from "./style/MainStyle";

const WeatherDetails = ({selectedCity, isCityFavorite, setIsCityFavorite, currentDayForecast, fiveDayForecast, currentWeather}) => {
    return (
        <WeatherInformationWrapper>


            {objectNotEmpty(currentDayForecast) &&
                <CityCurrentDayWeather selectedCity={selectedCity}
                                       currentWeather={currentWeather}
                                       isCityFavorite={isCityFavorite}
                                       setIsCityFavorite={setIsCityFavorite}
                                       currentDayForecast={currentDayForecast}
                />
            }

            {fiveDayForecast.length > 1 && 
                <CityFiveDayWeather fiveDayForecast={fiveDayForecast}/>
            }
      </WeatherInformationWrapper>
    )
}

export default WeatherDetails;