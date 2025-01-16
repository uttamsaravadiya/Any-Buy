import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Cart = ({ cart, removeFromCart }) => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };

  const [text, setText] = useState(1);

  function incrHandler(){
    setText(text + 1);
  }

  function decrHandler(){
    if(text<=1){}
    else{
    setText(text - 1)}
  }

  return (
    <div>
      <h1 className='flex justify-center mt-6 text-5xl'>Cart</h1>
      <div className='h-[1px] mt-4 w-[80rem] bg-gray-600 flex m-auto'></div>
      {user ? (
        cart.length === 0 ? (
          <>
          <p className='text-3xl mt-28 text-center'>Your cart is empty.</p>
          <p className='text-lg mt-4 text-center'>Please Select the product</p>
          </>
        ) : 
        cart.map((deal) => (
          <div className='flex w-[1290px] mt-8 bg-rich-300 mb-7 rounded-md h-48 items-center justify-between m-auto'>
              <img src={deal.image} className='h-32 w-32 ml-8 '/>
              <div className='mr-auto ml-14'>
                <p className='mb-6 text-xl font-bold'>
                  {deal.title}
                </p>
                <p className='text-xl font-medium'>
                  {deal.price}
                </p>
              </div>

              <div className='w-28 mr-5'>
                <div className='bg-rich-100 flex justify-center gap-5 py-1 rounded-sm text-[6px] text-[#344151]'>
                  <button onClick={decrHandler} className='border-r-2 text-center w-8 border-rich-400 text-xl'>
                    -
                  </button>
                  <div className='font-bold gap-3 text-xl'>{text}</div>
                  <button onClick={incrHandler} className='border-l-2 text-center w-8 border-rich-400 text-xl'>
                    +
                  </button>
                </div>
                <div>
                  <button className='bg-rich-500 mt-4 h-8 w-[7rem] text-white px-5 rounded-md text-lg'>
                    Buy Now
                  </button>
                  <br/>
                  <button className='bg-red-400 mt-2 h-8 w-[7rem] text-white px-5  rounded-md text-lg'
                    onClick={()=> removeFromCart(deal.id)}>
                    Remove 
                  </button>
              </div>
          </div>
            </div>
          ))
        ) : (
        <div className='flex flex-col justify-center items-center'>
          <p className='text-3xl mt-28 '>Your cart is empty.</p>
          <button onClick={handleLogin} className='bg-slate-400  mt-8 h-8 w-[7rem] text-white px-5  rounded-md text-lg'>Login</button>
          {/* <button onClick={handleSignup}>Sign up</button> */}
        </div>)
    }

    </div>
  );
};

export default Cart;