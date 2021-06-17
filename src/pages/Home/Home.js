import React, { useState, useEffect } from 'react'
import axios from 'axios'

import style from './Home.module.css'
import Card from '../../components/Cards/Card'
import Swal from 'sweetalert2'
import Pagination from '../../components/Pagination'

function Home() {

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(4)
    const [input, setInput] = useState("")
    const [data, setData] = useState({
        image: null,
        name: null,
        buyPrice: null,
        sellPrice: null,
        stock: null
    })
    const [list, setList] = useState([])

    const reload = () => {
        axios.get(`${process.env.REACT_APP_API}api/v1/product/?page=1&perPage=20&keyword=${input}`)
            .then((res) => {
                setList(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        reload()
    }, [input])

    const changeImg = (e) => {
        setData({
            ...data,
            image: e.target.files[0]
        })
    }

    const handleInsert = (e) => {
        e.preventDefault();
        if (data.image === null || data.name === null || data.buyPrice === null || data.sellPrice === null || data.stock === null) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "you need to input all field",
            })
        }
        const formData = new FormData();
        formData.append('buyPrice', data.buyPrice)
        formData.append('sellPrice', data.sellPrice)
        formData.append('stock', data.stock)
        formData.append('name', data.name)
        formData.append('image', data.image)
        axios.post(`${process.env.REACT_APP_API}api/v1/product/insert`, formData)
            .then((res) => {
                Swal.fire(
                    'Good job!',
                    'insert product sucess!',
                    'success'
                )
                reload()
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
            [e.target.id]: e.target.value
        })
    }
    const changeImage = (e) => {
        setData({
            ...data,
            image: e.target.files[0]
        })
    }

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirsPost = indexOfLastPost - postPerPage;
    const currentList = list.slice(indexOfFirsPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
                                <input type="file" onChange={changeImage} />
                                <label htmlFor="">Item Name</label>
                                <input type="text" onChange={handleChange} id="name" placeholder="item's name" />
                                <label htmlFor="">Buy Price</label>
                                <input type="number" onChange={handleChange} id="buyPrice" placeholder="Rp. 50000,-" />
                                <label htmlFor="">Sell Price</label>
                                <input type="number" onChange={handleChange} id="sellPrice" placeholder="Rp. 50000,-" />
                                <label htmlFor="">Stock</label>
                                <input type="number" onChange={handleChange} id="stock" placeholder="20" />
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
                {currentList.map((item) => {
                    return <Card id={item.id} name={item.name} buyPrice={item.buy_price} sellPrice={item.sell_price} stock={item.stock} image={item.image} reload={reload} key={item.id} />
                })}
            </div>
            <Pagination postPerPage={postPerPage} totalPost={list.length} paginate={paginate} />
        </div>
    )
}

export default Home
