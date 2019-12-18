$(document).ready(function(){
    //Login Page
    $("#loginForm").on("submit", function(e){
        e.preventDefault();
        //alert("Click Me");
        let email = $("input[name='email']").val();
        let password = $("input[name='password']").val();
        //validation
        let validation = true;
        $("#loginForm input").each(function() {
            //console.log(this);
            if(this.type == '' || this.type == 'email' || this.type == 'password'){
                $(`.${this.name}.text-danger`).remove();
                if(this.value == '') {
                    $(`input[name='${this.name}']`).after(`<span class='${this.name} text-danger'>${this.placeholder} is required</span>`);
                } 
                else {
                    $(`.${this.name}.text-danger`).remove();
                }
            }
        });
        //Call the Node.js API
        //console.log("baseUrl", baseUrl);
        if(validation == true){
            $.ajax({
                url: baseUrl+'/api/users/getUsers',
                type: "get",
                data: { 'email': email, 'password': password },
                success: function(data){
                    console.log(data);
                }, 
                error: function(error){
                    console.log(error);
                }
            });
        }
    });
});