import { array } from "prop-types";
import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrayValue, setArrayValue] = useState([]);
  const [showHover, setShowHover] = useState(-1);

  // PUT METHOD
  // const updateTodoList = async () => {
  //   await fetch("http://assets.breatheco.de/apis/fake/todos/user/andresmedtr", {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(arrayValue),
  //   })
  //   try {
  //     then((response) => response.json())
  //     .then((data) => console.log(data, "this is the data"))
  //     .catch((error) => console.log("Error:", error));
  // }
  // };

  const updateTodoList = async () => {
    var requestOptions = {
      method: "PUT",
      body: JSON.stringify(arrayValue),
      headers: { "Content-type": "application/json" },
    };
    try {
      const response = await fetch(
        "http://assets.breatheco.de/apis/fake/todos/user/andresmedtr",
        requestOptions
      );
      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // UPDATING THE LIST
  const submitValue = () => {
    const newTodo = { label: inputValue, done: false };
    // const newTodoList = [...arrayValue, newTodo];
    // console.log(newTodo, "This is the current input");
    // console.log(newTodoList, "Updated list with the input");
    setArrayValue([newTodo, ...arrayValue]);
    // console.log(arrayValue, "Set value already done");
    setInputValue("");
  };

  // ENTERING VALUE TO THE LIST
  const eventHandlerOnDown = (event) => {
    if (event.key === "Enter" && inputValue != "") submitValue();
  };

  // SETTING THE VALUE
  const saveInput = (e) => {
    setInputValue(e.target.value);
  };

  // DELETTING TASKS
  const deleteTask = (i) => {
    let newTodoList = arrayValue.filter((value, index) => {
      return i != index;
    });
    setArrayValue(newTodoList);
  };
  // CLEARING THE LIST
  const clearList = () => {
    setArrayValue([]);
  };

  // USE EFFECT HOOK METHOD TO USE THE API
  useEffect(() => {
    fetchTodoList();
  }, []);

  //
  useEffect(() => {
    updateTodoList();
    console.log("Current array value:", arrayValue);
  }, [arrayValue]);

  // FETCHING THE DATA
  const fetchTodoList = () => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/andresmedtr")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArrayValue(data);
      });
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
          {/* INPUT TEXT */}
          <input
            type="text"
            value={inputValue}
            onChange={saveInput}
            onKeyDown={eventHandlerOnDown}
            placeholder="Type in and press ↵ to add task"></input>
          <div>
            {/* MAPPING THE ARRAY TO STORE IT */}
            {arrayValue.map((value, index) => {
              return (
                <div
                  className="inputsFormat"
                  onMouseEnter={() => setShowHover(index)}
                  onMouseLeave={() => setShowHover(-1)}>
                  <p className="valueAttribute" key={index}>
                    {value.label}
                  </p>
                  <span
                    // DELETING FROM THE LIST
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

          <span
            className="clearButton"
            type="button"
            onClick={() => {
              clearList();
            }}>
            Delete list
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
