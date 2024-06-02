import { getCountryAndRegion } from "../../util/util";
import { TextWrapper } from "./style/FavoriteStyle";

const FavoriteText = ({favorite}) => {
    return (
        <TextWrapper>
            <p className="main-title">{favorite.LocalizedName}</p>
            <p>{getCountryAndRegion(favorite)}</p>
        </TextWrapper>
    )
}

export default FavoriteText;