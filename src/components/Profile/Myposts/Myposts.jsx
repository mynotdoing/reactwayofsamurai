import React from 'react';
import s from './Myposts.module.css';
import Post from './Post/Post';
import { reduxForm, Field } from "redux-form";
import { required, maxLengthCreator } from '../../../utils/validators/validator';
import { TextArea } from '../../common/FormsControls/FormsControls';


const maxLength = maxLengthCreator(10)

const Myposts = (props) => {

  


  



  const postElements = 
  [...props.postsData].reverse().map((p) => (
    <Post message={p.message} count={p.count} id={p.id} key={p.id} />
  ));

 


  let onAddPost= (value) => {

    console.log(value)
    
    props.addPost(value.postFieldData);


  };




// 3) відправляємо text через передану нам через пропси ф-ю dispatch цей текст в змінну newPostText, 
// 4) вона відразу ж стає значенням value яке ми фіксуємо в полі вводу через value={props.newPostText} нижче в атрибуті textarea



  return (
    <div className={s.postsBlock}>

     <PostReduxForm onSubmit={onAddPost} />

      <div className={s.posts}>{postElements}</div>

    </div>
  );
}

export default Myposts;


// значення в полі буде строго передано пропсами

const PostField = (props) => { // получає багато пропсів з PostReduxForm і далі їх закидує в Field але не через звичайні
  // пропси а якось скрито - наприклад input, meta
  
  return (
    <div>
     
      <h3>My posts</h3>
      <form onSubmit={props.handleSubmit}>
        <div>
          
          <Field
          
            placeholder={"write your pfffost"}
            component={TextArea} // Наш Field відмальовує компоненту TextArea і передає їх пропси що зазначені тут
            // a і placeholder
            name={"postFieldData"}
            validate={[required, maxLength]}
            a='yoyoyo'
          />
        </div>

        <div>
          <button>Add post</button>
        </div>
      </form>

      <h3>Це окремий компонент з постами Mypost</h3>
    </div>
  );
}

const PostReduxForm = reduxForm({ // коннектимо нашу форму з стором і редюсером, для того щоб редакс нас бачив. А щоб не плутався 
  // яку форма ми передаємо даємо їй
  // унікальне імя в обєкті. В нашому випадку login
  form: 'postFieldData'
})(PostField) // сюди передаємо який саме компонент з формати хочемо законектити