import React from 'react'
import logo from './logo.png'
import T_QuantityBtn from './T_QuantityBtn';

export default function ProductsList() {
    let productList = [
        {
            "id":5,
            "name":"blue berry",
            "image":"image-dessert-1.jpg",
            "price":10,
            "description":"blue berry description",
            "quantity":3
        },
        {
            "id":4,
            "name":"watermelon",
            "image":"image-dessert-2.jpg",
            "price":20,
            "description":"watermelon description",
            "quantity":4
        }

    ];
  return (
    <div>
      <h1>testing</h1>
        <img src={process.env.PUBLIC_URL+'logo.png'}></img>
      <div>{
      productList.map(product=>(
                <div key={product.id}>
                    {product.name}<br/>
                    {product.price}<br/>
                    {product.image}<br/>
                    {product.description}<br/>
                     <T_QuantityBtn productInfo={product}/>
                </div>
            ))
    }    
        </div>
    </div>
  )
}

