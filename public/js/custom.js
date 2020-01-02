$(document).ready(function () {
    //Logout 
    $("#logout").on("click", function (e) {
        e.preventDefault();
        //alert("Logout Click"); return false;
        let token = localStorage.getItem("token"); //Get the token value from local storeage
        if (token == null) {
            location.href = baseUrl;
        }
        else {
            $.ajax({
                url: baseUrl + '/api/users/logout',
                type: "POST",
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function (data) {
                    console.log(data);
                    if(data.status == 1){
                        localStorage.removeItem("token");   //Remove the token from local storage
                        location.href = baseUrl;    //Redirect to login page
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    });

    //Home Page
    let currentUrl = location.href;
    let token = localStorage.getItem("token"); //Get the token value from local storeage
    //console.log(token);
    console.log(currentUrl);
    if (currentUrl == baseUrl + '/home') {
        if (token == null) {
            location.href = baseUrl;
        }
        else {
            $.ajax({
                url: baseUrl + '/api/users/getUsers',
                type: "GET",
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function (data) {
                    console.log(data);
                    if (data == 'Unauthorized Request') {
                        location.href = baseUrl;
                    } else {
                        console.log({ "data": data.data });
                        $('#usersList').DataTable({
                            "data": data.data,
                            "columns": [
                                { "data": "_id" },
                                { "data": "name" },
                                { "data": "email" },
                                { "data": "create_date" },
                                { "data": "<buton>Detail</button>" },
                            ]  
                        });
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    }
});