const supabaseUrl = "https://wmflitippmldqpfvxixt.supabase.co";
const supabaseKey = "sb_publishable_0VvRE72u8ZALMxvFXcuC5w_vAFO97BS";


const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);


// GET:-
let section = document.querySelector("#section");


//Varibales:-
 let alpha;

//FuctiOn:-
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

        alpha = data.name
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

  if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Unable to load services.",
                background: "#120d17",
                color: "white"
            });

            return;
        }
           if (!Services || Services.length === 0) {

            Swal.fire({
                icon: "info",
                title: "No Services",
                text: "This provider has not added any services yet.",
                background: "#120d17",
                color: "white",
                confirmButtonColor: "#a844ff"
            });

            return;
        }
           let servicesHTML = "";
           Services.forEach((service) => {
              servicesHTML += `

                <div class="popup-service-card">


                    <div class="popup-service-content">

                        <span class="popup-category">
                            ${service.category}
                        </span>

                        <h3>
                            ${service.recipename}
                        </h3>

                        <p>
                            ${service.description}
                        </p>

                        <div class="popup-service-bottom">

                            <strong>
                                Starting at $${service.StartingPrice}
                            </strong>

                            <span>
                                ${service["Delivery Time"]}
                            </span>

                        </div>

                    </div>

                </div>

            `;
        });
   Swal.fire({

            title: "Services",

            html: `
            
                <div class="services-popup">

                    <div class="popup-heading">
                        <p>AVAILABLE SERVICES</p>

                        <h2>
                           ${alpha}
                        </h2>
                    </div>

                    <div class="popup-services-grid">

                        ${servicesHTML}

                    </div>

                </div>

            `,

            width: "900px",

            background: "#0d0912",

            color: "white",

            showConfirmButton: true,

            confirmButtonText: "Close",

            confirmButtonColor: "#a844ff",

            customClass: {
                popup: "services-swal-popup"
            }

        });
            })
})
}
allUsers();