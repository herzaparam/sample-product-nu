import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

import style from './Card.module.css'
import Swal from 'sweetalert2'
import axios from 'axios'

function Card({ id, name, buyPrice, sellPrice, stock, image, reload }) {

  const history = useHistory();
  

  const handleBuy = () => {
    Swal.fire({
      title: 'Do you want to buy this item?',
      showCancelButton: true,
      confirmButtonText: `Buy`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await axios.put(`${process.env.REACT_APP_API}api/v1/product/buy/${id}?total=1`)
        const rel = await Swal.fire('Succesfully delete this item!', '', 'success')
        reload()
      } else if (result.isDenied) {
        Swal.fire('Can not delete this item right now', '', 'info')
      }
    })
  }
  const handleDelete = () => {
    Swal.fire({
      title: 'Do you want to delete this item?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        const res = await axios.delete(`${process.env.REACT_APP_API}api/v1/product/delete/${id}`)
        const rel = await Swal.fire('Succesfully delete this item!', '', 'success')
        reload()
      } else if (result.isDenied) {
        Swal.fire('Can not delete this item right now', '', 'info')
      }
    })
  }

  


  return (
    <div className={style["main"]}>
      <div className={style["top-sect"]}>
        <img src={`${process.env.REACT_APP_API}${image}`} alt="" />
      </div>
      <div className={style["bot-sect"]}>
        <h3>{name}</h3>
        <h4><span className={style["text"]}>Buy</span> price : Rp. {buyPrice},-</h4>
        <h4><span className={style["text"]}>Sell</span> price : Rp. {sellPrice},-</h4>
        <h5>Stock : {stock}</h5>
        <div className={style["bot-sect-btn"]}>
          <button onClick={handleBuy}>Buy</button>
          <button type="button" className="btn" data-toggle="modal" data-target="#exampleModalUpdate" onClick={()=>history.push(`/update/${id}`)} >
            Update
          </button>
          <button className={style["delete-btn"]} onClick={handleDelete}>Delete</button>
        </div>
      </div>

      
    </div>
  )
}

export default Card
