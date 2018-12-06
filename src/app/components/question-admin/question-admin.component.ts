import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.css']
})
export class QuestionAdminComponent implements OnInit {

  constructor() { }
  // private show = true;
  private parent;
  ngOnInit() {
    
    $("#dash").click(function(){
      $(location).attr('href',"admin-dashboard");
    })


    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var questionArray = [];
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: {
          'Authorization': token,
        },
        error: function (response) {
          return false;
        },
        success: function (response) {
          $("#show").hide();
          var questionId = [];
          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i + 1, response.data[i].message]);
            questionId.push(response.data[i])
          }
          // this.show = true;
          var questionArray1 = $('#userList').DataTable({
            data: questionArray,
            scroller: true,
            scrollY: 359,
            scrollX: false,
            "columnDefs": [{
              "targets": -1,
              "defaultContent":
                '<div class="btn-group">' +
                '<button class="newBtn btn btn-dark btn-sm" type="button">Approve</button>' + '<div>' + '</div>'
                + '<button class="Mybtn btn btn-dark btn-sm"  type="button"  style = "margin-left: 10px;">Disapprove</button>'
                + '</div>'
            }]
          });
          $('#userList').on('click', '.newBtn', function () {
            var RowIndex = $(this).closest('tr');
            var data = questionArray1.row(RowIndex).data();
            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                this.parent = questionId[i].id;
              }
            }
            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/' + this.parent,
              dataType: "json",
              isApproved: true,
              headers: {
                'Authorization': token,
              },
              error: function (response) {
                console.log('error');
                return false;
              },
              success: function (response) {
                $(this).addClass('row_selected');
                alert('Approved');
                location.reload(true)
              }
            });
          });
          var parentNew;
          $('#userList').on('click', '.Mybtn', function (e) {
            var RowIndex = $(this).closest('tr');
            var data = questionArray1.row(RowIndex).data();
            for (var i = 0; i < questionId.length; i++) {
              if (data[1] == questionId[i].message) {
                this.parentNew = questionId[i].id;
              }
            }
            console.log('questionid...', this.parentNew);
            $.ajax({
              type: 'POST',
              url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/' + this.parentNew,
              dataType: "json",
              headers: {
                'Authorization': token,
              },
              error: function (response) {
                return false;
              },
              success: function (response) {
                alert('Rejected')
                location.reload(true)
              }
            });
          });
          return false;
        },
      });
    });
  }
}


