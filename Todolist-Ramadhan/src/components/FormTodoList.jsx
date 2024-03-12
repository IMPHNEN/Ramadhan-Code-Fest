import { FiEdit2, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  addTodoList,
  removeTodoList,
  editTodoList,
  toggleTodoList,
  filterTodoList,
} from "../redux/actions/todoListAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

function FormTodoList() {
  const dispatch = useDispatch();
  const { todos, filter } = useSelector((state) => state);
  const [inputTodoList, setInputTodoList] = useState("");
  const [updateTodoList, setUpdateTodoList] = useState(null);
  const [myDateTime, setMyDateTime] = useState(new Date());

  // add date time
  useEffect(() => {
    const interval = setInterval(() => {
      setMyDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDateTime = myDateTime.toLocaleString();

  // add localstorage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("list"));
    if (storedList == 0 && storedList.length > 0) {
      dispatch(addTodoList(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todos));
  }, [todos]);

  // Conditional todolist
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputTodoList.trim()) {
      toast.error("This input must not be empty!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (updateTodoList) {
      // Edit TODO
      const updatedTodo = {
        ...updateTodoList,
        title: inputTodoList.trim(),
      };
      dispatch(editTodoList(updatedTodo));
      setUpdateTodoList(null);
      setInputTodoList("");
      toast.success("Edit the task list data successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Add TODO
      let todoObj = {
        id: Math.floor(Math.random() * 1000),
        title: inputTodoList.trim(),
        completed: false,
      };
      setInputTodoList("");
      dispatch(addTodoList(todoObj));
      toast.success("Successfully added a task list", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleEditTodoList = (todo) => {
    setUpdateTodoList(todo);
    setInputTodoList(todo.title);
  };

  // Delete TODO
  const handleRemoveTodoList = (todo) => {
    toast.info("Delete task list data successfully", {
      position: "top-right",
      hideProgressBar: false,
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setInputTodoList(todo.title),
      dispatch(removeTodoList(todo.id)),
      setInputTodoList("");
  };

  // Check TODO when completed
  const handleCheckboxTodoList = (todo) => {
    dispatch(toggleTodoList(todo));
  };

  // Filter TODO
  const handleFilterTodoList = (filter) => {
    dispatch(filterTodoList(filter));
  };

  const getFilteredTodoList = () => {
    switch (filter) {
      case "ALL":
        return todos;
      case "ACTIVE":
        return todos.filter((todo) => !todo.completed);
      case "COMPLETED":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodoList = getFilteredTodoList();

  return (
    /* START: FORM TODO */
    <main className="w-[90%] sm:w-max h-auto sm:h-auto lg:h-auto mx-auto md:mx-auto flex sm:flex justify-center sm:justify-center items-center sm:items-center font-sansPro flex-col mt-20 lg:mt-20 md:mt-10">

      {/* START: NAVIGATION */}
      <Header myDateTime={formattedDateTime} />
      {/* END: NAVIGATION */}

      <section className="flex sm:flex justify-center sm:justify-center items-center sm:items-start w-full mx-4 sm:mx-auto mt-10 sm:mt-10 md:mt-5 lg:mt-10">
        <form onSubmit={handleSubmit}>
          <input
            className="w-full sm:w-[450px] px-2 py-2 outline-none border-2 border-violet-600 rounded-sm caret-violet-600 text-violet-600 invalid:border-red-600"
            type="text"
            name="todo"
            id="todo"
            placeholder="What to do"
            value={inputTodoList}
            onChange={(e) => setInputTodoList(e.target.value)}
            autoComplete="off"
          />
          <button
            className={
              "inline-block ml-0 sm:ml-5 mt-5 sm:mt-0 w-full sm:w-[16vh] h-10 sm:h-auto px-20 sm:px-1.5 sm:py-2 py-2 rounded-sm bg-violet-600 text-white hover:bg-violet-800 hover:transition hover:duration-200 hover:ease-in hover:font-bold uppercase border-none outline-none text-center sm:text-center"
            }
            type="submit"
          >
            {updateTodoList ? "update" : "add"}
          </button>
        </form>
      </section>
      {/* END FORM TODO */}

      {/* START: Filter Button */}
      <section className="font-sansPro flex flex-wrap justify-center sm:justify-start md:justify-center items-center mx-auto mt-6 sm:mt-6 md:mt-6 lg:mt-6">
        <button
          className={`px-3 py-2 sm:px-4 sm:py-2 me-3 sm:me-4 rounded-full font-bold mb-2 sm:mb-0 text-white ${filter === "ALL" ? "bg-green-500" : "bg-slate-500"
            }`}
          onClick={() => handleFilterTodoList("ALL")}
        >
          ALL
        </button>
        <button
          className={`px-3 py-2 sm:px-4 sm:py-2 me-3 sm:me-4 rounded-full font-bold mb-2 sm:mb-0 text-white ${filter === "ACTIVE" ? "bg-green-500" : "bg-slate-500"
            }`}
          onClick={() => handleFilterTodoList("ACTIVE")}
        >
          ACTIVE
        </button>
        <button
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full font-bold mb-2 sm:mb-0 text-white ${filter === "COMPLETED" ? "bg-green-500" : "bg-slate-500"
            }`}
          onClick={() => handleFilterTodoList("COMPLETED")}
        >
          COMPLETED
        </button>
      </section>
      {/* END: Filter Button */}

      {/* START: List Todo */}
      <section className="w-[90%] md:w-[90%] lg:w-[90%] flex flex-col gap-3 mx-auto mt-5 md:mt-6 lg:mt-6 bg-slate-50 shadow rounded px-4 py-4">
        {filteredTodoList.length === 0 ? (
          <p className="text-center text-lg text-red-600 font-bold">
            No data to display
          </p>
        ) : (
          filteredTodoList.map((todo) => (
            <div key={todo.id} className="flex items-center mb-4 p-2 border-2">
              <input
                className="w-7 h-5 sm:w-9 sm:h-8 cursor-pointer"
                type="checkbox"
                name="todo"
                id="todo"
                checked={todo.completed}
                onChange={() => handleCheckboxTodoList(todo)}
              />
              <p
                className="text-xl ml-1 text-violet-600"
                style={
                  todo.completed
                    ? { textDecoration: "line-through" }
                    : { textDecoration: "none" }
                }
              >
                {todo.title}
              </p>
              {!todo.completed && (
                <div className="flex items-center ml-auto gap-4 cursor-pointer">
                  <button onClick={() => handleEditTodoList(todo)}>
                    <FiEdit2 className="text-xl sm:text-2xl text-green-700" title="edit" />
                  </button>
                  <button onClick={() => handleRemoveTodoList(todo)}>
                    <FiTrash className="text-xl sm:text-2xl text-red-700" title="delete" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </section>
      {/* END: List Todo */}

      {/* START: FOOTER */}
      <Footer />
      {/* END: FOOTER */}
      <ToastContainer />
    </main>
  );
}

export default FormTodoList;
