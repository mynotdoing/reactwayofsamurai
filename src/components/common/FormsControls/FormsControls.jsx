import React from "react"
import styles from './FormsControls.module.css'



// тут така річ що хоч ми і створили цю компоненту над textarea і передаємо їх всі пропси і зєднали
// її з бажаною textarea через прописування в потрібному Field component={TextArea} вона в нас відмалюється але не буде працювати
// При відмальовці накого елемента сюди в TextArea закидують пропси input, data, placeholder (який ми засандалили в самому Field)
// мабуть Field працює в даному випадку як контейнер над тим що передали в component={TextArea}???
// Нам треба в пропси деструктуризувати підобєкт input 

export const TextArea = ({ input, meta, ...props }) => {
  // нам приходять пропси через атрибути а також якісь дефолтні обєкти форми типу input і meta які хз звідки прийшли
  // і , які ми розкукожуємо в нові обєкти input і meta а решту в обєкт props, який ми передали далі в texatarea як атрибут
  // для подальшого аналізу

  const hasError = meta.error && meta.touched; // по дефолту еррор є undefined, зберігаємо перевірку в змінну
  return (
    <div>
      <div
        className={styles.formControl + " " + (hasError ? styles.error : "")}
      >
        <textarea {...input} {...props}></textarea>
      </div>
      {hasError && <span>{meta.error}</span>}
    </div> // Span ми маємо бачити тільки якщо є помилка: чіпляється клас і тд
    // якщо в нас є еррор і поле було потроганим - виводимо спам 'some error'
  );
};

export const InputArea = ({ input, meta, ...props }) => {

  
    // нам приходять пропси через атрибути а також якісь дефолтні обєкти форми типу input і meta які хз звідки прийшли
    // і , які ми розкукожуємо в нові обєкти input і meta а решту в обєкт props, який ми передали далі в texatarea як атрибут
    // для подальшого аналізу
  
    const hasError = meta.error && meta.touched; // по дефолту еррор є undefined, зберігаємо перевірку в змінну
    return (
      <div>
        <div
          className={styles.formControl + " " + (hasError ? styles.error : "")}
        >
          <input {...input} {...props}></input>
        </div>
        {hasError && <span>{meta.error}</span>}
      </div> // Span ми маємо бачити тільки якщо є помилка: чіпляється клас і тд
      // якщо в нас є еррор і поле було потроганим - виводимо спам 'some error'
    );
  };
  
  
