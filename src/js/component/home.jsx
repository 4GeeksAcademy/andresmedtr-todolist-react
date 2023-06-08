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
    setArrayValue([newTodo, ...arrayValue]);
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
    let requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arrayValue),
    };
    try {
      fetch(
        "http://assets.breatheco.de/apis/fake/todos/user/andresmedtr",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => console.log(data, "this is the data"));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // USE EFFECT TO FETCH THE LIST
  useEffect(async () => {
    var requestOptions = {
      method: "POST",
      body: JSON.stringify([
        { label: "Make the bed", done: false },
        { label: "Walk the dog", done: false },
        { label: "Do the replits", done: false },
      ]),
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
    fetchTodoList();
    setArrayValue([]);
  }, []);

  // USE EFFECT TO UPDATE THE LIST
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
              clearList(setArrayValue([]));
            }}>
            Delete list
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
