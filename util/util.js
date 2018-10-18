export function removeItem(id,list){
    for(let i = 0; i < list.length; i++){
      if (list[i].id == id){
        list.splice(i,1);
        array = list;
        return array;
      }
    }
    return list;
  }
