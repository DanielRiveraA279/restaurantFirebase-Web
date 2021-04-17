import app from "firebase/app";
//una vez creada la bd en firebase importamos firestore
import 'firebase/firestore';
import 'firebase/storage'; 

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig); //pasamos la config de firebase
    this.db = app.firestore() //una vez cread la bd incorporamos esta linea
    this.storage = app.storage();
  }
}

const firebase = new Firebase(); //creamos un objeto que hereda de la clase Firebase()

export default firebase;
