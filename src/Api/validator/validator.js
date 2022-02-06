export function validateFields(values) { 
    let errors = {};  
    
    if (!values.email.trim()) { 
      errors.email = 'Email is required';
    }
    
    if (!values.username.trim()) { 
      errors.username = 'Username is required';
    }
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    } 
   
    if (!values.address.city.trim()) {
      errors.city = 'City is required';
    } 
  
    return errors;
} 