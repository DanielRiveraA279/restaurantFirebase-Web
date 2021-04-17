import React, { useContext, useRef } from "react";
import { FirebaseContext } from "../../firebase";

const Platillo = ({ platillo }) => {
  //existencia ref para acceder al valor directamente
  const existenciaRef = useRef(platillo.existencia);

  //context de firebase para cambios en la base de datos
  const { firebase } = useContext(FirebaseContext);

  //modificar estado del platillo osea la existencia
  const actualizarDisponibilidad = () => {
    //modificar un string 'true' o 'false'
    const existencia = existenciaRef.current.value === "true";

    try {
      //modificamos la existencia en firebase
      firebase.db.collection("productos").doc(platillo.id).update({
        existencia: existencia,
      });
    } catch (error) {
      console.log(error);
    }

    //aqui ya esta escuchando el valor del control select
    console.log(existenciaRef.current.value);
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={platillo.imagen} alt="imagen platillo" />
            <div className="sm:flex sm:-mx-2">
              <label className="ml-2 mt-2">
                <span className="text-gray-800">Existencia</span>
                <select
                  className="shadow appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline"
                  value={platillo.existencia}
                  ref={existenciaRef}
                  onChange={actualizarDisponibilidad}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">
              {platillo.nombre}
            </p>
            <p className="text-gray-600 mb-4">
              Categoria:{" "}
              <span className="text-gray-700 font-bold">
                {platillo.categoria.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{platillo.descripcion}</p>
            <p className="text-gray-600 mb-4">
              Precio:{" "}
              <span className="text-gray-700 font-bold">
                ${platillo.precio}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platillo;
