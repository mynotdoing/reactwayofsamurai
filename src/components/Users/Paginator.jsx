
import React, { useState } from "react";
import styles from './Paginator.module.css'



let Paginator = ({currentPage, onPageChange, pageSize, portionSize,  totalUsersCount}) => {
  // Цей весь двіж до return відбувається тільки локально і не має стосунку до редюсера
  // Наша задача була створити список сторінок з користувачами, для цього я створив пустий масив який заповнився цифрами які дорівнюють
  // кількості сторінок і заповнив його циклом for

  let pageCount = Math.ceil(totalUsersCount / pageSize); // створюємо просто тут локальну змінну яка візьме з стейту через пропси
  // загальну кількість юзерів totalUsersCount (яку ми засетали при API запиті з сервера) і поділить на захардкожене в редюсері
  // число 7 (кількість  юзерів яку ми задали вручну в user-reducer)

  let pages = []; // тут ми генеруємо локальну змінну масив який буде складатись з числового ряду який відповідає
  // кількості сторінок з користувачами - наприклад [1,2,3,...99,100] сторінок з користувачами якщо всього 700 юзерів по 10 на сторінку
  // для цього по цьому числу проходимось циклом for нижче

  for (let i = 1; i <= pageCount; i++) {
    // 'і' це у нас просто числа, які згенеруються циклом і їх ми дадаємо в масив pages
    pages.push(i);
  }
  // кінець двіжу

  // Малюємо 2 діви - один зі строчними спанами з цифрами сторінок, другий - діви вниз з юзерами

  
  let portionCount = Math.ceil(pageCount / portionSize) // у нас є загальна кількість порцій
  

  const [portionNumber, setPortionNumber] = useState(1 ) // portionNumber це поточна порція яку ми показуємо

  const leftPortionPageNumber = (portionNumber - 1)* portionSize + 1; // на 4 сторінці перший елемент буде 22 юзер 

  const rightPortionNumber = portionNumber * portionSize




  return (
    <div className={styles.paginator}>


      { portionNumber > 1 && 
      <button onClick={() => { setPortionNumber(portionNumber -1)  }}> PREV </button>}



      { pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionNumber)
      
      
      
      
      .map((p) => {
        // скільки є елементів (p) в масиві - стільки і створюємо сторінок з кожною окремою цифрою p, поміщаємо в окремий span
        // на цей спан вішаємо переданий нам onclick який буде визначати поточну сторінку (ми її передаємо аргументом), перевіряти чи саме
        // вона є current і якщо так - робити selected через classname
        return (
          <span
          key={p}
            onClick={() => {
              onPageChange(p);
            }}
            className={`${currentPage === p ? styles.selectedPage : undefined} ${styles.pageNumber}`}
          >
            {p}
          </span>
        );
      })}
       { portionCount > portionNumber  && 
      <button onClick={() => { setPortionNumber(portionNumber + 1)  }}> NEXT </button>}

    </div>
  );
}
export default Paginator;

// нова пагінація

// таск - треба зробити порції по 10 сторінок з кнопками вліво/вправо

// 1) визначаємо кількість в 1 порції - наприкад 10
