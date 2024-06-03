import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherDetails } from "../../redux/action/WeatherAction";
import { resetErrorState, setSlectedCity } from "../../redux/slices/WeatherReducer";
import SearchMainPanel from "./SearchMainPanel";
import CityDropdown from "./CityDropdown";
import ErrorSnackbar from "../../UI/ErrorSnackbar";
import Loading from "../../UI/Loading";
import { MainWrapper, WeatherWrapper } from "./style/MainStyle";
import WeatherDetails from "./WeatherDetails";
import { objectNotEmpty } from "../../util/util";

const Main = () => {
    const favoriteCities = useSelector(state => state.favorites.favoriteCities);
    const { cityMatches, isLoading, errorFetchMessage, selectedCity, cityWeather } = useSelector(state => state.weather);

    const [isCityFavorite, setIsCityFavorite] = useState(false);

    const {cityKey, fiveDayForecast, currentDayForecast, currentWeather} = cityWeather;

    const dispatch = useDispatch();

    useEffect(() => {
      if (objectNotEmpty(selectedCity) && cityWeather.cityKey !== selectedCity.Key) {
          dispatch(fetchWeatherDetails(selectedCity.Key));
      }
    }, [selectedCity, dispatch, cityWeather.cityKey]);

    useEffect(() => {
      if (objectNotEmpty(selectedCity)) {
          setIsCityFavorite(favoriteCities.some(favorite => favorite.Key === selectedCity.Key));  
      }
    }, [favoriteCities, selectedCity]);

    useEffect(() => {
        if (cityMatches.length === 1) {
          dispatch(setSlectedCity(cityMatches[0]));
        }
    }, [cityMatches, dispatch]);

    const handleCloseSnack = () => {
        dispatch(resetErrorState());
    } 

    return (
        <MainWrapper>
          <WeatherWrapper>
            <SearchMainPanel isLoading={isLoading}
                             selectedCity={selectedCity.LocalizedName}
            />

            {cityMatches.length > 1 && (
              <CityDropdown cityMatches={cityMatches}
                            selectedCityKey={selectedCity?.Key}  
              />
            )}

            {cityKey && <WeatherDetails selectedCity={selectedCity}
                                        currentWeather={currentWeather}
                                	      isCityFavorite={isCityFavorite}
                                        fiveDayForecast={fiveDayForecast}
                                        setIsCityFavorite={setIsCityFavorite}
                                        currentDayForecast={currentDayForecast} />
            }  
          </WeatherWrapper>

          <Loading isLoading={isLoading}/>

          <ErrorSnackbar autoHideDuration={6000} 
                         onClose={handleCloseSnack} 
                         message={errorFetchMessage.errorMsg}
                         isOpen={errorFetchMessage.isOpenAlert} 
          />
        </MainWrapper>
    )
}

export default Main;