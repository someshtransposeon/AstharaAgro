//retrieve all items
export function all_vendor_addresses(host,vendorId) {
    return fetch(`http://${host}:5000/retrieve_vendor_address_by_vendorId/${vendorId}`, {
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))
    .then(address => {
        return address;
    });
}