const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let span = document.querySelector("#headh1");
let strong = document.querySelector("#strong");
let logout_btn = document.querySelector(".logout-btn");
let serviceform = document.querySelector("#serviceform");
console.log(logout_btn);
console.log(serviceform);


// varibales
let user;


let GetUser = async() =>{
    const { data:Authdata } = await client.auth.getUser()
    if(Authdata){
        console.log(Authdata)
    }else{
        console.log("okk")
    }
 user = Authdata.user
   console.log(Authdata.user);
   console.log(user.user_metadata.username);
   console.log(Authdata.user.user_metadata.email);
   span.innerHTML = `${user.user_metadata.username}`
   strong.innerHTML = `${user.user_metadata.username}`

}
GetUser();


//events:-

logout_btn.addEventListener("click",async()=>{
    const { error } = await client.auth.signOut()
    if(error){
        console.log(error)
    }else{
      window.location.href = "index.html";
    }
})


serviceform.addEventListener("submit",(e)=>{
    e.preventDefault();
    let userDta = new FormData(serviceform);
    console.log(userDta);
    let userInfo = Object.fromEntries(userDta);
    console.log(userInfo);
})