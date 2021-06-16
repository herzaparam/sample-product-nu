import React from 'react'

import style from './Card.module.css'
import imgShoes from '../../assets/image/sepatu.jpg'
import Swal from 'sweetalert2'

function Card() {

    const handleBuy = () => {
        Swal.fire({
            title: 'Do you want to buy this item?',
            showCancelButton: true,
            confirmButtonText: `Buy`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Succesfully delete this item!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Can not delete this item right now', '', 'info')
            }
          })
    }
    const handleDelete = () =>{
        Swal.fire({
            title: 'Do you want to delete this item?',
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: `Delete`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Succesfully delete this item!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Can not delete this item right now', '', 'info')
            }
          })
    }
    const handleUpdate = () =>{
        Swal.fire({
            title: 'Login Form',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
              const login = Swal.getPopup().querySelector('#login').value
              const password = Swal.getPopup().querySelector('#password').value
              if (!login || !password) {
                Swal.showValidationMessage(`Please enter login and password`)
              }
              return { login: login, password: password }
            }
          }).then((result) => {
            Swal.fire(`
              Login: ${result.value.login}
              Password: ${result.value.password}
            `.trim())
          })
    }

    return (
        <div className={style["main"]}>
            <div className={style["top-sect"]}>
                <img src={imgShoes} alt="" />
            </div>
            <div className={style["bot-sect"]}>
                <h3>Sepatu</h3>
                <h4><span className={style["text"]}>Buy</span> price : Rp. 40000,-</h4>
                <h4><span className={style["text"]}>Sell</span> price : Rp. 50000,-</h4>
                <h5>Stock : 50</h5>
                <div className={style["bot-sect-btn"]}>
                    <button onClick={handleBuy}>Buy</button>
                    <button className={style["update-btn"]} onClick={handleUpdate}>Update</button>
                    <button className={style["delete-btn"]} onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Card
