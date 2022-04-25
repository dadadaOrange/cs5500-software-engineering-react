/**
 * @file Implement api services for operations related to like
 */
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
  withCredentials: true
});

/**
 * Retrieves all tuits liked by the user from the backend.
 * @param userId
 * @returns a list of tuits
 */
export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

/**
 * Retrieves all users liked the tuit from the backend.
 * @param tid tuit id
 * @returns a list of users
 */
export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

/**
 * Update that the user liked the tuit
 * @param uid user id
 * @param tid tuit id
 * @returns like object
 */
export const userLikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);