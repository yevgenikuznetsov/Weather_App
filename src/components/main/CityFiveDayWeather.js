import styled from "styled-components";
import Card from "../../UI/Card";
import WeatherIcon from "../../UI/WeatherIcon";

const Wrapper = styled.div`
    gap: 13px;
    display: flex;
    margin-top: 30px;
    justify-content: space-around;
`

const WeatherDate = styled.p`
    margin: 0;
    font-weight: bold;
    text-align: center;
    padding-bottom: 15px;
`

const CityFiveDayWeather = ({fiveDayForecast}) => {
    return (
        <Wrapper>
            {fiveDayForecast.map((day, index) => (
                <Card key={index}>
                    <WeatherDate>{new Date(day.Date).toLocaleDateString()}</WeatherDate>
                    <WeatherIcon showOnlyIcon={false}
                                 iconId={day.Day.Icon}
                                 iconName={day.Day.IconPhrase}
                    />

                    <p>{day.Temperature.Minimum.Value}°C - {day.Temperature.Maximum.Value}°C</p>
                </Card>
            ))}
        </Wrapper>
    )
}

export default CityFiveDayWeather;
