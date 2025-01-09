var id = localStorage.getItem('updatesID');
var path;
$(function () {

  viewUpdatesdetails('1',id);
});
    
 
  function goBack() {
    window.location.href = "updates.html";
  }

  viewUpdatesdetails = function (OperationType, id) {
    //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
    $.ajax({
        type: 'POST',
        url: ACSServiceURL + "/ACS_Get_Updates",
        data: JSON.stringify({ OperationType: OperationType, Id : id}),
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
        path = '' + d.PdfFilePath + '';

        var pdfPath = '"' + d.PdfFilePath + '"';

          row += "<div class= 'div-wrapper'>"
          row += "<div class='content-wrap common-grid'><p style='font-weight: bold;'>" + d.DisplayText + "</p><p>" + d.FromDate + " " + d.broadcastType + "</p>";
          row += "</div>";
          row += "<div class='text_wrap'>";
          row += "<div>";
          row += "<img class='image' src=" + d.Imgfilename + ">";
          row += "</div>";
          row += "<p class='detail'>" + d.Deatails + "</p>";
          row += "<div>";
          row += "<p style='font-weight: bold;'>Downloads</p>";
          if(d.PdfFilePath == ""){
            row += "<div><h6>No document to download</h6>";  
          }else{
            var pdfFile = pdfPath.replace(/^.*[\\\/]/, '');
            var pdfFileName = pdfFile.slice(0, -1); 
          row += "<div><button class='dwnicon'><i class='zmdi zmdi-download' id='file' onclick='downloadFile()'></i></button><h6 class='filename'>" + pdfFileName + "</h6>";
         }          
           
          row += "</div>";
          row += "</div>";
          row += "</div>";
      count++;
  });
      $("#displayDetails").append(row);
      $("body").mLoading('hide');
  } else {
      $("body").mLoading('hide');
      $("#displayDetails").html('There are no active updates available').css('color', '#f7347a');
  }
}

function downloadFile(){
  window.open(path)
 }
// viewUpdatesSlidedetails = function (OperationType) {
//   //console.log(OperationType + ',' + AirlinePrefix + ',' + AwbNumber + ',' + HawbNumber + ',' + CreatedByUserId + ',' + OrganizationBranchId + ',' + OrganizationId);
//   $.ajax({
//       type: 'POST',
//       url: ACSServiceURL + "/ACS_Get_Updates",
//       data: JSON.stringify({ OperationType: OperationType, Id : 0}),
//       contentType: "application/json; charset=utf-8",
//       dataType: "json",
//       success: function (response, xhr, textStatus) {
//           var obj = JSON.parse(response.d);
//          console.log(response.d);
//          console.log(obj);
//           if (obj.length > 0) {
           
//               FillControl(response);
//              // fillDriverImage(response);
//               $("body").mLoading('hide');
//               // $.alert('Details saved successfully');
//           } else {
//               $("body").mLoading('hide');
        
//               errmsg = "Error!!!!</br>";
//               errmsgcont = "No Updates Found!</br>";
//               $.alert(errmsg,errmsgcont);
//               return;
//           }

//       },
//       error: function (xhr, textStatus, errorThrown) {
//           $("body").mLoading('hide');
//           alert('Server not responding...');
//       }
//   });
// }


// FillControl = function (response) {
// var obj = JSON.parse(response.d);

// var count = 0;
// var row = "";
// if (obj.length > 0) {
//     $.each(obj, function (i, d) {


//       row += "<div class= 'div-wrapper'>";
//       row += "<div class='content-wrap common-grid'>";
//       row += "<p style='font-weight: bold;'>" + d.DisplayText + "</p>";
//       row += "<p>" + d.FromDate + " " + d.broadcastType + "</p>";
                  
//       row += "</div>";
//       row += "<div class='text_wrap'>";
//       row += "<div>";
//       row += "<img class='image' src=" + d.Imgfilename + ">";
//       row += "</div>";
//       row += "<p class='detail'> " + d.Deatails + "</p>";
//       row += "<div>";
//       row += "<p style='font-weight: bold;'>Downloads</p>";
//       row += "<div>";
//       row += "<a><i class='zmdi zmdi-download' id='file'></i><h6 class='filename'>FileName1.pdf</h6></a>";
    
//       row += "</div>";
//       row += " </div>";
//       row += "</div>";
//       row += "</div>";

//         // row += "<a class='carousel-control-prev' href='#carouselExampleControls' role='button' data-slide='prev'><span class='carousel-control-prev-icon' aria-hidden='true'></span></a>";
//         // row += "<a class='carousel-control-next' href='#carouselExampleControls' role='button' data-slide='next'><span class='carousel-control-next-icon' aria-hidden='true'></span></a>";

//     count++;
// });
//     $("#displaySlideDetails").append(row);
//     $("body").mLoading('hide');
// } else {
//     $("body").mLoading('hide');
//     $("#displaySlideDetails").html('There are no active updates available').css('color', '#f7347a');
// }
// }
