$$(".form-to-json").on("click", function () {
  var formData = myApp.formToJSON("#my-form"); //ambil data dari form login
  console.log(formData.kode_koperasi);
  $$.ajax({
    //ajax login
    url: signIn + "Login/login",
    type: "POST", //method
    data: {
      //data yang di kirim
      username: formData.username,
      password: formData.password,
      kode_koperasi: formData.kode_koperasi,
    },
    dataType: "json",
    beforeSend: function (data) {
      //saat proses login
      myApp.showPreloader("Loading...");
    },
    success: function (data) {
      //setelah ada respon server
      myApp.hidePreloader();
      if (data.data_status == true) {
        //kalau berhasil login di cek dari object data_status
        myApp.addNotification({
          title: "Selamat Anda berhasil Login",
          subtitle: data.data_result.nama_anggota,
        });

        localStorage.setItem("kode_koperasi", data.data_result.kode_koperasi); //buat session
        // localStorage.getItem("kode_koperasi"); //manggil session
        // localStorage.clear(); //hapus session
        // -----
        localStorage.setItem("no_anggota", data.data_result.no_anggota);
        localStorage.setItem("nama_anggota", data.data_result.nama_anggota);
        localStorage.setItem("id_anggota", data.data_result.id_anggota);

        location.href = "mainView.html";
      } else {
        //kalau gagal login
        myApp.addNotification({
          title: "Maaf Login Gagal!",
          subtitle: data.msg,
        });
      }
    },
  });
});
