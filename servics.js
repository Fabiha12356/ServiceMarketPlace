const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let section = document.querySelector("#section");






let allUsers = async () => {
    const { data, error } = await client
        .from('Users-data')
        .select("")
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }


    data.forEach((data) => {
        console.log(data.id);
        console.log(data.name);

        let alpha = data.name
        section.innerHTML += `<div class="user-card">

                <div class="profile-area">

                    <div class="profile-pic">
                        ${alpha[0]}
                    </div>

                    <div class="user-info">
                        <h2>${data.name}</h2>
                        <p>${data.email}</p>
                    </div>

                </div>


               


                <p class="description">
                    We provide professional and reliable services 💗.
                </p>


                <button class="view-btn" data-user-id="${data.user_id}">
                    View Services
                    <span>→</span>
                </button>

            </div>
    `

    });
let buttOn = document.querySelectorAll(".view-btn");
console.log(buttOn);


buttOn.forEach((btn) => {
    

    btn.addEventListener("click",async() =>{
        console.log("clicking!");
        
      let userId = btn.dataset.userId;
      console.log("CLICKED USER ID:", userId);

             const { data: Services, error:Error } = await client
    .from("Receipe")
    .select()
     .eq("users-id", userId);
console.log("SERVUCES:", Services);
console.log("ERROR:", Error);
    })
})

}
allUsers();