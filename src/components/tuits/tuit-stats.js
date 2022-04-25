import React from "react";

/**
 * Component for showing tuit stats including number of replies, retuits, likes and dislikes.
 * User can also like, dislike, bookmark/unbookmark by clicking the according button.
 *
 * @param tuit Tuit object that has the stats
 * @param likeTuit function triggered when user click like button
 * @param dislikeTuit function triggered when user click dislike button
 * @param bookmarkTuit function triggered when user click bookmark button
 * @example
 * const tuit = {tuit: "my tuit", postedBy: "123", stats: {replies: 0, retuits: 0, likes: 0, dislikes: 0, bookmark: 0}}
 * const likeTuit = () => {}
 * const dislikeTuit = () => {}
 * const bookmarkTuit = () => {}
 * return (
 *      <TuitStats tuit={tuit}, likeTuit={likeTuit}, dislike={dislikeTuit} bookmark={bookmarkTuit}/>
 * )
 */
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
