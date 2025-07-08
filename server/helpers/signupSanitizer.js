function validateAndSanitize(data){
    const errors ={}
    const sanitized = {}

    // sanitising naming part

    sanitized.name = data.name?.trim()
    if(!sanitized.name){
        errors.name='Name is required'
    } else if(! /^[A-Za-z\s]+$/.test(sanitized.name)){
        errors.name='Name should contain only letters and spaces'
    } else if(sanitized.name.length<3){
      errors.name='Name should have min length of 3 letters'
    } else if (sanitized.name.length>20){
      errors.name='Name should not exceed 20 Characters'
    }

    //sanitising email part
    sanitized.email = data.email?.trim()
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!sanitized.email){
        errors.email='Email is required'
    } else if(!regexEmail.test(sanitized.email)){
        errors.email='Invalid Email format'
    } else if(sanitized.email.length>24){
      errors.email="Email length exceeded"
    }

    //sanitising password
    sanitized.password = data.password?.trim();
     if(!sanitized.password){
        errors.password='Password is required'
     } else if (sanitized.password.length <8){
        errors.password='Password must be at least 8 characters'
     }

     sanitized.confirmPassword=data.confirmPassword?.trim()
     if(sanitized.confirmPassword !== sanitized.password){
        errors.confirmPassword='Passwords do not match'
     }

     //snitising phone(optional)

     sanitized.phone = data.phone?.trim() || ''
     if(sanitized.phone && !/^\d{10}$/.test(sanitized.phone)){
        errors.phone ='Phone must be 10 digits'
     }

     return {
        isValid : Object.keys(errors).length===0,
        sanitizedData:sanitized,
        errors
     }

}

module.exports= {validateAndSanitize}