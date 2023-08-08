import {  combineReducers} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleWare from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form' // імпортуємо бібліотеку і вставляємо в комбайн



let reducers = combineReducers({    // це обєкт значеннями властивостей якого будуть наші імпортовані reducers
    profilePage: profileReducer,  // combineReducers це типу наш store, в ньому є дані profilePage і за них відповідає profileReducer
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,// тепер в стейті буде usersPage
    auth: authReducer,
    form: formReducer // тут треба властивість форм бо буде шукати саме її
});

// в стейті в нас є dialogsPage і за нього відповідає редюсер dialogsReducer

// під час ініціалізації наш profilePage не буде знати що таке стейт в profileReducer тому там ми створюємо initialState

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare)); // після того як ми закомбайнили релюсери ми його виддаємо сюди
// // // автоматично configureStore створює state в якому є 3 наші властивості profilePage, dialogsPage, sidebar

let store = configureStore( // конфігуруємо стор передаючи обєкт з властивістю reducer де передаємо наш редюсер, і властивістю
// middleware де передаємо масив з нашими бажаними middleware. Це замість застарілого createStore
    {
        reducer: reducers,
        middleware: [thunkMiddleWare]
            
    }
) // створюється стор де будуть стейти і редсери


window.store = store;

export default store;


// reduser це ф-я через яку іде модифікація стейту

// тут теж живе наш стейт який прихрдить сюди через редюсери, де він є аргументом