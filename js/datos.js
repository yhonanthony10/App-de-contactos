

const firebaseConfig = {
    apiKey: "AIzaSyALdyjQLUOj0Y8ioJ_VIiS3hwFRRDNmhzo",
    authDomain: "app-de-contactos-d5e19.firebaseapp.com",
    projectId: "app-de-contactos-d5e19",
    storageBucket: "app-de-contactos-d5e19.appspot.com",
    messagingSenderId: "640245038152",
    appId: "1:640245038152:web:319a4c471305d46e31ec7d"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  let nombre = document.getElementById("name");
  let cel = document.getElementById("celphone");
  let save_btn = document.getElementById("save-btn");
  let lista = document.getElementById("lista");
  save_btn.addEventListener("click", () => {
    let data = {
      nombre: nombre.value,
      celular: cel.value,
    };
    save_data_firebase(data);
  });
  
  const save_data_firebase = (d) => {
    db.collection("contactos")
      .add(d)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        get_data_firebase();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  
  let contactos_arr = [];
  
  const get_data_firebase = () => {
    contactos_arr = [];
    db.collection("contactos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          contactos_arr.push(doc.data());
        });
        buildList();
      });
  };
  
  const buildList = () => {
    lista.innerHTML = "";
    contactos_arr.forEach((e) => {
      lista.insertAdjacentHTML(
        "beforeend",
        `
       <li>${e.nombre} - ${e.celular}</li>
      `
      );
    });
  };
  
  get_data_firebase();