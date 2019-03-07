import React from 'react';

const cName='cpark',username='auser',pass='prominder';
export const loginValidation = (companyName,userName,password,server_IP) =>{
   // let {companyName,userName,password} = props;
    if(companyName.length===0 || userName.length===0 || password.length===0 || server_IP.length===0) {
        return false;
    } else
        return true;
};
