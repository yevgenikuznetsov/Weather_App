import Card from "../../UI/Card";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slices/FavoritesReducer";
import WeatherIcon from "../../UI/WeatherIcon";
import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../../constants/FavoritesConst";
import { HeaderSubTitle, HeaderTitle, HeaderWrapper, InformationCurrentDayForecastWrapper, TempratureTitle, TitleWrapper, WrapperIconsWeather } from "./style/CityCurrentDayWeatherStyle";



const CityCurrentDayWeather = ({selectedCity, currentDayForecast, isCityFavorite, setIsCityFavorite}) => {
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
        <Card width={'700px'} height={'200px'}>
            <HeaderWrapper>
                <TitleWrapper>
                    <HeaderTitle>{selectedCity.LocalizedName}, {selectedCity.Country.ID}</HeaderTitle>
                    <HeaderSubTitle>{new Date(currentDayForecast.Date).toLocaleDateString()}</HeaderSubTitle>
                </TitleWrapper>

                <Button onClick={toggleFavoriteCity}>
                        {isCityFavorite ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES }
                </Button>
            </HeaderWrapper>

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

                <div>
                    <TempratureTitle>Temperature:</TempratureTitle>
                    <div>
                        <div>Minimum: {currentDayForecast.Temperature?.Minimum.Value} °C</div>
                        <div>Maximum {currentDayForecast.Temperature?.Maximum.Value} °C</div>
                    </div>
                </div>
            </InformationCurrentDayForecastWrapper>
        </Card>
    )
}

export default CityCurrentDayWeather;