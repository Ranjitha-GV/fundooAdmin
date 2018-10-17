import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('#btnLogin').click(function () {
        var email=$('#email').val();
        var password=$('#password').val()
        var at = email.indexOf("@");
        var dot = email.indexOf(".");
        var com = email.indexOf("com");
      if(email==""){
        $('#email').focus(); 
        $('#msg').text("Enter an email id");
        return false;
      }
      else if (password == "" ){
        $("#password").focus();
        $('#msgp').text("Enter a password");
        return false;
      }
      else if (at < 1 || (dot - at) < 2 || com < 1){
        $("#email").focus();
        $('#msg').text("Enter valid email id");
        return false;
  }
    
        var data = {
          "email": $("#email").val(),
          "password": $("#password").val()
        }
        console.log(data);
        $.ajax({
          url: 'http://34.213.106.173/api/user/adminLogin',
          type: 'POST',
          data: data,
          success: function (data) {
            console.log("success", data);
            localStorage.setItem("token",data.id);
            window.location.href = "/admin-dashboard";
          },
          error: function (error) {
            console.log(error);

            $("div#errMsg").html("Email or Password Invalid");
          }
        })
        return false;
      })
    })
  }
}
