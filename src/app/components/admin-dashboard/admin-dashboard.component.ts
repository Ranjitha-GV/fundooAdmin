import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      $(function () {
        $.ajax({
          url: 'http://34.213.106.173/api/user/getAdminUserList',
          type: 'GET',
          success: function (result) {
            console.log("success", result);
            var list = [];
            for(var i =0;i<result.data.data.length;i++)
            {
              list.push([i+1,result.data.data[i].firstName,result.data.data[i].lastName,result.data.data[i].email,result.data.data[i].service])
            }
            $('#table1').DataTable({
              data : list
            })
          },
          error: function (error) {
            console.log(error);
          }
        })
        return false;
      })
    })
    var token = localStorage.getItem('token');
    $(document).ready(function () {
      $(function () {
        $.ajax({
          url: 'http://34.213.106.173/api/user/UserStatics',
          type: 'GET',
          headers:
          {
            'Authorization':token
          },
          success: function (result) {
            console.log("success", result);
            var user = result.data.details;
            var html = '';
            for(var index =0;index<user.length;index++)
            {
            html+="<div class='card'>";
            html+="<div class='card text-black bg-primary mb-3'>"+user[index].service+"</div>";
            html+="<div class='card-body'>"+user[index].count+"</div>";
            html+="</div";
            $("#services").html(html);
            }
            
          },
          error: function (error) {
            console.log(error);
          }
        })
        return false;
      })
    })
  }

}
