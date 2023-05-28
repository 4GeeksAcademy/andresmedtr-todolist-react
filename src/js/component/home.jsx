import React, { useState } from "react";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrayValue, setArrayValue] = useState([]);
  const [showHover, setShowHover] = useState(-1);

  const eventHandlerOnDown = (event) => {
    if (event.key === "Enter" && inputValue != "") submitValue();
  };

  const submitValue = () => {
    const updateArray = [...arrayValue, inputValue];
    setArrayValue(updateArray);
    setInputValue("");
  };

  const saveInput = (e) => {
    setInputValue(e.target.value);
  };

  const deleteTask = (i) => {
    let newTodoList = arrayValue.filter((value, index) => {
      return i != index;
    });
    setArrayValue(newTodoList);
  };

  return (
    <div>
      <div className="titleDiv">
        <h1 className="title rounded-pill text-success text-opacity-50">
          todo List
        </h1>
      </div>
      <div className="bodyDiv">
        <div className="list">
          <input
            type="text"
            value={inputValue}
            onChange={saveInput}
            onKeyDown={eventHandlerOnDown}
            placeholder="Type in and press ↵ to add task"></input>
          <div>
            {arrayValue.map((value, index) => {
              return (
                <div
                  className="inputsFormat"
                  onMouseEnter={() => setShowHover(index)}
                  onMouseLeave={() => setShowHover(-1)}>
                  <p className="valueAttribute" key={index}>
                    {value}
                  </p>
                  <span
                    className="xButton"
                    type="button"
                    onClick={() => deleteTask(index)}>
                    {showHover === index ? "Done√" : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="listLength">
          {arrayValue.length === 0 ? "" : arrayValue.length + " items left"}
        </div>
      </div>
    </div>
  );
};

export default Home;
