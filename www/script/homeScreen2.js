$(function () {

    //here load function
    $("#btnHome").click(function () { // button click event
        window.location.href = "loginScreen2.html";

    });

    viewAllUpdates("1");
});
function goToUpdates(){
    window.location.href = "updates.html";

}
function goToUpdateDetails() {
    window.location.href = "updateDetails.html";
  }

  viewAllUpdates = function (OperationType) {
    //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_AllUpdates",
        data: JSON.stringify({ OperationType: OperationType}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response, xhr, textStatus) {
            var obj = JSON.parse(response.d);
           console.log(response.d);
           console.log(obj);
            if (obj.length > 0) {
             
                FillControl(response);
               // fillDriverImage(response);
                $("body").mLoading('hide');
                // $.alert('Details saved successfully');
            } else {
                $("body").mLoading('hide');
          
         
            }
  
        },
        error: function (xhr, textStatus, errorThrown) {
            $("body").mLoading('hide');
            alert('Server not responding...');
        }
    });
  }

  

FillControl = function (response) {
  var obj = JSON.parse(response.d);
  
  var count = 0;
  var row = "";
  if (obj.length > 0) {
      $.each(obj, function (i, d) {
        var newUrl= [];
       
          var _id = '"' + d.Id + '"';

          row += "<div class='box-wrapper' onclick='goToUpdateDetails(" + _id + ")'>";
          row += "<div class='image-wrapper common-grid'><img class='image' src=" + d.Imgfilename + ">";
          row += "</div>";
          row += "<div class='content-wrap common-grid'><p style='font-size: 14px;'>" + d.Header + "</p>";
          row += "<div class='open-arrow-icon'><button class='btn-arrow' onclick='goToUpdateDetails(" + _id + ")'><i class='right_arr zmdi zmdi-chevron-right' id='right-arrow' ></i></button>";
          row += "</div>"
          row += "<p>" + d.FromDate  + " " + d.broadcast_Type + "</p>";     
          row += "</div>";
          row += "</div>";

//           <div class="box-wrapper" onclick="goToUpdateDetails();">
//   <div class="image-wrapper common-grid">
//     <img class="image" src="img/News_img1_100x100.jpg">
//   </div>
//   <div class="content-wrap common-grid">
//       <p>BIAL opens BLR Airport Campus to Cyclists</p>
//       <div class="open-arrow-icon">
//         <a class="btn-arrow" >
//           <i class="right_arr zmdi zmdi-chevron-right" id="right-arrow" ></i>
//         </a>
//       </div>
//           <p>24 June 2020  10:54  News</p>
                
//   </div>
// </div>
      count++;
  });
      $("#divUpdatesRow").append(row);
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
      $("#divUpdatesRow").html('There are no active updates available').css('color', '#f7347a');
  }
}

goToUpdateDetails = function(id) {
  localStorage.setItem('updatesID', id);
  window.location.href = 'updateDetails.html';
}
  