import { useState } from 'react';

import './App.css';

function App() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [bucketList, setBucketList] = useState<any>([]);

  const addItemHandler = (e: any) => {
    e.preventDefault();
    let addedItem = {
      id: (Math.random() * 1000).toFixed(0),
      itemName: item,
      quantity: quantity,
    };
    let currentItemList = bucketList;
    currentItemList.push(addedItem);
    setBucketList(currentItemList);
    setItem('');
    setQuantity('');
  };

  const addQuantity = (id: any) => {
/*
    for (let index = 0; index < bucketList.length; index++) {
      if(bucketList[index].id===id)
      {
        bucketList[index].quantity++;
      }}

*/

    let newBL = bucketList.map((item: any) => {
      if (item.id === id) {
        let newQuantity: number = item.quantity;
        newQuantity++;
        return {
          ...item,
          quantity: newQuantity,
        };
      } else {
        return item;
      }
    });
    setBucketList(newBL);
  };

  const subtractQuantity = (id: any) => {
    let newBL = bucketList.map((item: any) => {
      if (item.id === id) {
        if (item.quantity === 1) {
          return item;
        } else {
          item.quantity = item.quantity - 1;
          return item;
        }
      } else {
        return item;
      }
    });
    setBucketList(newBL);
  };

  const removeListItem = (id: any) => {
    let newBL = bucketList.filter((item: any) => item.id !== id);
    setBucketList(newBL);
  };
  return (
    <div className="App">
      <h1 style={{ color: 'blue' }}>Store</h1>
      <form onSubmit={addItemHandler}>
        <label htmlFor="item">Item</label>
        <br />
        <input type="text" id="item" name="item" onChange={(e) => setItem(e.target.value)} value={item}></input>
        <br />
        <label htmlFor="quantity">Quantity</label>
        <br />
        <input
          type="number"
          id="quantity"
          name="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        ></input>
        <br />
        <input type="submit" value="Add Item"></input>
      </form>
      <h4>Bucket</h4>
      {bucketList.map((item: any) => (
        <div key={item.id}>
          <span onClick={() => removeListItem(item.id)} style={{ color: 'darkturquoise' }}>
            {' '}
            {item.itemName} x {item.quantity}{' '}
          </span>
          <span
            style={{ color: 'green', fontWeight: 'bolder', cursor: 'pointer' }}
            onClick={() => addQuantity(item.id)}
          >
            {' '}
            +{' '}
          </span>
          <span
            style={{ color: 'red', fontWeight: 'bolder', cursor: 'pointer' }}
            onClick={() => subtractQuantity(item.id)}
          >
            {' '}
            -{' '}
          </span>
        </div>
      ))}
    </div>
  );
}
export default App;
