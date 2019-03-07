export function convertToArray(realmObjectsArray)
{
    let copyOfJsonArray = Array.from(realmObjectsArray);
    let jsonArray = JSON.parse(JSON.stringify(copyOfJsonArray));
    return jsonArray;
}


export const getKeyByValue = (recordItemObject,value) => {
    return Object.keys(recordItemObject).filter(key => recordItemObject[key] === value);
};

export const convertStringIntoArray = (str,separator) =>{
        let array = str.split(`${separator}`);
        return array;
};