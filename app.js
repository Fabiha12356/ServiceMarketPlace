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

//database _ insert:-
    const { data, error } = await client.auth.signInWithPassword({
    email: userInfo.email,
    password: userInfo.password
});

console.log("LOGIN DATA:", data);
console.log("LOGIN ERROR:", error);
if(data){
    window.location.href = "dashboard.html";
}else{
    console.log(error);
}

});



 signupform && signupform.addEventListener("submit",async(e)=>{
    e.preventDefault()
 console.log("okkk");
    userDta = new FormData(signupform);
     userInfo = Object.fromEntries(userDta);
    console.log(userInfo);

 //Database insert:-
    const { error } = await client
        .from('Users-data')
        .insert({
            "name": userInfo.username,
        }
        )
        if(error){
            console.log(error)
        }else{
            console.log("okkkk")
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
if(data){
    console.log(data);
    window.location.href = "dashboard.html"
}else{
    console.log(usererror);
}

})