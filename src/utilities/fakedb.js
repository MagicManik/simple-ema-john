// ৩। ২য় ধাক্কায় ফেইক ডিবি প্যারামিটার হিসবে আইডি পাচ্ছে। প্রথমে প্রডাক্ট বাটন থেকে ডেটা ইভেন্ট হ্যান্ডেলারে আসলো। তারপর ইভেন্ট হ্যান্ডেলার ডেটা থেকে আইডি নিয়ে সেই id দিয়ে এই addToDb ফাংশনকে কল করলো।।

const addToDb = id => {
    let object = {};
    // লোকাল স্টোরেজকে ধরে জাবাস্ক্রিপ্টে পার্স করে ফেলবে।
    const keepAndParseData = JSON.parse(localStorage.getItem('shopping-cart'));

    // পার্স করে কিছু পেলে সেটাকে ইনিশিয়াল অবজেক্ট হিসেবে সেট করবে।
    if (keepAndParseData) {
        object = keepAndParseData;
    }

    // এরপর আমাদের প্যারামিটারে id এর মাধ্যমে যা আসতেছে সেটি ইনিশিয়াল অবজেক্টে পাওয়া গেলে তার ভ্যালু ১ যোগ করে বাড়িয়ে দিবে।
    if (id in object) {
        object[id] = object[id] + 1;
    }

    // প্রথম অবস্থায় ইনিশিয়াল অবজেক্টে কোনোকিছু না পাওয়া গেলে আমাদের প্যারামিটারের মাধ্যমে যে আইডি আসছে সেটিকে ইনিশিয়াল অবজেক্টের property name বানিয়ে তার ভ্যালু হিসেব 1 সেট করে দিবে।  
    else {
        object[id] = 1;
    }


    localStorage.setItem('shopping-cart', JSON.stringify(object));
}



// ৪। এটাকে শপ কম্পোনেন্ট ইউজ করতেছে। শপ কম্পোনেন্ট এটাকে কল করে ডেটা নিয়া খোঁজে বের করবে লোকাল স্টোরেজে যেই আইডিটা আছে সেটি আমাদের কোন প্রডাক্টের।
const getStoredCart = () => {
    let object = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        object = JSON.parse(storedCart);
    }
    return object;
}




// remove data from localStorage
const removeFromDb = id => {
    const keepAndParseData = JSON.parse(localStorage.getItem('shopping-cart'))
    if (keepAndParseData) {
        delete keepAndParseData[id];
        localStorage.setItem('shopping-cart', JSON.stringify(keepAndParseData));
    }
}



// All clear local Storage
const deleteShoppingCart = () => {
    localStorage.removeItem('shopping-cart');
}




export {
    addToDb,
    getStoredCart,
    removeFromDb,
    deleteShoppingCart
}






// // use local storage to manage cart data
// const addToDb = id => {
//     let shoppingCart = {};

//     //get the shopping cart from local storage
//     const storedCart = localStorage.getItem('shopping-cart');
//     if (storedCart) {
//         shoppingCart = JSON.parse(storedCart);
//     }

//     // add quantity
//     const quantity = shoppingCart[id];
//     if (quantity) {
//         const newQuantity = quantity + 1;
//         shoppingCart[id] = newQuantity;
//     }
//     else {
//         shoppingCart[id] = 1;
//     }
//     localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
// }



// const getStoredCart = () => {
//     let shoppingCart = {};

//     //get the shopping cart from local storage
//     const storedCart = localStorage.getItem('shopping-cart');
//     if (storedCart) {
//         shoppingCart = JSON.parse(storedCart);
//     }
//     return shoppingCart;
// }




// const removeFromDb = id => {
//     const storedCart = localStorage.getItem('shopping-cart');
//     if (storedCart) {
//         const shoppingCart = JSON.parse(storedCart);
//         if (id in shoppingCart) {
//             delete shoppingCart[id];
//             localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
//         }
//     }
// }



// const deleteShoppingCart = () => {
//     localStorage.removeItem('shopping-cart');
// }

// export {
//     addToDb,
//     getStoredCart,
//     removeFromDb,
//     deleteShoppingCart
// }