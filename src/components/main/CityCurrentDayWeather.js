import styled from "styled-components";
import Card from "../../UI/Card";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/slices/FavoritesReducer";

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const HeaderTitle = styled.p`
    margin: 0;
    font-size: 30px;
    font-weight: bold;
`

const HeaderSubTitle = styled.p`
    margin: 0;
`

const InformationCurrentDayForecastWrapper = styled.div`
    display: flex;
    padding-top: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

const TempratureTitle = styled.p`
    font-weight: bold;
`

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
                        {isCityFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
            </HeaderWrapper>

            <InformationCurrentDayForecastWrapper>
                <div>Icon</div>

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