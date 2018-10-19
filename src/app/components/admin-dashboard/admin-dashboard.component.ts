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
            for (var i = 0; i < result.data.data.length; i++) {
              list.push([i+1, result.data.data[i].firstName, result.data.data[i].lastName, result.data.data[i].email, result.data.data[i].service])
            }
            var content = $('#table1').DataTable({
              data: list,
              deferRender: true,
              scrollY: 200,
              scrollCollapse: true,
              scroller: true
            });
            $('#table1 tbody').on('click', 'tr', function () {
              var search = content.row(this).index();
              console.log(search);
              console.log(result.data.data[search].firstName);
              $("#firstName").text(result.data.data[search].firstName);
              $("#lastName").text(result.data.data[search].lastName);
              $("#email").text(result.data.data[search].email);
              $("#role").text(result.data.data[search].role);
              $("#service").text(result.data.data[search].service);
              $("#createdDate").text(result.data.data[search].createdDate);
              $("#modifiedDate").text(result.data.data[search].modifiedData);

              $("#modalPop").click();
          } );
            // this.index = -1
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
            'Authorization': token
          },
          success: function (result) {
            console.log("success", result);
            var user = result.data.details;
            var html = '';
            for (var index = 0; index < user.length; index++) {
              html += "<div class='col-mr-4 col-md-6 col-sm-6 col-xs-6 col-lg-6 '><div class='card'>";
              html += "<div class='card upper text-white bg-dark mb-3 '>" + user[index].service + "</div>";
              html += "<div class='card-body'>" + user[index].count + "</div>";
              html += "</div></div>";
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
    $(document).ready(function () {
      $('#logout').on('click', function () {
        $.ajax({
          url: 'http://34.213.106.173/api/user/logout',
          type: 'POST',
          headers: {
            'Authorization': token
          },
          success: function () {
            localStorage.removeItem('token');
            window.location.href = 'admin-login';
            console.log("Logout success");
          },
          error: function (error) {
            console.log(error);
          }
        })
      })
    })
  }
}
