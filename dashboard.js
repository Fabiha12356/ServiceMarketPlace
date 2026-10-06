const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let span = document.querySelector("#headh1");
let strong = document.querySelector("#strong");
let logout_btn = document.querySelector(".logout-btn");
let serviceform = document.querySelector("#serviceform");
let card = document.querySelector("#card");
let cancel_button = document.querySelector(".cancel-button");
console.log(cancel_button);




    
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
   console.log("AUTH UUID:", Authdata.user.id);

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

let file;
let imageURL;
let avatarFile ;




serviceform.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let userDta = new FormData(serviceform);
    let userInfo = Object.fromEntries(userDta);
    console.log(userInfo);


    //GeT:-
// let Input = document.querySelectorAll("input");
// let textarea = document.querySelector("textarea");
// let Select = document.querySelectorAll("select");


//Empty LOgiC :-

// for(let inputs of Input){
//     if(inputs.value.trim()){
//         Swal.fire({
//   title: "fill all inputfields",
//   icon: "question",
//   draggable: true
// });
//         return
//     }
// }

// if (textarea.value.trim() === "") {
//       Swal.fire({
//   title: "write something in textarea",
//   icon: "question",
//   draggable: true
// });
//     return;
// }

// for(let selects of Select){
//     if(selects.value ===""){
//         Swal.fire({
//   title: "Choose Options",
//   icon: "question",
//   draggable: true
// });
//         return
//     }
// }



        //Services
    const { error } = await client
  .from('Receipe')
  .insert({ 
           "recipename": userInfo.tittle,
            "category": userInfo.Category,
            "description": userInfo.description,
             "users-id": user.id,
             "StartingPrice": userInfo.StartingPrice,
             "Delivery Time" : userInfo.DeliveryTime,
   })
   if(error){
    console.log(error)
   }else{
    console.log("hugaya?")
   }




async function getServices() {
    //select:-
     const { data: Services, error:Error } = await client
    .from("Receipe")
    .select()
     .eq("users-id", user.id);
console.log("SERVUCES:", Services);
console.log("ERROR:", Error);

 card.innerHTML = "";
Services.forEach((service) => {





    card.innerHTML +=`   <article class="my-service-card">

                    <div class="my-service-image design">
                         ${service.category}
                    </div>

                    <div class="my-service-content">

                        <span class="service-category">
                            ${service.category}
                        </span>

                        <h3>
                            ${service.description}
                        </h3>

                        <div class="my-service-info">

                            <span>
                                Starting at
                                <strong>$${service.StartingPrice}</strong>
                            </span>

                            <span>
                                ⭐ 4.9
                            </span>

                        </div>


                        <div class="service-actions">

                            <button class="edit-btn">
                                Edit
                            </button>

                            <button class="delete-btn">
                                Delete
                            </button>

                        </div>

                    </div>

                </article>`


});

let delete_btn = document.querySelectorAll(".delete-btn");
let edit_btn = document.querySelectorAll(".edit-btn");

console.log(edit_btn,delete_btn);

edit_btn.forEach((btn,index) =>{
    btn.addEventListener("click",async()=>{
        console.log("okkk!")
         let UsersServices =Services[index];
      console.log(UsersServices);


  //sweets alerts :-
  const { value: formValues } = await Swal.fire({
  title: "Multiple inputs",
  html: `
    <input id="swal-input1" class="swal2-input"  value="${UsersServices.category}">
    <input id="swal-input2" class="swal2-input"  value="${UsersServices.description}">
    <input id="swal-input3" class="swal2-input"  value="${UsersServices.StartingPrice}">


  `,
  focusConfirm: false,
  preConfirm: () => {
    return [document.getElementById("swal-input1").value,
       document.getElementById("swal-input2").value,
       document.getElementById("swal-input3").value];
  }
})

console.log(formValues);


//UpdateAgain
const { error:UpdateError } = await client
  .from('Receipe')
  .update({
    "category": formValues[0],
    "description": formValues[1],
    "StartingPrice": formValues[2]
  })
  .eq('id', UsersServices.id);

console.log(UpdateError);
if(!UpdateError){
    await getServices();
}


})
})


delete_btn.forEach((btn,index) =>{
    btn.addEventListener("click",async(e)=>{
        console.log("dlete")
         e.preventDefault();
 let UsersServices =Services[index];
  // Deleted
  const { error:deleteError } = await client
  .from('Receipe')
  .delete()
  .eq('id', UsersServices.id);

  if(!deleteError){
    // btn.closest(".my-service-card").remove();
    await getServices();
  }
    })
})

}
getServices();
})

cancel_button.addEventListener("click",()=>{
    console.log("okkk!");

    //GET:-
     //input
    let Input = document.querySelectorAll("input");
console.log(Input);
let textarea = document.querySelector("textarea");
console.log(textarea);
let Select = document.querySelectorAll("select");
console.log(Select);


Input[0].value ="";
Input[1].value = "";
Input[2].value="";
textarea.value="";
Select[0].value="";
Select[1].value="";


})