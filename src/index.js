
// нам потрібно нашу точку входу root.render в UI обернути в ф-ю щоб кожного разу як відбудуться зміни в state малювалось все по новому


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import store from './components/Redux/store';
import store from './components/Redux/redux-store'; // імпортуємо редаксівський стор 
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
// нам потрібно нашу точку входу root.render в UI обернути в ф-ю щоб кожного разу як відбудуться зміни в state малювалось все по новому

let renderEntireTree = (state) => {




  
  root.render(
    <React.StrictMode>
      <BrowserRouter>

      <Provider store={store}> 
        <App />  

      </Provider>
        
      </BrowserRouter>
    </React.StrictMode>
  );
  
  
}



renderEntireTree(); // кожен раз перемальовуємо коли міняється наш переданий стейт зі стору, 
// і тут передається стейт зі стору (store.getState()) як аргумент для ф-ї renderEntireTree вгорі і для подальших пропсів


// store.subscribe(renderEntireTree)


// store.subscribe( () => { // викликається тут для того щоб передати стору нашу ф-ю рендера, і при кликах буде перемальовка
//     let state = store.getState();
//     renderEntireTree(state);

//     // console.log('HI') // ми могли б підписникам при клику передавати ф-ю виведення в консоль "НІ" але передаємо ф-ю рендеру з актуальним стейтом
// } ) 

// так як конненкт має свій сабскрайб - ми його звідси видаляємо


// ми хочемо щоб всередині dispatch this був стора тому біндимо