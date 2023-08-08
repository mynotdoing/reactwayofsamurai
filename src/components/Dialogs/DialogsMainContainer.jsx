import { sendMessageCreator } from '../Redux/dialogs-reducer';
import DialogsMain from './DialogsMain';
import { connect } from 'react-redux';
// import { withAuthRedirectComponent } from '../HOC/withAuthRedirect';
import {compose} from 'redux'

// Це контейнерний компонент нашого ф-ного компонента DialogsMain
// Цей контейнер виконує декілька задач: 
//1) передаємо сюди стейт і ф-ю редюсер з частини стору яка відповідає тільки за нього через mapStateToProps
//2) компонуємо з різними хоками через compose



// компонент буде перерендерюватись лише тоді, коли властивості, визначені в mapStateToProps, змінюються, 
// на відміну якщо б ми користувались просто даними з провайдера
let mapStateToProps = (state) => { // 
return {
  dialogsPage: state.dialogsPage, // ця властивість як атрибут попаде в пропси
  // isAuth: state.auth.isAuth // передаємо нашій компоненті інфорамацію чи залогінені ми чи ні
}
};

let mapDispatchToProps = (dispatch) => {
return {
  sendMessage: (newMessageBody) => {
    dispatch(sendMessageCreator(newMessageBody));
  },


}
}




// Ф-я compose приймає 2 параметром нашу презентаційну компоненту DialogsMain, а першим параметром ми 
// говоримо які хоки до неї застосувати
// в даному випадку це хок withAuthRedirectComponent і просто коннект зі стором
// Після чого вона вже в нас буде все розуміти і ми її експортуємо в наше app.js

let DialogsMainContainerComposed = compose(
  connect(mapStateToProps, mapDispatchToProps), // а потім кажемо оброблений ще оброби цим
  // withAuthRedirectComponent // потім ми кажемо спочатку оброби компоненту цим хоком, це нам поверне інший оновлений обєкт
// закоментував withAuthRedirectComponent щоб не було авторизації


)(DialogsMain) // наша двіжуха починається з того що ми сюди передаємо наш компонент


export default DialogsMainContainerComposed  