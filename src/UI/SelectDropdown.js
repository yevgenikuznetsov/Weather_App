import { MenuItem } from "@mui/material";

const SelectDropdown = ({value, onChange, SelectedComponent, emptyValueString, options, calculateValue}) => {
    return (
        <SelectedComponent value={value}
                           displayEmpty
                           onChange={onChange}
        >

        <MenuItem value="" disabled>{emptyValueString}</MenuItem>

        {options.map((option) => (
            <MenuItem key={option.Key} value={option.Key}>
                {calculateValue(option)}
            </MenuItem>
        ))}
        
        </SelectedComponent>
    );
}

export default SelectDropdown;