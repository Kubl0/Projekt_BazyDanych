/* eslint eqeqeq: 0 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DrinkEdit from "./drinkEditForm";
import saveJSON from "./downloadDrink";
import "../../style.css";

export default function DrinkDetails() {
  const { id } = useParams();

  const [drink, setDrink] = useState({});
  const [loaded, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/drinks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDrink(data[0]);
        setIsLoading(true);
      });
  });

  if (loaded === true) {
    return (
      <div className="mt-[100px] flex flex-col items-center">
        <div className="relative flex flex-col items-center mb-10 bg-stone-300 p-10 rounded-md shadow-md w-[800px] text-lg">
          <img src={drink.image} alt={drink.name} className="drinkImage" />
          <h2>
            <b>Nazwa: </b>
            {drink.name}
          </h2>
          <p>
            <b>Typ: </b>
            {drink.type}
          </p>
          <p>
            <b>Szklanka: </b>
            {drink.type_of_glass}
          </p>
          <b>Składniki:</b>
          <ul className="list-decimal">
            {" "}
            {drink.ingredients
              .split(",")
              .map((item) => (item !== "" ? <li key={item}>{item}</li> : null))}
          </ul>
          <b>Przepis: </b>
          <ul className="list-disc text-justify">
            {drink.recipe
              .split(".")
              .map((item) => (item !== "" ? <li key={item}>{item}</li> : null))}
          </ul>
          <br />
          <button
            className="text-lg bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
            type="submit"
            onClick={() => {
              const data =
                " Nazwa: " +
                drink.name +
                "\n Składniki: " +
                drink.ingredients +
                "\n Przepis: " +
                drink.recipe +
                "\n\n";

              saveJSON({ data });
              console.log(data);
            }}
          >
            Pobierz przepis
          </button>
          <br />
          <DrinkEdit drink={drink} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-[100px] text-center">
        Ladowanie...
        <br />
        <br />
      </div>
    );
  }
}
