import React from "react";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}, likeStatus, dislikeStatus}) => {
    const LikeStatusIcon = () => {
        let style = {color: 'orange'}
        if (!likeStatus && ! tuit.stats.likeStatus) {
            style = {}
        }
        return <i className="fa-solid fa-thumbs-up" style={style}></i>
    }

    const DislikeStatusIcon = () => {
        let style = {color: 'blue'}
        if (!dislikeStatus && ! tuit.stats.dislikeStatus) {
            style = {}
        }
        return<i className="fa-solid fa-thumbs-down" style={style}></i>
    }

    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                 tuit.stats && <LikeStatusIcon/>
              }
              {tuit.stats && tuit.stats.likes}
          </span>
        </div>
      <div className="col">
          <span onClick={() => dislikeTuit(tuit)}>
              {
                  tuit.stats  && <DislikeStatusIcon/>
              }
              {tuit.stats && tuit.stats.dislikes}
          </span>
      </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;
