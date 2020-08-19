$(document).ready(function () {
  $("#daftar").click(function () {
    var nama_bidang = $("#title").val();

    $.ajax({
      url: "https://ptkai-loc.teknopertiwi.com/admin/data_bidang/tambah_data",
      method: "POST", //First change type to method here

      data: {
        nama_bidang: "aaa", // Second add quotes on the value.
      },
      success: function (response) {
        alert("Sukses");
        window.location = "";
      },
      error: function () {
        alert("error");
      },
    });
  });
});

$(document).ready(function () {
  $("#daftar").click(function () {
    var nama_bidang = $("#title").val();

    $.ajax({
      url: "https://ptkai-loc.teknopertiwi.com/admin/data_user/tambah_data",
      method: "POST", //First change type to method here

      data: {
        nama_bidang: "aaa", // Second add quotes on the value.
      },
      success: function (response) {
        alert("Sukses");
        window.location = "";
      },
      error: function () {
        alert("error");
      },
    });
  });
});
