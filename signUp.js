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
    document.querySelector("#signupForm");



// SIGN UP

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


    // CREATE ACCOUNT

    const result =
        await client.auth.signUp({

            email: email,

            password: password

        });


    console.log(result);


    
    // CHECK ERROR
    

    if (result.error) {

        Swal.fire({
            title: "Sign Up Failed",
            text: result.error.message,
            icon: "error"
        });

        return;
    }


    
    // SUCCESS
    

    Swal.fire({
        title: "Success!",
        text: "Your account has been created.",
        icon: "success"
    });


    // Clear form

    form.reset();


    // Go to Sign In page

    setTimeout(function () {

        window.location.href =
            "signIn.html";

    }, 1500);

});
