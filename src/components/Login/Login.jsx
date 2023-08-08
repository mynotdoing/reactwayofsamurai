import React from "react";
import { reduxForm, Field } from "redux-form";
import { InputArea } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validator";
import { connect } from "react-redux";
import { login } from "../Redux/auth-reducer";
import { Navigate } from "react-router-dom";
import styles from '../common/FormsControls/FormsControls.module.css'



const LoginForm = ({handleSubmit, error }) => { // змінюємо input на Field що працювали наші вбудовани в redux-form колбеки
    // ми кажемо через атрибут component яку саме компоненту треба намалювати в input
    // в кожеої форми має бути властивість name щоб бібіліотека реагувала саме на них

    // нам в пропри приходить ціла купа функцій і данних
    

   
    return (
        // ми кнопку сабміт хочемо щоб обробляла ф-я з пропсів handleSubmit, ми йому довіряємо обробку сабміта
        // всередині того колбека записаний e.preventDefault
        // ! Так як ф-я onSubmit не приходить до нас з стора в пропсах по дефлту, ми її створюємо в контейнері 
        // і передаємо сюди через пропси
        // в вже при натиску в нього прийдуть зібрані дані formData (в даному випадку ми просто виводимо їх в консоль)

        

        <form onSubmit={handleSubmit}> 
          <div>
            <Field type="text" validate={[required]} placeholder={"Email"} component={InputArea} name={'email'}/>  
          </div>
          <div>
            <Field type="password" validate={[required]} placeholder={"Password"} name={'password'} component={InputArea}/>
          </div>
          <div>
            <Field  component={InputArea}  name={'rememberMe'} type="checkbox" /> Remember me
          </div>


         { error && <div className={styles.formSummaryError}>
          {error} yo its error field
          </div>}
          

          
          <div>
            <button>Login</button>
          </div>
        </form>

    );
}





const LoginReduxForm = reduxForm({ // коннектимо нашу форму з стором і редюсером, для того щоб редакс нас бачив. А щоб не плутався 
    // яку форма ми передаємо даємо їй
    // унікальне імя в обєкті. В нашому випадку login
    form: 'login'
})(LoginForm) // сюди передаємо який саме компонент з формати хочемо законектити






const Login = (props) => {
    
const onSubmit = (formData) => {

    props.login(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) {return <Navigate to={"/profile"} />};

  return (
    <div>
      <h1>Login page</h1>

      

      <LoginReduxForm  onSubmit={onSubmit}/>
    </div>
  );
}


let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}


export default connect(mapStateToProps, {login}) (Login);