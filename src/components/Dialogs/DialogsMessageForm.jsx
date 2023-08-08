

import { Field } from "redux-form";
import { TextArea } from './../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from './../../utils/validators/validator'

const maxLength = maxLengthCreator(10)
 
let AddMessageForm = (props) => {

  
  return (
    // Налаштування форми.

    // Першим ділом вішаємо onSubmit який нам говорить що має виконатись коли форма засабмітиться, має виконатись
    // спеціальний метод props.handleSubmit який нам прийде з контейнера reduxForm в який ми обернулися нашою компонентою
    // Тут у нас текстареа - тому зазначаємо component='textarea'
    // В будь якого елемента в формі має бути name який обзиває форму name='newMessageBody'
    // Просто плейсхолдер placeholder="Message your text here"
    // Кнопці більше не потрібні жодні onClick
    // Field працює тільки в межах reduxForm 
    <div>

    
    <form onSubmit={props.handleSubmit}> 
          <div>
            <Field placeholder="Message your text here" component={TextArea} name='newMessageBody' validate={[required, maxLength]}/>  
          </div>

          <div>
            <button>Send</button>
          </div>
        </form>


    </div>
  )
}






export default AddMessageForm 