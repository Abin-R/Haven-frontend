

const initialState = {
    username:  '',
    userId :  '',
    role:  '',
    isAuthenticated: false,
  };
 
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        console.log("Setting user:", action.payload);
        return {
          ...state,
          isAuthenticated: true,
          username: action.payload.username,
          role: action.payload.role,
          userId : action.payload.userId,
        };
      
      case 'UPDATE_USERNAME':
        console.log('updating');
      return {
        ...state,
        username: action.payload,
      };
      
      case 'CLEAR_USER_DATA':
        console.log('clearing')
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          username: '',
          role: '',
          student: false,
          userId : '',
          premium : false,
        };
      default:
        return state;
    }
  };
  

  