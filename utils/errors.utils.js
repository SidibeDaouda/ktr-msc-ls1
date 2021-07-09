module.exports.signUpErrors = (err) => {
  let errors = { name: "", companyName: "", email: "", tel:"", password: "" };

  if (err.message.includes("name"))
    errors.name = "Le nom doit faire entre 3 et 15 caractères maximum";

  if (err.message.includes("companyName"))
    errors.companyName = "Le nom de l'entreprise doit faire 15 caractères maximum";

  if (err.message.includes("tel"))
    errors.tel = "Le numero de tel doit faire entre 10 et 13 caractères maximum";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  // if(password !== confirmPassword)
  //   errors.confirmPassword = "Les mots de passe ne correspondent pas";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("name"))
    errors.name = "Ce nom est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
    errors.email = "Email inconnu";
  
  if (err.message.includes('password'))
    errors.password = "Le mot de passe ne correspond pas"

  return errors;
}


module.exports.businessCardErrors = (err) => {
  let errors = { name: "", companyName: "", email: "", tel: "", password: "" };

  if (err.message.includes("name"))
    errors.name = "Le nom doit faire entre 3 et 15 caractères maximum";

  if (err.message.includes("companyName"))
    errors.companyName =
      "Le nom de l'entreprise doit faire 15 caractères maximum";

  if (err.message.includes("tel"))
    errors.tel =
      "Le numero de tel doit faire entre 10 et 13 caractères maximum";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  return errors;
}