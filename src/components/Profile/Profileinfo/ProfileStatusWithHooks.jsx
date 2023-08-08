import s from './ProfileStatus.module.css'
import React, { useState} from 'react';


const ProfileStatusWithHooks = (props) =>   {


  


    // let stateWithUseStateHook = useState(true) // це хук який десь за межами цієї компоненти їх де в реакті створить певний стейт
    // // який буде масивом з 2 значеннями, перше значення буде дорівнювати аргументу переданому в useState
    // // а друге значення буде ф-я яка щось робить з значенням 1
    // let editMode = stateWithUseStateHook[0] // editMode = true
    // let setEditMode = stateWithUseStateHook[1] - це старий спосіб, краще викорисовувти деструктуризацію

    const [editMode, setEditMode] = useState(false) // створюємо локальний стейт через хук useState
    const [status, setStatus] = useState(props.status)


    // useEffect( () => {
    //     setStatus(props.status); // після рендеру синхтонізуємо наш локальний статус з тими даними які прйшли з пропсів
    //   }, [props.status]) // додаванням масиву ми кажемо що хочемо щоб ефект запускався щоразу коли зміниться props.status
    //   // якщо props.status при черговому рендері буде не таким як був раніше - запусти ефект
    //  // хук який каже що закиньте в мене ф-ю яку я виконаю після відмальовування рендеру (типу componentDidUpdate)



    const activateEditMode = () => { // ми створюємо ф-ю яку передамо в онклік, і яка викличе створену за допомогою useState ф-ю 
        // setEditMode яка в ствою чергу змінює значення editMode (що ми в неї передаємо то і буде новим значенням editMode )
        setEditMode(true)
    }
    
    const deactivateEditMode = () => { 
        setEditMode(false)
    }
    

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
        props.updateStatus(status)
    }

        return (
          
          <div>
              { !editMode && 
              <div>
                <span className={s.text} onDoubleClick={activateEditMode} >
                  {status}  
                </span>
              </div>
    
              }
            {editMode && (
              <div>
                <input
                onChange={onStatusChange}
                onBlur={deactivateEditMode}
                autoFocus={true}
                value={status}
         
                />
              </div>
            )}
          </div>
        );
    
}


export default ProfileStatusWithHooks;


// про даблкліку onDoubleClick={activateEditMode} на спан міняємо значення editmoda(створеного в локальному стейті через хук) чим переключаємось на input
// і обернене робимо в інпуті при onBlur={deactivateEditMode}

// в спані будемо показувати статус з пропсів, який ми зберегли в локальному стейті status який створений через хук