$("#but_submit").click(function () {
  var username = $("#txt_uname").val();
  var password = $("#txt_pwd").val();
  if (username != "" && password != "") {
    $.ajax({
      url: "https://ptkai-loc.teknopertiwi.com/auth/login",
      type: "POST",
      data: {
        username: username,
        password: password,
      },
      dataType: "json",
      success: function (response) {
        var msg = "";
        if (response.status_code == 200) {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("password", password);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("id_user", response.data.id_user);
          sessionStorage.setItem("akses_name", response.data.akses_name);
          window.location = "dashboard.html";
        } else {
          msg = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert" style="width: 29em;">
                          <strong>Maaf </strong>Password dan username anda salah !.
                          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        `;
        }
        $("#message").html(msg);
      },
    });
  }
});

function deleteItems() {
  sessionStorage.clear();
  window.location = "index.html";
}

$("#daftar").click(function () {
  var nama_bidang = $("#title").val();
  $.ajax({
    url: "https://ptkai-loc.teknopertiwi.com/admin/data_bidang/tambah_data",
    method: "POST", //First change type to method here

    data: {
      nama_bidang: nama_bidang, // Second add quotes on the value.
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

$("#daftarUser").click(function () {
  var bidang_id = $("#selectBidang").val();
  var username = $("#username").val();
  var nama_lengkap = $("#nama_lengkap").val();
  var kontak_phone = $("#kontak_phone").val();
  var password = $("#password").val();

  $.ajax({
    url: "https://ptkai-loc.teknopertiwi.com/admin/data_user/tambah_data",
    method: "POST", //First change type to method here

    data: {
      akses_id: "1",
      bidang_id: bidang_id,
      username: username,
      nama_lengkap: nama_lengkap,
      kontak_phone: kontak_phone,
      password: password,
      // Second add quotes on the value.
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

function simpanPosisi(posisi) {
  var latitude = posisi.coords.latitude;
  var longitude = posisi.coords.longitude;
  var ip_addres = $("#ipaddres").val();
  var user_id = sessionStorage.getItem("id_user");
  // var username = $("#username").val();
  // var nama_lengkap = $("#nama_lengkap").val();
  // var kontak_phone = $("#kontak_phone").val();
  // var password = $("#password").val();

  $.ajax({
    url: "https://ptkai-loc.teknopertiwi.com/admin/data_aset_ip/tambah_data",
    method: "POST", //First change type to method here

    data: {
      latitude: latitude,
      longitude: longitude,
      user_id: user_id,
      ip_address: ip_addres,
    },
    success: function (response) {
      console.log(response);
      alert("lokasi user berhasil disimpan");
    },
    error: function () {
      alert("error");
    },
  });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(simpanPosisi);
}

var mapOptions = {
  center: [-2.9864194, 104.74221639999999],
  zoom: 13,
};

var peta = new L.map("peta", mapOptions);

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  }
).addTo(peta);

$.ajax({
  url: "https://ptkai-loc.teknopertiwi.com/admin/data_aset_ip",
  type: "GET",
  success: function (hasil) {
    console.log(hasil);
    var icon = "";
    for (var i = 0; i < hasil.data.length; i++) {
      L.marker([hasil.data[i].latitude, hasil.data[i].longitude], {})
        .addTo(peta)
        .bindPopup(
          "ID:" +
            hasil.data[i].id_aset_ip +
            "<br>IP Addres:" +
            hasil.data[i].ip_address +
            "<br> pengirim :" +
            hasil.data[i].username +
            "<br> longitude :" +
            hasil.data[i].longitude +
            "<br> latitude :" +
            hasil.data[i].latitude
        );
    }
  },
});
