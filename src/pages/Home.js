import React, { useState, useEffect } from 'react'
import axios from 'axios'

import style from './Home.module.css'
import Card from '../components/Cards/Card'
import Swal from 'sweetalert2'

function Home() {
    const [input, setInput] = useState("")
    const [data, setData] = useState({
        image: null,
        name: "",
        buyPrice: "",
        sellPrice: "",
        stock: 0
    })

    const changeImg = (e) => {
        setData({
            ...data,
            image: e.target.files[0]
        })
        console.log(data);
    }

    useEffect(() => {

    }, [input])

    const handleInsert = () => {
        console.log(data);
    }

    const handleChange = (e)=>{
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }
    const changeImage = (e) =>{
        setData({
            ...data,
            image: e.target.files[0]
        })
    }

    return (
        <div className={style["container"]}>
            <h3>ITEM LISTS</h3>
            <div className={style["search-bar"]}>
                <input type="text" placeholder="search here" onChange={e => setInput(e.target.value)} />
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Insert Product
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Insert Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className={style["modal-body"]}>
                                <input type="file" onChange={changeImage}/>
                                <label htmlFor="">Item Name</label>
                                <input type="text" onChange={handleChange} id="name" placeholder="item's name"/>
                                <label htmlFor="">Buy Price</label>
                                <input type="number" onChange={handleChange} id="buyPrice" placeholder="Rp. 50000,-"/>
                                <label htmlFor="">Sell Price</label>
                                <input type="number" onChange={handleChange} id="sellPrice" placeholder="Rp. 50000,-"/>
                                <label htmlFor="">Stock</label>
                                <input type="number" onChange={handleChange} id="stock" placeholder="20"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleInsert}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={style["container-top"]}>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default Home
