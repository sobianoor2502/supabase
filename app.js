
// SUPABASE CONNECTION

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
    document.querySelector("#studentRegistration");



// FORM SUBMIT


form.addEventListener("submit", async function (event) {

    // Stop page refresh

    event.preventDefault();


    
    // GET FORM DATA


    const formData =
        new FormData(form);


    // Convert form data into object

    const data =
        Object.fromEntries(formData);


    console.log(data);


    
    // GET VALUES


    const firstname =
        data.firstname;

    const lastname =
        data.lastname;

    const address =
        data.address;

    const gender =
        data.gender;

    const course =
        data.course;

    const email =
        data.email;

    const password =
        data.password;


    
    // CHECK EMPTY FIELDS


    if (
        firstname === "" ||
        lastname === "" ||
        address === "" ||
        gender === undefined ||
        course === "" ||
        email === "" ||
        password === ""
    ) {

        Swal.fire({
            title: "Incomplete Form",
            text: "Please fill all the fields.",
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


    // CHECK SIGN UP ERROR
    

    if (result.error) {

        Swal.fire({
            title: "Registration Failed",
            text: result.error.message,
            icon: "error"
        });

        return;
    }


    
    // GET USER ID


    const userId =
        result.data.user?.id;


    console.log("User ID:", userId);


    
    // INSERT STUDENT DATA
    

    const databaseResult =
        await client
            .from("students_data")
            .insert({

                firstName: firstname,

                lastName: lastname,

                address: address,

                gender: gender,

                course: course,

                user_id: userId

            });


    console.log(databaseResult);


    
    // CHECK DATABASE ERROR
    

    if (databaseResult.error) {

        Swal.fire({
            title: "Database Error",
            text: databaseResult.error.message,
            icon: "error"
        });

        return;
    }


    
    // SUCCESS
    

    Swal.fire({
        title: "Success!",
        text: "Student registered successfully.",
        icon: "success"
    });


    // Clear form

    form.reset();

});


