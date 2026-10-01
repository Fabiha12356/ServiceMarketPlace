const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let span = document.querySelector("#headh1");
let strong = document.querySelector("#strong");
let logout_btn = document.querySelector(".logout-btn");
let serviceform = document.querySelector("#serviceform");
let imageInput= document.querySelector("#imageInput");
let imglabel = document.querySelector("#imglabel");
let card = document.querySelector("#card");
// console.log(card.innerHTML);
console.log(imglabel.innerHTML);
console.log(logout_btn);
console.log(serviceform);
console.log(imageInput)

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

let file;
let imageURL;
let avatarFile ;


imageInput.addEventListener("change",()=>{
    console.log(imageInput.files[0]);
     file = imageInput.files[0];
     imageURL = URL.createObjectURL(file);
    console.log(imageURL);

    imglabel.innerHTML = `<img src="${imageURL}" alt="pic">`

})


serviceform.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let userDta = new FormData(serviceform);
    let userInfo = Object.fromEntries(userDta);
    console.log(userInfo);


       //Image-Insert
 avatarFile = imageInput.files[0];
 console.log(avatarFile);
const { data, error:imageError } = await client
  .storage
  .from('images')
  .upload(avatarFile.name, avatarFile, {
    cacheControl: '3600',
    upsert: false
  })
if(data){
    console.log(data);
}else{
    console.log(imageError);
}

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
             "image_path" : data.path
   })
   if(error){
    console.log(error)
   }else{
    console.log("hugaya?")
   }

console.log(data.path);



//select:-
     const { data: Services, error:Error } = await client
    .from("Receipe")
    .select()
     .eq("users-id", user.id);
console.log("SERVUCES:", Services);
console.log("ERROR:", error);


Services.forEach((service) => {


//GET URL
const { data } = client
  .storage
  .from('images')
  .getPublicUrl(service.image_path);



    card.innerHTML +=`   <article class="my-service-card">

                    <div class="my-service-image">
                        WEB
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


})

