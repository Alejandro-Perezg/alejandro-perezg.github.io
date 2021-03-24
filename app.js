// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBogKY_ExmhgrtBrdhDO7ovycAasA0NzfE",
    authDomain: "salon-clases.firebaseapp.com",
    databaseURL: "https://salon-clases.firebaseio.com",
    projectId: "salon-clases",
    storageBucket: "salon-clases.appspot.com",
    messagingSenderId: "917830244234",
    appId: "1:917830244234:web:d2290a5cbc57bb079eda73"
  };
// Initialize Firebase
var firebase;
firebase.initializeApp(firebaseConfig);

//generate hash id
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
    });
    }

function newEntry(){
    document.getElementById("card").style.display = "grid";
    document.getElementById("topnav").style.display = "block";
    document.getElementById("content").style.display = "none";
};

function returnToMain(){
    get_data();
    document.getElementById("topnav").style.display = "block";
    document.getElementById("card").style.display = "none";
    document.getElementById("content").style.display = "grid";

};

function post_blog(){
    var blog ={
        title: document.getElementById("card-title").value,
        author: document.getElementById("card-author").value,
        text: document.getElementById("card-intext").value
    }
    firebase.database().ref("blog/"+uuidv4()).set(blog)
    document.getElementById("card-author").value=""
    document.getElementById("card-title").value=""
    document.getElementById("card-intext").value=""

};

function get_data() {
    firebase.database().ref("/").once("value", function (database) {
        database.forEach(function (content) {
            var posts = content.val()
            var results = document.getElementById('content');
            if (results) {
                results.innerHTML = "";
                for (var id in posts) {
                    tmp = id.toString()
                    console.log(posts)
                    //Loop through the object to get each objects data
                    results.innerHTML +=
                    `<div class="post-container" id="post-container">
                    <p id="post-author">${posts[id].author.toUpperCase().bold()}<\p>
                    <p id="post-text">${posts[id].text}<\p>
                    <p id="post-title">${posts[id].title.toUpperCase().bold()}<\p>
                    <\div>`;
                }
            }


        })
    })
}

get_data();
