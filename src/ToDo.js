import React from "react";

const ToDo = () => {
  const [items, setItems] = React.useState([]);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    const theItems = JSON.parse(localStorage.getItem("toDoItem"));
    if (theItems) {
      setItems(theItems);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("toDoItem", JSON.stringify(items));
  }, [items]);

  function handleText(e) {
    setText(e.target.value);
  }

  function additem(e) {
    e.preventDefault();
    if (text.trim()) {
      const newItem = { text: text, completed: false, key: Date.now() };
      setItems([...items, newItem]);
      setText(""); // clear the input after put the task
    }
  }

  function deleteItem(deletedKey) {
    const filterItems = items.filter((item) => item.key !== deletedKey);
    setItems(filterItems);
  }

  function check(key) {
    const update = items.map((item) => {
      if (item.key === key) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(update);
  }
  return (
    <div className="to-do">
      <form action="" onSubmit={additem}>
        <input
          type="text"
          placeholder="Put you task"
          value={text}
          onChange={handleText}
        />
        <input type="submit" value="add" />
      </form>
      <ul style={{ listStyle: "auto" }}>
        {items.map((item) => (
          <li
            key={item.key}
            style={{
              marginBottom: "5px",
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => check(item.key)}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>
            <button
              style={{ transform: " translateX(10px)", cursor: "pointer" }}
              className="button"
              onClick={() => deleteItem(item.key)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
