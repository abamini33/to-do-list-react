import React, { useReducer, useState } from "react";
import "./App.css";

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, action.payload];
        case "REMOVE_ITEM":
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
};

function Input({ dispatch }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") return;
        const newItem = {
            id: Date.now(),
            text: text.trim(),
        };
        dispatch({ type: "ADD_ITEM", payload: newItem });
        setText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ajouter une liste"
            />
            <button type="submit">Ajouter</button>
        </form>
    );
}

function List({ items, dispatch }) {
    return (
        <ul>
            {items.map((item) => (
                <ListItem key={item.id} item={item} dispatch={dispatch} />
            ))}
        </ul>
    );
}

function ListItem({ item, dispatch }) {
    const handleRemove = () => {
        dispatch({ type: "REMOVE_ITEM", payload: item.id });
    };

    return (
        <li>
            {item.text}
            <button onClick={handleRemove}>Retirer</button>
        </li>
    );
}

function App() {
    const [items, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="App">
            <Input dispatch={dispatch} />
            <List items={items} dispatch={dispatch} />
        </div>
    );
}

export default App;
