function validateAndSanitizeLoginDetails(data){
    const errors ={}
    const sanitized = {}


    //sanitising email part
    sanitized.email = data.email.trim()
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!sanitized.email){
        errors.email='Email is required'
    } else if(!regexEmail.test(sanitized.email)){
        errors.email='Invalid Email format'
    } else if(sanitized.email.length>24){
      errors.email="Email length exceeded"
    }

    //sanitising password
    sanitized.password = data.password.trim();
     if(!sanitized.password){
        errors.password='Password is required'
     } else if (sanitized.password.length <8){
        errors.password='Password must be at least 8 characters'
     }


     
     return {
        isValid : Object.keys(errors).length===0,
        sanitizedData:sanitized,
        errors
     }

}

module.exports= validateAndSanitizeLoginDetails