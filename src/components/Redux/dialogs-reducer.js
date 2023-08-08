
const SEND_MESSAGE = 'SEND_MESSSAGE';

let initialState = {
    data: [
      { key: 10, name: "Solya" },
      { key: 20, name: "Mama" },
      { key: 30, name: "Yura" },
      { key: 40, name: "Vova" },
      { key: 90, name: "Alexx" },
    ],
    messagesLinkedTodialogs: [
      { key: 1, messageFromDialog: "hi" },
      { key: 2, messageFromDialog: "pryvit" },
      { key: 3, messageFromDialog: "yo" },
      { key: 4, messageFromDialog: "yo12123123" },
      { key: 5, messageFromDialog: "yodииииdasd" },
    ],
    
  }

const dialogsReducer = (state = initialState, action) => { // передаючи стейт ми зєднюємо редюсер з стейтом
  // і потім це вже в нас стане dialogsPage


    let stateCopy = {
      ...state, 
    }


 if (action.type === SEND_MESSAGE) {
        let body = action.newMessageBody;
      
        stateCopy.messagesLinkedTodialogs.push({ key: 6, messageFromDialog: body });

      }




    return stateCopy
};

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});


export default dialogsReducer;