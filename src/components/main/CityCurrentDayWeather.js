import Card from "../../UI/Card";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slices/FavoritesReducer";
import WeatherIcon from "../../UI/WeatherIcon";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../../constants/FavoritesConst";
import { CurrentWeatherWrapper, HeaderSubTitle, HeaderTitle, HeaderWrapper, InformationCurrentDayForecastWrapper, TemperatureDetails, TempratureTitle, TitleWrapper, WrapperIconsWeather } from "./style/CityCurrentDayWeatherStyle";
import { objectNotEmpty } from "../../util/util";
import CurrentCityWeather from "./CurrentWeather";

const CityCurrentDayWeather = ({selectedCity, currentDayForecast, isCityFavorite, setIsCityFavorite, currentWeather}) => {
    const dispatch = useDispatch();

    const toggleFavoriteCity = () => {
        if (isCityFavorite) {
          dispatch(removeFavorite(selectedCity));
        } else {
          dispatch(addFavorite(selectedCity));
        }

        setIsCityFavorite(!isCityFavorite);
      };

    return (
        <Card width={'700px'} height={'340px'}>
            <HeaderWrapper>
                <TitleWrapper>
                    <HeaderTitle>{selectedCity.LocalizedName}, {selectedCity.Country.ID}</HeaderTitle>
                    <HeaderSubTitle>{new Date(currentDayForecast.Date).toLocaleDateString()}</HeaderSubTitle>
                </TitleWrapper>

                <Button onClick={toggleFavoriteCity}>
                        {isCityFavorite ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES }
                </Button>
            </HeaderWrapper>

            {objectNotEmpty(currentWeather) && 
                <CurrentWeatherWrapper>
                    <CurrentCityWeather currentCityWeather={currentWeather}/>
                </CurrentWeatherWrapper>
            }

            {objectNotEmpty(currentDayForecast) &&
                <InformationCurrentDayForecastWrapper>
                    <WrapperIconsWeather>
                        <div>
                            <p>Day:</p>
                            <WeatherIcon iconId={currentDayForecast.Day.Icon} iconName={currentDayForecast.Day.IconPhrase}/>
                        </div>
                        <div>
                            <p>Night:</p>
                            <WeatherIcon iconId={currentDayForecast.Night.Icon} iconName={currentDayForecast.Night.IconPhrase}/>
                        </div>
                    </WrapperIconsWeather>

                    <TemperatureDetails>
                        <TempratureTitle>Temperature:</TempratureTitle>
                        <div>
                            <div>Minimum: {currentDayForecast.Temperature?.Minimum.Value} °C</div>
                            <div>Maximum {currentDayForecast.Temperature?.Maximum.Value} °C</div>
                        </div>
                    </TemperatureDetails>
                </InformationCurrentDayForecastWrapper>
    	    }
        </Card>
    )
}

export default CityCurrentDayWeather;