// section switch
function showSection(id){
    document.querySelectorAll(".section").forEach(sec=>sec.style.display="none");
    document.getElementById(id).style.display="block";
}

// login system
const loginBtn=document.getElementById("login-btn");
const logoutBtn=document.getElementById("logout-btn");
const modal=document.getElementById("login-modal");
const closeBtn=document.querySelector(".close");
const submitBtn=document.getElementById("login-submit");
const userName=document.getElementById("user-name");
const serviceLink=document.getElementById("serviceLink");

// open modal
loginBtn.onclick=()=>modal.style.display="block";
closeBtn.onclick=()=>modal.style.display="none";

// login
submitBtn.onclick=()=>{
    let u=document.getElementById("username").value;
    let p=document.getElementById("password").value;

    fetch("users.json")
    .then(r=>r.json())
    .then(data=>{
        let f=data.find(x=>x.username==u && x.password==p);

        if(f){
            userName.textContent=u;
            localStorage.setItem("loggedUser",u);

            serviceLink.style.pointerEvents="auto";
            serviceLink.style.opacity="1";
            serviceLink.textContent="Services";

            loginBtn.style.display="none";
            logoutBtn.style.display="inline-block";
            modal.style.display="none";

            alert("Login successful");
        } else{
            alert("Invalid user");
        }
    });
};

// logout
logoutBtn.onclick=()=>{
    localStorage.removeItem("loggedUser");
    location.reload();
};

// auto restore login
if(localStorage.getItem("loggedUser")){
    userName.textContent=localStorage.getItem("loggedUser");
    serviceLink.style.pointerEvents="auto";
    serviceLink.style.opacity="1";
    serviceLink.textContent="Services";
    loginBtn.style.display="none";
    logoutBtn.style.display="inline-block";
}
