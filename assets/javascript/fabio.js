//
// USER INPUT and authentication
// ========================================================== 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDeRYoE5fWhh3ZA7aN-UDKOiNgP2hI_N6A",
    authDomain: "daytrippersandiego.firebaseapp.com",
    databaseURL: "https://daytrippersandiego.firebaseio.com",
    projectId: "daytrippersandiego",
    storageBucket: "daytrippersandiego.appspot.com",
    messagingSenderId: "616812924303"
};

firebase.initializeApp(config);

var database = firebase.database();

function showLogon() {
    $('#auth').hide();
    $('#greeting > span').empty();
    $("#greeting").prepend("<span>Nice to see you again - now you can look at your saved Points of Interest </span>");
    $('#btn-logout').show();
};

function showSignIn() {
    $('#auth').show();
    $('#greeting > span').empty();
    $('#btn-logout').hide();
};

// ============================================================
// Blake, you can tweak this to populate your p.o.i. list
// ============================================================
//
// function populateList() {
//     // empty the table
//     $("#train-table > tbody").empty();
//     // event listener
//     database.ref().on("child_added", function(childSnapshot, prevChildKey) {
//         console.log(childSnapshot.val());
//         // Store everything into a variable.
//         var trainName = childSnapshot.val().name;
//         var trainDest = childSnapshot.val().dest;
//         var trainTime = (childSnapshot.val().time);
//         var trainFreq = parseInt(childSnapshot.val().freq);
//         var trainUser = (childSnapshot.val().user);
//         // train Info
//         console.log(trainName);
//         console.log(trainDest);
//         console.log(trainTime + typeof(trainTime));
//         console.log(trainFreq + typeof(trainFreq));
//         //   Calculate the frequency
//         var minArrival = compDates(trainTime, trainFreq);
//         console.log('minArrival ' + minArrival);
//         var arrivalTime = moment().add(minArrival, 'minutes').format('HH:mm');
//         // Add each train's data into the table
//         var loggedUser = firebase.auth().currentUser;
//         console.log('user = ' + loggedUser);

//         console.log('trainUser = ' + trainUser);
//         // adding a row in the html 
//         if ((loggedUser == null) || (loggedUser == "") || (trainUser == loggedUser.uid)) {
//             $("#train-table > tbody").prepend("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
//                 trainFreq + "</td><td>" + arrivalTime + "</td><td>" + minArrival + "</td>");
//         };
//     });
// };

// Authentication

$('#btn-login').on("click", function() {
    var email = $('#email').val().trim();
    var pass = $('#password').val().trim();
    console.log('login ' + email);
    console.log('password ' + password);

    var auth = firebase.auth();
    
    console.log('auth ' + auth);
    // sign In
    var promise = auth.signInWithEmailAndPassword(email, pass)
        .then(function(result) {
            showLogon();
            console.log('uid ' + auth.currentUser.uid);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // check password
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
});

$('#btn-signup').on("click", function() {
    var email = $('#email').val().trim();
    var pass = $('#password').val().trim();
    console.log('login ' + email);
    console.log('password ' + password);

    var auth = firebase.auth();
    
    console.log('auth ' + auth);

    // create user
    var promise = auth.createUserWithEmailAndPassword(email, pass)
        .then(function(result) {

            showLogon();
        })
        .catch(function (error) {
            console.log(error);
    });
});

$('#btn-logout').on("click", function() {
    firebase.auth().signOut();
    $('#email').val('');
    $('#password').val('');
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    showLogon();
    // ================= TO DO: add below func when integrated
    // populateList();
    // =======================================================
  } 
  else {
    // No user is signed in.
    showSignIn();
    // ================= TO DO: add below func when integrated
    // populateList();
    // =======================================================
  }
});
