

import { reduxForm } from "redux-form";
import s from './Dialogs.module.css'
import Dialogitem from './DialogsItems/Dialogitem';
import Message from './Messages/Messages';
import AddMessageForm from './DialogsMessageForm'



let AddMessageReduxForm = reduxForm({ // коннектимо нашу форму з стором і редюсером, для того щоб редакс нас бачив. А щоб не плутався 
  // яку форма ми передаємо даємо їй
  // унікальне імя в обєкті. В нашому випадку dialogAddMessageForm
  form: 'dialogAddMessageForm'
})(AddMessageForm);









const DialogsMain = (props) => {
  
  let addNewMessage = (value) => { // value це обєкт в якому буе сидіти властивість яка називається ак само як name у Field

    // і значенням даної властивості буде введений текст
    props.sendMessage(value.newMessageBody);
  };




const dialogsComponentsArrray = props.dialogsPage.data.map((d) => (
    <Dialogitem name={d.name} key={d.key} />
  ));

  const messageComponentsArray = props.dialogsPage.messagesLinkedTodialogs.map((m) => (
    <Message messageFromDialog={m.messageFromDialog} key={m.key} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsComponentsArrray}</div>

      <div>
        <div className={s.messages}>{messageComponentsArray}</div>

        <AddMessageReduxForm onSubmit={addNewMessage} /> 
      </div>
    </div>
  );
};
  

// ! Саме AddMessageReduxForm є батьком нашої форми і тому він хоче знати які дані забрались в ній і що далі з ними робити, 
// саме тому йому ми вішаємо onSubmit={addNewMessage}, і дані з форми живуть типу value тут біля нього
// так як він є результатом reduxForm





export default DialogsMain; 