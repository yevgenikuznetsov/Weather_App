import { useCallback, useState } from "react";
import SearchPanel from "../../UI/SearchPanel";
import { isEnglishLetter } from "../../util/util";
import { useDispatch } from "react-redux";
import { resetWeatherState } from "../../redux/slices/WeatherReducer";
import { fetchCityDetails } from "../../redux/action/WeatherAction";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
    gap: 30px;
    display: flex;
    padding-top: 50px;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`

const SearchTextField = styled(TextField)`
opacity: 0.8;
width: 610px;
background: white;


`

const SearchMainPanel = ({isLoading, selectedCity}) => {
    const [citySearch, setCitySearch] = useState({ citySearchName: selectedCity || '', isNameValid: true });

    const dispatch = useDispatch();

    const handleSearch = useCallback(() => {
        const cityName = citySearch.citySearchName;

        if(isLoading) {
            return;
        }

        if(cityName.length === 0) {
            dispatch(resetWeatherState());
            return;
        }

        if(!isEnglishLetter(cityName)) {
            setCitySearch({...citySearch, isNameValid: false})
            return;
        } else if (!cityName.isNameValid) {
            setCitySearch({...citySearch, isNameValid: true})
        }

        dispatch(fetchCityDetails(cityName));
      }, [citySearch, dispatch, isLoading]);

      const handlerBlur = () => {
        const cityName = citySearch.citySearchName;

        if(!isEnglishLetter(cityName)) {
            setCitySearch({...citySearch, isNameValid: false})
        } else if (!cityName.isNameValid) {
            setCitySearch({...citySearch, isNameValid: true})
        }
      };

      const handlerOnChnage = (e) => {
        setCitySearch({...citySearch, citySearchName: e.target.value})
      }

    return (
        <Wrapper>
            <SearchPanel label="City Name"
                         onBlur={handlerBlur}
                         onChange={handlerOnChnage}
                         SearchTextField={SearchTextField}     
                         placeholder="For example: Tel Aviv"
                         isErrorInput={!citySearch.isNameValid}
                         inputValue={citySearch.citySearchName}       
                          
                         errorMessage={'Must contain only English letters'}
            />

            <Button variant="outlined" color="primary" onClick={handleSearch}>
                Search
            </Button>
        </Wrapper>
    )
}

export default SearchMainPanel;