const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


let loginform = document.querySelector("#loginform");
let signupform = document.querySelector("#signupform");


// console.log(signupform,loginform);

// varibales:-
let userDta;
let userInfo;

 loginform && loginform.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log("okkk");
       userDta = new FormData(loginform);
     userInfo = Object.fromEntries(userDta);
    console.log(userInfo);


        //input
    let Input = document.querySelectorAll("input");
console.log(Input);

let flag = true;

Input.forEach((input)=>{
    if(input.value === ""){
        flag = false
    }
})

if(flag === false){
Swal.fire({
  title: "fill all inputfields",
  icon: "question",
  draggable: true
});
 return;
}

//database _ insert:-
    const { data, error } = await client.auth.signInWithPassword({
    email: userInfo.email,
    password: userInfo.password
});

console.log("LOGIN DATA:", data);
console.log("LOGIN ERROR:", error);
if(data){
    //sweets alerts
Swal.mixin({
  toast: true,
  position: "top-center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
}).fire({
  icon: "success",
  title: "LoGIn successfully"
});
    setTimeout(() =>{
  window.location.href = "dashboard.html"
  },3000)
}else{
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Invalid fields!",
});
    console.log(error);
}

});



 signupform && signupform.addEventListener("submit",async(e)=>{
    e.preventDefault()
 console.log("okkk");
    userDta = new FormData(signupform);
     userInfo = Object.fromEntries(userDta);
    console.log(userInfo);

    //input
    let Input = document.querySelectorAll("input");
console.log(Input);

let flag = true;

Input.forEach((input)=>{
    if(input.value === ""){
        flag = false
    }
})

if(flag === false){
Swal.fire({
  title: "fill all inputfields",
  icon: "question",
  draggable: true
});

 return;
}


  //Auth
    const { data, error: usererror } = await client.auth.signUp({
        "email": userInfo.email,
        "password": userInfo.password, 
        
        //metadata:-
        options: {
            data: {
                username : userInfo.username
            }
        }

    })

let user = data.user;
console.log("AUTH UUID:", user.id);


if (usererror) {
    console.log(usererror);
    return;
}

 //Database insert:-
  
 
 const { error } = await client
        .from('Users-data')
        .insert({
            "name": userInfo.username,
            "email" : userInfo.email,
            "user_id" : user.id
        }
        )
        if(error){
            console.log(error);
              Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
});
        }else{
            console.log("okkkk");
            //sweetalert:-
             Swal.mixin({
  toast: true,
  position: "top-center",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
}).fire({
  icon: "success",
  title: "Signed in successfully"
});
  setTimeout(() =>{
  window.location.href = "dashboard.html"
  },2000)
        }

 

})