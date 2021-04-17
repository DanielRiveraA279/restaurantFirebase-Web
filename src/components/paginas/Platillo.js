import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; //para validar
import { FirebaseContext } from "../../firebase";
import { useHistory } from "react-router-dom";

const NuevoPlatillo = () => {
  //context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);
  // console.log(firebase);

  //para redireccionar
  const history = useHistory();

  const [Imagen, setImagen] = useState();
  const [ref, setRef] = useState(null);

  //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
  const uploadFirebase = async (platillo) => {
    try {
      //creamos la carpeta y
      const newRef = firebase.storage.ref("productos").child(Imagen.name); // nombre del archivo
      setRef(newRef);

      await newRef.put(Imagen);

      let urlImagen = await newRef.getDownloadURL(); //descargo url de la imagen

      platillo.imagen = urlImagen; //guardo la url de la imagen
      firebase.db.collection("productos").add(platillo); // en bd dentro de la coleccion(tabla producto)  vas a agregar 'platillo(esto son los datos enviado por el formulario'

      console.log("validacion exitosa", platillo);
      //console.log("URL: " + urlImagen); //quitarle la 'es' primeras antes del http para que pueda leer la imagen

      history.push("/menu");
    } catch (error) {
      alert(error);
    }
  };

  //OBTENIENDO LA IMAGEN
  const changeImagen = (e) => {
    setImagen(e.target.files[0]);
    console.log(Imagen);
  };

  //validar y leer  datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      categoria: "",
      imagen: "",
      descripcion: "",
      existencia: "",
    },
    validationSchema: Yup.object({
      //aqui utilizamos yup para la validacion
      nombre: Yup.string()
        .min(3, "Los Platillos deben tener al menos 3 caracteres")
        .required("El Nombre es obligatorio"),
      precio: Yup.number()
        .min(1, "Debes agregar al menos 1 numero")
        .required("El Precio es obligatorio"),
      categoria: Yup.string().required("La Categoria es obligatoria"),
      existencia: Yup.string().required("La Existencia es obligatoria"),
      descripcion: Yup.string().required("El Nombre es obligatorio"),
    }),
    onSubmit: (platillo) => {
      //console.log(datos);
      try {
        //envio datos recopilados del form
        uploadFirebase(platillo); //subir imagen en storage y guardar nuevo registro en firebase
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Nuevo Platillo</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Platillo"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              //valiamos campo nombre (touched: es cuando se sale del campo sin haber cumplido con lo validado)
              formik.touched.nombre && formik.errors.nombre ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null
            }

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="$20"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {
              //valiamos campo nombre (touched: es cuando se sale del campo sin haber cumplido con lo validado)
              formik.touched.precio && formik.errors.precio ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.precio}</p>
                </div>
              ) : null
            }

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="categoria"
              >
                Categoria
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">--Seleccione--</option>
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="cena">Cena</option>
                <option value="bebida">bebida</option>
                <option value="postre">postre</option>
                <option value="ensalada">ensalada</option>
              </select>
            </div>
            {
              //valiamos campo nombre (touched: es cuando se sale del campo sin haber cumplido con lo validado)
              formik.touched.categoria && formik.errors.categoria ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.categoria}</p>
                </div>
              ) : null
            }

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="existencia"
              >
                Existencia
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="existencia"
                name="existencia"
                value={formik.values.existencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">--Seleccione--</option>
                <option value="disponible">Disponible</option>
                <option value="no disponible">No Disponible</option>
              </select>
            </div>

            {
              //valiamos campo nombre (touched: es cuando se sale del campo sin haber cumplido con lo validado)
              formik.touched.existencia && formik.errors.existencia ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.existencia}</p>
                </div>
              ) : null
            }

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <input type="file" name="imagen" onChange={changeImagen} />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripcion
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                id="descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
            </div>
            {
              //valiamos campo nombre (touched: es cuando se sale del campo sin haber cumplido con lo validado)
              formik.touched.descripcion && formik.errors.descripcion ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.descripcion}</p>
                </div>
              ) : null
            }

            <input
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="Agregar Platillo"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default NuevoPlatillo;
