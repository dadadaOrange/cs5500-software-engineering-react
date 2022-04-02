import Tuits from "../tuits";
import * as service from "../../services/dislike-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);

    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike} likeStatus={false} dislikeStatus={true}/>
        </div>
    );
};
export default MyDislikes;

