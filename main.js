const path = "https://jsonplaceholder.typicode.com/users"

sendRequest(path)

async function sendRequest(path){
    requestObj = {
        "applicant": "Ryan Mills",
        "users": []
    }

    await getData(path, requestObj);

    fetch("https://scheduler.luminarycxm.com/api/v1/cleaned/data/test/", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObj),
      })
      .then(response => response.json())
      .then(data => console.log(data));
}


async function getData(path, requestObj){
    const data = await fetch(path).then(response => response.json());
    
    for(let i = 0; data[i]; i++){
        let name = (data[i].name).split(" ");
        userObj =  {
            "first_name": name[0],
            "last_name": name[1],
            "company_name": data[i].company.name,
            "company_full_address": 
                data[i].address.street + " " +
                data[i].address.suite + ", " +
                data[i].address.city + ", " +
                "Idaho, " +
                data[i].address.zipcode, 
            "website": data[i].website,
            "phone": data[i].phone 
        }
        requestObj.users.push(userObj);
    }

    
}
