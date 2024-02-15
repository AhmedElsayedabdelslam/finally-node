const username=document.querySelector(".inp1").value
const email =document.querySelector(".inp2").value
const password =document.querySelector(".inp3").value
const age =document.querySelector(".inp4").value
const button1 = document.querySelector(".btn")

function submitform(e) {
    e.preventDefault()

    fetch("http://localhost:3000/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, email: email, age: age, password: password })
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data);

        })
        .catch((error) => {
            console.log(error)
        })


    if (username === "" || email === ""  || age === ""|| password === "") {
        alert("please complete the form")
    } else {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("age", age);
        localStorage.setItem("password", password);
      
        setTimeout(() => {
                        // window.location = "login"

                    }, 1000);


    }    

}
button1.addEventListener('click' ,submitform)