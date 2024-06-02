import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherDetails } from "../../redux/action/WeatherAction";
import { resetErrorState, setSlectedCity } from "../../redux/slices/WeatherReducer";
import SearchMainPanel from "./SearchMainPanel";
import CityDropdown from "./CityDropdown";
import CityCurrentDayWeather from "./CityCurrentDayWeather";
import CityFiveDayWeather from "./CityFiveDayWeather";
import ErrorSnackbar from "../../UI/ErrorSnackbar";
import Loading from "../../UI/Loading";
import { MainWrapper, WeatherInformationWrapper, WeatherWrapper } from "./style/MainStyle";

const Main = () => {
    const favoriteCities = useSelector(state => state.favorites.favoriteCities);
    const { cityMatches, isLoading, errorFetchMessage, selectedCity, cityWeather } = useSelector(state => state.weather);

    const [isCityFavorite, setIsCityFavorite] = useState(false);

    const {cityKey, fiveDayForecast, currentDayForecast} = cityWeather;

    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(selectedCity).length !== 0) {
            if (cityKey !== selectedCity.Key) {
                dispatch(fetchWeatherDetails(selectedCity.Key));
            }
        
            setIsCityFavorite(favoriteCities.some(favorite => favorite.Key === selectedCity.Key));  
        }
    }, [cityKey, dispatch, favoriteCities, selectedCity]);

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

            {cityKey &&
              <WeatherInformationWrapper>
                <CityCurrentDayWeather selectedCity={selectedCity}
                                       isCityFavorite={isCityFavorite}
                                       setIsCityFavorite={setIsCityFavorite}
                                       currentDayForecast={currentDayForecast}
                />

                <CityFiveDayWeather fiveDayForecast={fiveDayForecast}/>
              </WeatherInformationWrapper>
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