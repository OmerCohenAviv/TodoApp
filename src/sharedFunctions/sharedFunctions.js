
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

//changeValue of input
export const changeValueHandler = ( event, elType, that ) => {
   const valid = checkValid(that.state.cardData[elType].rules, event.target.value)
   const updateElement = updateObject(that.state.cardData[elType], {
       value: event.target.value,
       touched: true,
       valid: valid
   });
   const updateCardData = updateObject(that.state.cardData, {
       [elType]: updateElement
   })
   return updateCardData 
}
