import axios from "axios";
import jwt from "jsonwebtoken";

export const CREATE_USER = "CREATE_USER";
export const LOGIN_ACTION = "LOGIN_ACTION";
export const LOGOUT_ACTION = "LOGOUT_ACTION";
export const UPDATE_USER = "UPDATE_USER";
export const ADD_CLASS = "ADD_CLASS";
export const ADD_STUDENT = "ADD_STUDENT";
export const GET_CLASS_STUDENTS = "GET_CLASS_STUDENTS";
export const GET_CLASSES_STUDENTS = "GET_CLASSES_STUDENTS";
export const LOGIN_ERRORS = "LOGIN_ERRORS";
export const REGISTER_ERRORS = "REGISTER_ERRORS";
export const ERRORS = "ERRORS";
export const REDIRECT_DATA_CLASS = "REDIRECT_DATA_CLASS";


const USER_URL = process.env.REACT_APP_USER_URL;
const CLASS_URL = process.env.REACT_APP_CLASS_URL;

const dataEncrypt = data => jwt.sign(data, process.env.REACT_APP_ACCESS_KEY);

export function queryMyData(param, history) {
  return (dispatch, getState) => {
    console.log(param, history);
    const data = getState().classlist_students; //path.to.myData[param];
    console.log("DATA DATA DATA", data);
    const status = data ? "complete" : "loading";
    console.log("status", status);
    const promise = data
      ? Promise.resolve
      : dispatch(getClassStudentsAction(param.toString()));

    return { data, status, promise };
  };
}

export function queryAllMyData(param, history) {
  return (dispatch, getState) => {
    console.log(param, history);
    const data = getState().allClasses; //path.to.myData[param];
    console.log("DATA DATA DATA", data);
    const status = data ? "complete" : "loading";
    console.log("status", status);
    const promise = data
      ? Promise.resolve
      : dispatch(getClassesStudentsAction());

    return { data, status, promise };
  };
}
export const redirectDataClass = () => {
  return dispatch => {
    dispatch({
      type: REDIRECT_DATA_CLASS,
      classlist_students: null,
      allClasses: null
    });
  };
};

export const getClassStudentsAction = classname => {
  const token = localStorage.getItem("token");

  return dispatch => {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json", Authorization: token },
      url: `${CLASS_URL}${classname}`
    };
    axios(options)
      .then(res => {
        localStorage.removeItem("invalid");
        dispatch({
          type: GET_CLASS_STUDENTS,
          payload: res.data.students, //returns the array of student object data
          class_name: res.data.name,
          fetchSuccess: true
          // test: res
          //PAYLOAD {

          //     "hired": false,
          //     "_id": "5b79b4a6223c9800043f5a1e",
          //     "lastname": "Bueno",
          //     "firstname": "Abraham",
          //     "email": "abrambueno1992@gmail.com",
          //     "github": "abrambueno1992",
          //     "huntr": "abrambueno1992@gmail.com"
          // }
        });
      })
      .catch(err => {
        localStorage.setItem("invalid", err.response.data);
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  };
};
export const getClassesStudentsAction = () => {
  const token = localStorage.getItem("token");

  return dispatch => {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json", Authorization: token },
      url: `${CLASS_URL}`
    };
    axios(options)
      .then(res => {
        localStorage.removeItem("invalid");
        dispatch({
          type: GET_CLASSES_STUDENTS,
          payload: res.data,
          fetchClasses: true
        });
      })
      .catch(err => {
        localStorage.setItem("invalid", err.response.data);
        dispatch({
          type: ERRORS,
          payload: err.response.data,
          fetchClasses: true
          // allClasses: err.response.data,
          // allClasses ? (allClasses: action.allClasses ): (allClasses:  allClasses)
        });
      });
  };
};
export const addStudentAction = (classname, studentData) => {
  //STUDENT DATA {
  //     "lastname": "Bueno",
  //     "firstname": "Abraham",
  //     "email": "abrambueno1992@gmail.com",
  //     "github": "abrambueno1992",
  //     "huntr": "abrambueno1992@gmail.com"
  // }
  const token = localStorage.getItem("token");
  const user = studentData.firstname + " " + studentData.lastname;
  return dispatch => {
    const options = {
      method: "PUT",
      headers: { "content-type": "application/json", Authorization: token },
      data: studentData,
      url: `${CLASS_URL}${classname}/addStudent`
    };
    axios(options)
      .then(res => {
        dispatch({
          type: ADD_STUDENT,
          payload: res.students, //Student data object returned
          class_name: res.name,
          user: user
        });
        //RESPONSE DATA {
        //     "_id": "5b79b366223c9800043f5a1d",
        //     "name": "CS9",
        //     "students": [
        //     {
        //         "hired": false,
        //         "_id": "5b79b4a6223c9800043f5a1e",
        //         "lastname": "Bueno",
        //         "firstname": "Abraham",
        //         "email": "abrambueno1992@gmail.com",
        //         "github": "abrambueno1992",
        //         "huntr": "abrambueno1992@gmail.com"
        //     },
        //     {
        //         "hired": false,
        //         "_id": "5b79e913e4056e00046b549d",
        //         "lastname": "Bueno",
        //         "firstname": "Abraham",
        //         "email": "abrambueno1992@gmail.com",
        //         "github": "abrambueno1992",
        //         "huntr": "abrambueno1992@gmail.com"
        //     }
        // ],
        //     "__v": 2
        // }
      })
      .catch(err => {
        dispatch({
          type: ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const createUserAction = obj => {
  return dispatch => {
    axios
      .post(`${USER_URL}register`, { token: dataEncrypt(obj) })
      .then(res => {
        console.log(res);
        dispatch({
          type: CREATE_USER,
          successfulRegister: true
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: REGISTER_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const loginAction = (obj, history) => {
  //Need to KNow the token expiration
  // let today = new Date();
  // let time = today.getDate();
  // let hours = today.getHours();
  // let minutes = today.getMinutes();
  // let expire
  // if (hours < 12) {
  //     if (hours === 11) {
  //         hours = 12;
  //         if (minutes >= 10) {
  //             expire = hours + ':' + minutes + 'pm';
  //         } else {
  //             expire = hours + ':0' + minutes + 'pm';
  //         }
  //     } else {
  //         hours += 1;
  //         if (minutes >= 10) {
  //             expire = hours + ':' + minutes + 'am';
  //         } else {
  //             expire = hours + ':0' + minutes + 'am';
  //         }
  //     }
  //     //

  // } else {
  //     if (hours === 23) {
  //         hours = 12;
  //         if (minutes >= 10) {
  //             expire = hours + ':' + minutes + 'am';
  //         } else {
  //             expire = hours + ':0' + minutes + 'am';
  //         }

  //     } else {
  //         hours = hours - 12 + 1;
  //         if (minutes >= 10) {
  //             expire = hours + ':' + minutes + 'pm';
  //         } else {
  //             expire = hours + ':0' + minutes + 'pm';
  //         }

  //     }
  // }

  return dispatch => {
    axios
      .post(`${USER_URL}login`, { token: dataEncrypt(obj) })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        // localStorage.setItem('expiration', expire);
        console.log(res);
        dispatch({
          type: LOGIN_ACTION,
          successfulLogin: true,
          payload: res.data.token,
          username: res.data.username
          // expiration: expire// (Math.floor(Date.now() / 1000) + (60*60))
        });
      })
      .catch(err => {
        localStorage.removeItem("token");
        dispatch({ type: LOGIN_ERRORS, payload: err.response.data });
      });
  };
};

export const logoutAction = () => {
  console.log("logging out");
  return dispatch => {
    dispatch({ type: LOGOUT_ACTION, successfulLogin: false });
  };
};

export const addClass = obj => {
    const token = localStorage.getItem("token");
    return dispatch => {
        const optionTwo = {
            method: "POST",
            headers: {"content-type": "application/json", Authorization: token},
            data: obj,
            url: `${CLASS_URL}addclass`
        };

        axios(optionTwo)
            .then(resp => {
                // localStorage.setItem("user", resp.data.name);

                dispatch({
                    type: ADD_CLASS,
                    user: resp.data.name,
                    class_name: resp.student,

                })
                // getClassesStudentsAction()

      })
      .catch(err => dispatch({ type: ERRORS, payload: err }));
  };
};
export const addStudent = obj => {
  const token = localStorage.getItem("token");
  return dispatch => {
    const optionTwo = {
      method: "PUT",
      headers: { "content-type": "application/json", Authorization: token },
      data: obj,
      url: `${USER_URL}addclass`
    };

    axios(optionTwo)
      .then(resp => {
        // localStorage.setItem('user', resp.data.name)
        dispatch({
          type: ADD_STUDENT,
          user: resp.data.name,
          class_name: resp.student
        });
      })
      .catch(err => dispatch({ type: ERRORS, payload: err }));
  };
};
