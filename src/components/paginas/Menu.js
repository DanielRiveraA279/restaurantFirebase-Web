import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase"; //ataca al index
import Platillo from "../ui/Platillo";

const Menu = () => {
  const [platillos, guardarPlatillos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerPlatillos = () => {
      const resultado = firebase.db
        .collection("productos")
        .onSnapshot(manejarSnapshot);
    };
    obtenerPlatillos();
  }, []);

  //Snapshot: nos permite utilizar la base de datos en tiempo real
  function manejarSnapshot(snapshot) {
    //va acumulando todos los registros en tiempo real gracias al snapshot
    const platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(), // toda la info mas el id
      };
    });
    guardarPlatillos(platillos); //almacenamos rdos en el state
  }

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Platillo
      </Link>
      {platillos.map((item) => (
        <Platillo key={item.id} platillo={item} />
      ))}
    </>
  );
};

export default Menu;
