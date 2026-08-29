// Supabase URL

const supabaseUrl =
    "https://oibwlgsbbjlaavbflglb.supabase.co";


// Supabase Key

const supabaseKey =
    "sb_publishable_rrGD9f3mmVMgFhFX1NuSqg_qMEqFjZk";


// Create Supabase client

const { createClient } = supabase;

const client = createClient(
    supabaseUrl,
    supabaseKey
);



// GET FORM

const form =
    document.querySelector("#signInForm");


// SIGN IN


form.addEventListener("submit", async function (event) {

    // Stop page refresh

    event.preventDefault();


    // Get email

    const email =
        document.querySelector("#email").value;


    // Get password

    const password =
        document.querySelector("#password").value;


    
    // CHECK EMPTY FIELDS
    

    if (email === "" || password === "") {

        Swal.fire({
            title: "Error!",
            text: "Please enter email and password.",
            icon: "warning"
        });

        return;
    }



    // SIGN IN USER
    

    const result =
        await client.auth.signInWithPassword({

            email: email,

            password: password

        });


    console.log(result);


    
    // CHECK ERROR
    

    if (result.error) {

        Swal.fire({
            title: "Login Failed",
            text: result.error.message,
            icon: "error"
        });

        return;
    }


    
    // SUCCESS


    Swal.fire({
        title: "Welcome!",
        text: "You have logged in successfully.",
        icon: "success"
    });


    // Go to registration page

    setTimeout(function () {

        window.location.href =
            "index.html";

    }, 1500);

});
