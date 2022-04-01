import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // ডেটাকে ফেচ করার জন্য useEffect এর useState
    const [products, setProducts] = useState([]);

    // ** fake db থেকে Local Storage এর ডেটা সংগ্রহের জন্য useEffect এর useState
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);


    useEffect(() => {

        // ৫। এখানে fake ডিবি থেকে লোকালস্টোরেজ এর ডেটা সংগ্রহ করা হচ্ছে।
        const storedCart = getStoredCart();


        const savedCart = [];

        // লোকাল স্টোরেজের ডেটা যেহেতু অবজেক্ট তাই তার উপর for in লুপ চালানো হচ্ছে।
        for (const id in storedCart) {
            // লুচ চালিয়ে চেক করা হচ্ছে লোকাল স্টোরেজের আইডিটা আমাদের কোন প্রডাক্ট আইডির সাথে মিলে। যেই প্রডাক্ট আইডিটা মিলবে সেই প্রডাক্টকে addedProduct এ রাখবে।
            const addedProduct = products.find(product => product.id === id);

            // AddedProduct এ যদি কিছু পাওয়া যায় তাহলে তার quantity value চেইঞ্জ করে আমাদের লোকাল স্টোরেজ এর আইডি এর ভ্যালু সেট করা হবে।
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }

        // ডেটা মডিফাই করা শেষ হলে সেটিকে আমাদের fakedb এর useEffect এর useState এ পাঠিয়ে দিবে।
        setCart(savedCart);
    }, [products])





    const handleAddToCart = (selectedProduct) => {

        // ৮। তারপর ইউ হ্যাভ টু বুঝা বাকি!
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);


        // ২। ২য় ধাক্কায় প্রডাক্ট থেকে আইডি নিয়ে addToDb বা fakedb তে পাঠানো হচ্ছে।
        addToDb(selectedProduct.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>

            {/* ৬। ডেটা মডিফাই হয়ে Cart এ যাচ্ছে। */}
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;