import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const Ordercontext = createContext();

async function storedata(data) {
  console.log("store data function run!" + data);
  try {
    const response = await fetch("http://localhost:5000/api/addtocart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        Order_data: data,
      }),
    });
    const json = await response.json();
    console.log(json);
    console.log(data);
    console.log("try case");
  } catch (error) {
    console.log("error: " + error);
  }
}
async function removedata(data) {
  try {
    const response = await fetch("http://localhost:5000/api/removeitem", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        Order_data: data,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function checkout(data) {
  try {
    const response = await fetch("http://localhost:5000/api/checkout", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        Order_data: data,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
const reducer = (state, action) => {
  console.log("reducer run");
  switch (action.type) {
    case "ADD":
      for (let index = 0; index < state.length; index++) {
        if (
          state[index].name === action.name &&
          state[index].size === action.size
        ) {
          console.log("existing add");

          const updatedItem = {
            ...state[index],
            qty: Number(state[index].qty) + Number(action.qty),
            price: Number(state[index].price) + Number(action.price),
          };

          console.log(updatedItem);
          let data = [
            ...state.slice(0, index),
            updatedItem,
            ...state.slice(index + 1),
          ];
          storedata(data);
          return data;
        }
      }

      console.log("new Add");
      state = [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          qty: action.qty,
          size: action.size,
        },
      ];
      let data = state;
      storedata(data);
      return data;
      break;

    case "remove":
      for (let index = 0; index < state.length; index++) {
        if (
          state[index].name === action.name &&
          state[index].qty === action.qty &&
          state[index].price === action.price
        ) {
          state.splice(index, 1);
          const data = [...state];
          console.log(state);
          removedata(data);
          return [...state];
          break;
        }
      }
      break;
    case "checkout":
      let date = new Date();
      let newarray = state.map((value, index) => {
        return {
          checkout: true,
          delivered: false,
          data: date.toDateString(),
          ...value,
        };
      });
      // console.log(newarray);
      checkout()
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(resp);
      return [...newarray];
      break;
    default:
      console.log("some error during add cart");
      break;
  }
};

export function ContextReducer({ children }) {
  let [cartinitialdata, setCartinitialdata] = useState([]);

  // let cartinitialdata = [];

  async function getdata() {
    console.log("get Data Called!");
    try {
      const response = await fetch("http://localhost:5000/api/getdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("email"),
        }),
      });
      const json = await response.json();
      setCartinitialdata(json.cartdata);
      // cartinitialdata = ;
      console.log(" cart initials data: ", cartinitialdata);
      console.log(json.cartdata);
      for (let index = 0; index < cartinitialdata.length; index++) {
        if (!cartinitialdata[index].checkout) {
          dispatch({
            type: "ADD",
            id: cartinitialdata[index].id,
            name: cartinitialdata[index].name,
            qty: cartinitialdata[index].qty,
            price: cartinitialdata[index].price,
            size: cartinitialdata[index].size,
          });
        }
      }
      console.log("try case");
    } catch (error) {
      console.log("error: " + error);
    }
  }
  useEffect(() => {
    getdata();
  }, []);
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <>
      <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
          <Ordercontext.Provider value={cartinitialdata}>
            {children}
          </Ordercontext.Provider>
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
    </>
  );
}

export const useDispatchcart = () => useContext(CartDispatchContext);
export const useCart = () => useContext(CartStateContext);
export const Ordersdetail = () => useContext(Ordercontext);
