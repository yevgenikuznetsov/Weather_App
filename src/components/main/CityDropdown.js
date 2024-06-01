import { Select } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSlectedCity } from "../../redux/slices/WeatherReducer";
import { setSelectedRowData } from "../../util/util";
import SelectDropdown from "../../UI/SelectDropdown";
import styled from "styled-components";

const CirtSelecteDropdown = styled(Select)`
    width: 500px;
    margin-top: 20px;
`

const CityDropdown = ({selectedCityKey, cityMatches}) => {
    const dispatch = useDispatch();

    const handleCitySelect = useCallback((event) => {
        const selectedOption = cityMatches.find(option => option.Key === event.target.value);

        dispatch(setSlectedCity(selectedOption));
      }, [dispatch, cityMatches]);

    return (
        <SelectDropdown options={cityMatches}
                        onChange={handleCitySelect}
                        value={selectedCityKey || ''}
                        calculateValue={setSelectedRowData}
                        SelectedComponent={CirtSelecteDropdown}
                        emptyValueString={"Select a City From The List"}
        />
    );
}

export default CityDropdown;