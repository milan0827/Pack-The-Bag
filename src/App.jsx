import { useState } from "react";
import "./App.css";

// const defaultItems = [
//   { id: 1, itemName: "brush", noOfItem: 5, packed: true },
//   { id: 2, itemName: "sun glass", noOfItem: 2, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  const itemsNumber = items.length;
  console.log(itemsNumber);

  function addItems(item) {
    setItems((items) => [...items, item]);
  }

  function deleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackedItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app flex">
      <div className="app-container flex">
        <Logo />
        <TripItemInput
          items={items}
          setItems={setItems}
          onAddItems={addItems}
        />
        <TripItem
          items={items}
          onDeleteItems={deleteItems}
          setItems={setItems}
          onHandlePackedItems={handlePackedItems}
          itemsNumber={itemsNumber}
        />
      </div>
    </div>
  );
}

function Logo() {
  return <h1>Pack The Bag 🎒</h1>;
}

function TripItemInput({ items, setItems, onAddItems }) {
  const [itemName, setItemName] = useState("");
  const [noOfItem, setNoOfItem] = useState(1);

  const id = crypto.randomUUID();

  function handleSubmit(e) {
    e.preventDefault();

    if (!itemName) return;
    const newItem = {
      id,
      itemName,
      noOfItem,
      packed: false,
    };
    onAddItems(newItem);

    setItemName("");
    setNoOfItem(1);
  }

  return (
    <form className="tripItemInput flex" onSubmit={handleSubmit}>
      <div className="flex">
        <p>What do you need for your trip?</p>
        <select onChange={(e) => setNoOfItem(+e.target.value)} value={noOfItem}>
          {Array.from({ length: 25 }, (_, index) => index + 1).map((n) => (
            <option value={n} key={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="item..."
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
        <button className="btn">Add</button>
      </div>
    </form>
  );
}

function TripItem({ items, onDeleteItems, onHandlePackedItems, itemsNumber }) {
  return (
    <>
      {itemsNumber === 0 && <h2>Let's Pack The Bag!!!</h2>}
      <ul className="tripItem flex">
        {items.map((item) => (
          <TripItemList
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onHandlePackedItems={onHandlePackedItems}
          />
        ))}
      </ul>
    </>
  );
}

function TripItemList({ item, onDeleteItems, onHandlePackedItems }) {
  return (
    <li className="tripItemList flex">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onHandlePackedItems(item.id)}
      />
      <span className={item.packed ? "cross-line" : ""}>
        {item.noOfItem} {item.itemName}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>&times;</button>
    </li>
  );
}

export default App;
