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


                <button class="view-btn">
                    View Services
                    <span>→</span>
                </button>

            </div>

    `
    });
}
allUsers();