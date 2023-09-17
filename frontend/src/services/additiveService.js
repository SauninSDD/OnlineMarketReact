import axios from "axios";
import {setAdditives} from "../slices/additivesSlice";

const API_URL = "/additives";

const getAdditives = (dispatch) => {
    return axios.get(API_URL).then(
        (response) => {
            dispatch(setAdditives(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();

            console.error(_content)

            dispatch(setAdditives([]));
        });

};


const additiveService = {
    getAdditives,
};

export default additiveService