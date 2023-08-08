
import React from "react";
import styles from './users.module.css'
import userPhoto from './../../assets/images/user.jpeg' // url присвоється змінній userPhoto
import { NavLink } from "react-router-dom";
import Paginator from "./Paginator";


let Users = ( {currentPage,onPageChange,totalUsersCount,pageSize, portionSize,   ...props}) => {
  
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        portionSize={portionSize}/>

      {props.users.map((u) => (
        // Попередньо засетавши викликавши в контейнері санку юзерів в стейт і передавши їх сюди через пропси
        // ми через мап проходимось по кожному юзері u в масиві і відповідно їх кількості створюємо на кожній ітерації аватарки
        // в які ми передаємо src кожного фото u, таким чином готовий список аватарок і подальших дівів.
        // Далі так як ми в тому самому головному діві під фото створюємо на кожній ітерації кнопки

        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img // наша аватарка обернена навлінком щоб вести на сторінку профайлу
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  alt=""
                  className={styles.usersPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  // Тут ми відповідно статусу будемо міняти follow чи unfollow
                  // Якщо масив в стейті з followingInProgress пустий і
                  // через фільтр по масиву some (props.followingInProgress.some(id => id === u.id)) жодна id  в ньому ніхто не сидить
                  //  у нас просто покажеться кнопка Unfollow

                  // А при кліку на цей Unfollow в нас викличеться санка props.unfollowthunkCreator(u.id) яка спочатку запустить крутілку
                  // потім зробить post запит на сервер щоб додати користувача і якщо resultCode === 0 (успішно) додасть його вже в наш масив
                  // таким чином в масиві вже буде хтось сидіти і тому вона зміниться на Follow

                  onClick={() => {
                    props.unfollowthunkCreator(u.id);

                    // props.toggleFollowingProgress(true, u.id)
                    // userAPI.unfollow(u.id)
                    // // axios
                    // //   .delete(
                    // //     `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                    // //     {
                    // //     withCredentials: true,
                    // //      }
                    // //   )
                    //   .then((response) => {

                    //     if (response.data.resultCode === 0) {
                    //       props.unfollow(u.id);
                    //     }
                    //     props.toggleFollowingProgress(false, u.id);

                    //   });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.followthunkCreator(u.id);

                    // props.toggleFollowingProgress(true, u.id) // коли ми натиснули кнопку то передали значення тру
                    //   userAPI.follow(u.id)
                    // // axios
                    // //   .post(
                    // //     `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                    // //     {},
                    // //     { withCredentials: true,
                    // //        }
                    // //   )
                    //   .then((response) => {
                    //     if (response.data.resultCode === 0) {
                    //       props.follow(u.id);
                    //     }
                    //     props.toggleFollowingProgress(false, u.id)
                    //   });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>

          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}



export default Users;