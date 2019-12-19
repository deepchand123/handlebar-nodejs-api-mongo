$(document).ready(function () {
    //Login Page
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        let email = $("input[name='email']").val();
        let password = $("input[name='password']").val();
        //validation
        let error = [];
        $("#loginForm input").each(function () {
            //console.log(this);
            if (this.type == '' || this.type == 'email' || this.type == 'password') {
                let fieldName = this.name;
                let fieldPlaceholder = this.placeholder;
                let fieldValue = this.value;
                $(`.${fieldName}.text-danger`).remove();
                if (this.value == '') {
                    let errorInfo = {};
                    let message = fieldPlaceholder + ' is required';
                    errorInfo[`${this.name}`] = { error: true, msg: message, value: fieldValue };
                    error.push(errorInfo);
                    $(`input[name='${fieldName}']`).after(`<span class='${fieldName} text-danger'>${message}</span>`);
                }
                else {
                    $(`.${fieldName}.text-danger`).remove();
                }
            }
        });
        //console.log(error);
        //Call the Node.js API
        if (error.length == 0) {
            $.ajax({
                //url: baseUrl+'/api/users/getUsers', type: "GET",
                url: baseUrl + '/api/users/login',
                type: "POST",
                data: {
                    'email': email,     //deep@gmail.com
                    'password': password    //123456
                },
                success: function (data) {
                    console.log(data);
                    let status = data.status;
                    let msg = data.msg;
                    if (status == 403) {
                        let field = data.field;
                        $(`.${field}.text-danger`).remove();
                        $(`input[name='${field}']`).after(`<span class='${field} text-danger'>${msg}</span>`);
                    }
                    else if (status == 1) {
                        alert(msg);
                        localStorage.setItem('token', data.data.token);
                        location.href = baseUrl + '/home';    //redirect to home page
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
    console.log(token);
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
                        console.log(data);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    }
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
});