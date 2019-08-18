
//Updating objects immut
export  const updateObject = (old,updated) => {
   return {
    ...old,
    ...updated  
   };
};


// Checkin rules of given input (Valid/Invalid)
export const checkValid = (rules, value) => {
   let valid = true
   if (rules.required) {
      valid = (value.trim() !== '') && valid
   };

   if (rules.minLength) {
      valid = (rules.minLength <=  value.length) && valid
   };
   if (rules.maxLength) {
      valid = (rules.maxLength >= value.length) && valid
   }
  return valid 
};