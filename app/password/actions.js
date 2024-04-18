"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers"


export async function changePassword(passwd, confirmPwd){
  const errorsList = {};

  if(!passwd){
    errorsList.name = "La contraseña es obligatoria";
  } else if (passwd.length < 6){
    errorsList.passwd = "La contraseña debe tener al menos 6 caracteres"
  }

  if(!confirmPwd){
    errorsList.confirmPwd = "Confirmar contraseña es obligatorio";
  } else if(passwd && passwd != confirmPwd){
    errorsList.confirmPwd = "Las contraseñas no coinciden"
  }

  if (Object.keys(errorsList).length > 0){
    return{
      success:false,
      message: "Ingresar los datos correctamente",
      errors: errorsList,
    };
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.updateUser({ password: passwd });

  if(error){
    return{
      success: false,
      message: `No se pudo actualizar la contraseña ${error.message}`,
      errors: [],
    };
  }

  return{
    success: true,
    message: "Se actaulizo la contraseña",
    errors: [],
  }
}