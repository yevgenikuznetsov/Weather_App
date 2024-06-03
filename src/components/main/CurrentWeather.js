import styled from "styled-components";
import WeatherIcon from "../../UI/WeatherIcon";

const Wrapper = styled.div`
    gap: 20px;
    display: flex;
    font-size: 18px;
    font-weight: bold;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    
    .weather-temp {
        margin: 0;
        font-size: 30px;
    }
`

const CurrentCityWeather = ({currentCityWeather}) => {
    return (
        <Wrapper>
            <WeatherIcon showOnlyIcon={true}
                                 iconId={currentCityWeather.WeatherIcon}
                                 iconName={currentCityWeather.WeatherText}
            />

            <p className='weather-temp'>{currentCityWeather.Temperature.Metric.Value || ''}°C</p>
        
        
        </Wrapper>
    )
}

export default CurrentCityWeather;