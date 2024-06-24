import FavoriteProducts from "../componentsJSX/FavoriteProducts";
import Recommand from "../componentsJSX/Recommand";

const Favorite = () => {
    return (
        <div className="favorite-page">
            <FavoriteProducts />
            <Recommand />
        </div>
    );
};

export default Favorite;
