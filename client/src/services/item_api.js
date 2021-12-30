//retrive all items
export function allitem(host){
    return fetch(`http://${host}:5000/retrive_all_item`, {
            method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(allItems =>{
        return allItems;
    });
}
//retrive all disabled items
export function all_disabled_item(host){
    return fetch(`http://${host}:5000/retrive_all_disabled_items`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(allItems =>{
            return allItems;
    });
}
//retrive all item grade
export function item_grade(host){
    return fetch(`http://${host}:5000/retrive_all_item_grade`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(itemGrade => {
            return itemGrade;
    });
}
//retrive all item grade by id
export function item_grade_by_grade_id(host,itemGradeId){
    return fetch(`http://${host}:5000/retrive_item_grade/${itemGradeId}`, {
            method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(item => {
        return item;
    });
}
//retrive all item Categories
export function item_category(host){
    return fetch(`http://${host}:5000/retrive_all_item_category`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(itemCategory =>{
        return itemCategory;
    });
}
//retrive all items category by id
export function item_category_by_id(host,itemCategoryId){
    return fetch(`http://${host}:5000/retrive_item_category/${itemCategoryId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(item => {
        return item;
    });
}
//retrive all disabled item categories
export function all_disabled_item_category(host){
    return fetch(`http://${host}:5000/retrive_all_disabled_item_category`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(categories => {
            return categories;
    });
}
//retrive all item units
export function item_unit(host){
    return fetch(`http://${host}:5000/retrive_all_item_unit`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(itemUnit =>{
            return itemUnit;
    });
}
//retrive all item disabled units
export function item_unit_diasabled(host){
    return fetch(`http://${host}:5000/retrive_all_disabled_item_unit`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(unit =>{
            return unit;
    });
}
//retrive all item units by id
export function item_unit_by_unitid(host,itemUnitId){
    return fetch(`http://${host}:5000/retrive_item_unit/${itemUnitId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(item => {
        return item;
    });
}
