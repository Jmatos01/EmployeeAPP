import { server } from '../api';
import validate from '../methods/validate';
import socket from '../socket';

const USER = (dispatch) => ({
  checkUserSession: () => {
    return fetch(server + '/user-session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ socket_id: socket.id }),
    })
      .then(response => response.json())
      .then(response => {

        if (response.user) {
          dispatch({
            type: 'ON_UPDATE_USER',
            user: response.user
          });
        }
        else {
          dispatch({
            type: 'ON_UPDATE_USER',
            user: null
          });
        }

        setTimeout(() => {
          dispatch({
            type: 'ON_LOADING_CHANGE',
            loading: false
          });
        }, 3000);
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }

        setTimeout(() => {
          dispatch({
            type: 'ON_LOADING_CHANGE',
            loading: false
          });
        }, 3000);
      });
  },

  onSignIn: (credentials) => {
    if (!validate.email(credentials.email)) {
      return alert('Invalid email. Please enter a valid email')
    }

    if (!validate.password(credentials.password)) {
      return alert('Invalid password. Please make sure the password contains a lowercase letter, a capital letter, a number and a minimum of 6 characters')
    }

    return fetch(server + '/user-sign-in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch({
          type: 'ON_UPDATE_USER',
          user: response.user
        })
      }
      else {
        alert(response.message);
      }
    })
    .catch(err => {
      alert(err.message);
    })
  },

  onSignUp: (credentials) => {
    if (!validate.email(credentials.email)) {
      return alert('Invalid email. Please enter a valid email')
    }

    if (!validate.password(credentials.password)) {
      return alert('Invalid password. Please make sure the password contains a lowercase letter, a capital letter, a number and a minimum of 6 characters')
    }

    if (!credentials.name) {
      return alert('Invalid name. Please enter a name')
    }

    if (!credentials.birthday) {
      return alert('Invalid age. Please enter a valid age')
    }

    return fetch(server + '/user-sign-up', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          return true;
        }
        else {
          alert(response.message);
          return false;
        }
      })
      .catch(err => {
        alert(err.message);
      })
  },

  onForgotPassword: (credentials) => {
    if (!validate.email(credentials.email)) {
      return alert('Invalid email. Please enter a valid email')
    }

    return fetch(server + '/user-password-recovery', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          return true;
        }
        else {
          alert(response.message);
          return false;
        }
      })
      .catch(err => {
        alert(err.message);
      })
  },

  onResetPassword: (credentials, token) => {
    if (!validate.password(credentials.newPassword)) {
      return alert('Invalid password. Please make sure the password contains a lowercase letter, a capital letter, a number and a minimum of 6 characters');
    }

    if (credentials.newPassword !== credentials.newPasswordConfirmation) {
      return alert('Passwords do not match. Please make sure to type the same password');
    }

    return fetch(server + '/user-change-password/' + token, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          return true;
        }
        else {
          alert(response.message);
          return false;
        }
      })
      .catch(err => {
        alert(err.message);
      })
  },

  onUserLogOut: () => {
    return fetch(server + '/user-sign-out', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        socket_id: socket.id
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.success) {
          dispatch({
            type: 'ON_UPDATE_USER',
            user: null
          });
        }
        else {
          alert(response.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  },

});

export default USER;