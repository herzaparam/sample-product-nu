import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import style from './Update.module.css'
import Swal from 'sweetalert2'

function Update() {
    const history = useHistory()
    let { id } = useParams()

    const [card, setCard] = useState()
    const [data, setData] = useState({
        image: null,
        name: "",
        buyPrice: "",
        sellPrice: "",
        stock: 0
    })
  

    useEffect(() => {
        if(id){
            axios.get(`${process.env.REACT_APP_API}api/v1/product/one/${id}`)
            .then((res) => {
                console.log(res);
                setCard(res.data.data[0])
            })
            .catch((err) => {
                console.log(err);
            })
        }
       
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(data);
        const formData = new FormData();
        formData.append('buyPrice', data.buyPrice ? data.buyPrice : card.buy_price)
        formData.append('sellPrice', data.sellPrice ? data.sellPrice : card.sell_price)
        formData.append('stock', data.stock ? data.stock : card.stock)
        formData.append('name', data.name ? data.name : card.name)
        formData.append('image', data.image ? data.image : card.image)
        axios.put(`${process.env.REACT_APP_API}api/v1/product/update/${id}`, formData)
            .then((res) => {
                Swal.fire(
                    'Good job!',
                    'update product sucess!',
                    'success'
                )
                history.push("/")
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const changeImage = (e) => {
        setData({
            ...data,
            image: e.target.files[0]
        })
    }

    return (
        <div className={style["container"]}>
            {card && <div className={style["sect-left"]}>
                <img src={`${process.env.REACT_APP_API}${card.image}`} alt="" />
                <div className={style["sect-left-part"]}>
                    <h2>Name</h2>
                    <p>{card.name}</p>
                </div>
                <div className={style["sect-left-part"]}>
                    <h3>Buy Price</h3>
                    <p>{card.buy_price}</p>
                </div>
                <div className={style["sect-left-part"]}>
                    <h3>Sell Price</h3>
                    <p>{card.sell_price}</p>
                </div>
                <div className={style["sect-left-part"]}>
                    <h4>Stock</h4>
                    <p>{card.stock}</p>
                </div>
            </div>}
            
            <div className={style["sect-right"]}>
                <label htmlFor="" >Image :</label>
                <input onChange={changeImage} type="file" />
                <label htmlFor="">Product Name :</label>
                <input onChange={handleChange} name="name" type="text" />
                <label htmlFor="">Buy Price :</label>
                <input onChange={handleChange} name="buyPrice" type="text" />
                <label htmlFor="">Sell Price :</label>
                <input onChange={handleChange} name="sellPrice" type="text" />
                <label htmlFor="">Stock :</label>
                <input onChange={handleChange} name="stock" type="text" />
                <button onClick={handleUpdate}>Update</button>
            </div>
        </div>
    )
}

export default Update
