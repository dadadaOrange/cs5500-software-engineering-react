import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikeService from "../../services/dislike-service";
import * as service from "../../services/tuits-service";

/**
 * Tuits component that has a list of tuit object
 * @param tuits tuit array
 * @param refreshTuits function that renders the refreshed list updated from backend
 * @returns {JSX.Element}
 * @constructor
 */
const Tuits = ({tuits = [], refreshTuits, likeStatus, dislikeStatus}) => {
    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    const dislikeTuit = (tuit) =>
        dislikeService.userDislikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map(tuit =>
                  <Tuit key={tuit._id}
                        deleteTuit={deleteTuit}
                        likeTuit={likeTuit}
                        dislikeTuit={dislikeTuit}
                        tuit={tuit}
                        likeStatus={likeStatus}
                        dislikeStatus={dislikeStatus}
                  />)
            }
          </ul>
        </div>
      );
}

export default Tuits;
