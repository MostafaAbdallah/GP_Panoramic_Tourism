/**
 * Created by Suhila ahmed on 2/3/2016.
 */

$(document).ready(function (){
    $('#formreg').validate({
        rules: {
            Fname: {
                required: true,
                minlength: 6
            },
            newpassword1: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                minlength: 6,
                equalTo: "#pass"
            },
            email: {
                required: true,
                email: true
            },
            mobile: {
                required: true,
                number: true,
                minlength: 11
            },
            Face: {
                required: true
            },
            flickr: {
                required: true
            },
            agree : "required",
            month: "required",
            day: "required",
            year: "required"
        },
        messages: {
            Fname:{
                required:  " Please enter your full name",
                minlength: " Your full name must consist of at least 6 characters"
            },
            mobile: {
                required: "Please provide a moblie number",
                number: "Please Enter a valid mobile number",
                minlength: "Your password must be  11 digits long"

            },
            'newpassword1': {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long"
            },
            'confirm_password': {
                required: "Please provide a confirm password",
                minlength: "Your password must be at least 6 characters long",
                equalTo: "Please enter the same password as above"
            },
            email: "Please enter a valid email address ",
            agree: "Please accept our Terms in order to continue",
            flickr: "Please provide your Flickr account ",
            Face: "Please provide your Facebook account ",
            month:"Please provide your month",
            day:"Please provide your day",
            year:"Please provide your year"
        }

    });

});

