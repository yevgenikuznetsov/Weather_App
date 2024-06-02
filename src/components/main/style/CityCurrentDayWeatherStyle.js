import styled from "styled-components"

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const HeaderTitle = styled.p`
    margin: 0;
    font-size: 30px;
    font-weight: bold;
`

export const HeaderSubTitle = styled.p`
    margin: 0;
`

export const InformationCurrentDayForecastWrapper = styled.div`
    display: flex;
    padding-top: 15px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`

export const TempratureTitle = styled.p`
    font-weight: bold;
`

export const WrapperIconsWeather = styled.div`
    gap: 60px;
    display: flex;

    p {
        font-weight: bold;
    }
`