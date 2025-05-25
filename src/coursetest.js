import { Link} from 'react-router-dom';
import T_QuantityBtn from './T_QuantityBtn';
const coursetest = () => {
  let cartItem={
    "cartItem":
    [
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
    ]
  }
  let { cartItem: cartItems } = cartItem;
  let cartEmpty = cartItems.length === 0;
  let grandTotal = cartItems.reduce((total,product)=>{
    return total += product.price*product.quantity
  },0)
  const freeShippingPrice = 99

  return (
    <div>
    {
        cartEmpty &&
        <div>    
            <Link to="/">part three</Link>
        </div>
    }
    {
        !cartEmpty &&
        <div>
            <div id="carSection">
                {
                    cartItems.map(product=>(
                        <div key={product.id}>
                        <img src={process.env.PUBLIC_URL+'/Images/'+product.image}/>
                        {product.name}
                        {product.description}
                        {product.price}
                        <T_QuantityBtn productInfo={product}/>
                        </div>
                    ))
                }
            </div>
            <div id="checOutSection">
                <div> now is {grandTotal} </div>
                {
                    grandTotal >= freeShippingPrice ?　
                    <div>more than $99</div> :
                    <div>less than $99</div>
                }
            </div>
        </div>
    }
    </div>
  )
}

export default coursetest;