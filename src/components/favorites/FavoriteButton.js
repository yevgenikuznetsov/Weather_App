import { Tooltip } from "@mui/material";
import FavoriteCityIcon from "../../UI/FavoriteCityIcon";

const FavoriteButton = ({onClick, favorite}) => {
    return (
        <Tooltip title="Remove From Favorites" placement="top" arrow>
            <div>
                <FavoriteCityIcon onClick={() => onClick(favorite)}/>
            </div>
      </Tooltip>
    )
}

export default FavoriteButton;