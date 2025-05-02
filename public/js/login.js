// (function ($) {
//    "use strict";
//    /*==================================================================
//    [ Validate ]*/
//    var input = $('.validate-input .input100');

//    $('.validate-form').on('submit',function(){
//        var check = true;

//        for(var i=0; i<input.length; i++) {
//            if(validate(input[i]) == false){
//                showValidate(input[i]);
//                check=false;
//            }
//        }

//        return check;
//    });


//    $('.validate-form .input100').each(function(){
//        $(this).focus(function(){
//           hideValidate(this);
//        });
//    });

//    function validate (input) {
//        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                return false;
//            }
//        }
//        else {
//            if($(input).val().trim() == ''){
//                return false;
//            }
//        }
//    }

//    function showValidate(input) {
//        var thisAlert = $(input).parent();

//        $(thisAlert).addClass('alert-validate');
//    }

//    function hideValidate(input) {
//        var thisAlert = $(input).parent();

//        $(thisAlert).removeClass('alert-validate');
//    }
   
   

// })(jQuery);
function showErrorMessage(message) {
   const errorDiv = document.getElementById("error-message");
   errorDiv.textContent = message;
   errorDiv.style.display = "block";
}

function login() {
   document.getElementById("loginForm").addEventListener("submit", async function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      
      try {
         const res = await fetch("/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
         });
  
         const data = await res.json();
  
         if (res.ok) {
            sessionStorage.setItem("token", data.token);
            showErrorMessage("Login successfully!!");
            redirectBasedOnRole();
         } else {
            showErrorMessage(data.message || "Login failed!!");
         }
      } catch (error) {
         console.log(error);
         alert("Something went wrong!!");
      }
  });
}

function parseJwt(token) {
   const base64Payload = token.split('.')[1];
   const payload = atob(base64Payload);
   return JSON.parse(payload);
}

function redirectBasedOnRole() {
   const token = sessionStorage.getItem("token");
   if (token) {
      const decoded = parseJwt(token);
      const role = decoded.type;

      if (role === 0) {
         window.location.href = "/employee-0";
      }
      else if (role === 1) {
         window.location.href = "/employee-1";
      }
      else if (role === 2) {
         window.location.href = "/employee-2";
      }
      else if (role === 3) {
         window.location.href = "/employee-3";
      } else {
         alert("Can not determine role!");
      }
   }
}