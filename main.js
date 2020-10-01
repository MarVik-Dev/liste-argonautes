
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBRLiCduZ2WU9VUEO7VO5wPf65C0daAohw',
  authDomain: 'argonaute-b7ae0.firebaseapp.com',
  databaseURL: 'https://argonaute-b7ae0.firebaseio.com',
  projectId: 'argonaute-b7ae0',
  storageBucket: 'argonaute-b7ae0.appspot.com',
  messagingSenderId: '126567166535',
  appId: '1:126567166535:web:0b8b70119cc3d012b57762'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let nameA, typeA

function Ready () {
  nameA = document.getElementById('nameargo').value
  typeA = document.getElementById('typeargo').value
}

// ---------process insert&modification---------------------------------------------------------------- //
document.getElementById('addargo').onclick = function () {
  Ready()
  const idA = Math.floor(Math.random() * 1000)
  firebase.database().ref('argonautes/' + nameA).set({
    NameArgonaute: nameA,
    TypeArgonaute: typeA,
    IdArgonaute: idA
  })
  document.location.reload()
}
// ------------Suppression---------------------------------------------------- //

document.getElementById('supprargo').onclick = function () {
  Ready()
  firebase.database().ref('argonautes/' + nameA).on('value', function (snapshot) {
    document.getElementById('nameargo').value = snapshot.val().NameArgonaute
    firebase.database().ref('argonautes/' + nameA).remove()
  })
  document.location.reload()
}

// ------------Au chargement de la page => Listing argonautes firebase----------------------- //

window.addEventListener('load', () => {
  const database = firebase.database()
  const ficheArgo = document.querySelector('.ficheargovue')
  const ref = database.ref('argonautes')
  ref.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const type = childSnapshot.val().TypeArgonaute
      const nom = childSnapshot.val().NameArgonaute
      console.log('Argonaute :', nom, type)
      const newArgo = document.createElement('div')
      newArgo.classList.add('flex-row-item')
      newArgo.innerHTML =
      ` 
        <h5 class='typeargovue'>${type}</h5>
        <h3 class='nameargovue'>${nom}</h3>  
      `
      ficheArgo.appendChild(newArgo)
      console.log('Details argonaute en DB Firecase:', newArgo)
    })
  })
})

// --------------- Evolution à apporter------------------------------------------------------ //

// window.addEventListener('load', () => {
//   const database = firebase.database()
//   const ficheArgo = document.querySelector('.ficheargovue')
//   console.log('la fiche argonaute', ficheArgo)
//   const ref = database.ref('argonautes')
//   ref.on('value', function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
//       const nom = childSnapshot.val().NameArgonaute
//       const type = childSnapshot.val().TypeArgonaute
//       const id = childSnapshot.val().IdArgonaute
//       const img = ''
//       console.log(nom, type)
//       const newArgo = document.createElement('div')
//       newArgo.innerHTML =
//       ` <div class="col-md-4 mt-5 ficheargovue">
//       <div class="card mb-4 shadow-sm pt-3">
//       <h4 class='nameargovue'>${nom}</h4> <br>  
//       <div class='imgargovue'>${id}</div>
//       <h4 class='typeargovue'>${type}</h4>
//       <button type="button" class="btn btn-danger">
//       Supprimer
//       </button>
//       </div>
//       </div>`
//       ficheArgo.appendChild(newArgo)
//       limage()
      
//       function limage () {
//         const imgArgo = document.querySelector('.imgargovue')
//         console.log('imageArg', imgArgo);
//         const imgA = document.createElement('img')
//         document.getElementById('imgargovue');
//         imgA.classList.add('imgargovue')
//         if (type === 'Guerrier') {
//           imgA.src = './images/Guerrier.png'
//         } else if (type === 'Reine') {
//           imgA.src = './images/Reine.png'
//         } else {
//           imgA.src = './images/Sorcier.png'
//         }
//         console.log('limage', imgA)
//         imgArgo.appendChild(imgA)
//         console.log('fin2', newArgo)
//       }
//     })
//     console.log('fin de newArgo', ficheArgo)
//   })
// })
