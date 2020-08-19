const baseUrl = "https://ptkai-loc.teknopertiwi.com/admin";
const getHome = async () => {
  try {
    const response = await fetch(`${baseUrl}/home`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderAllHome(responseJson.data);
    }
  } catch (error) {
    showResponseMessage(error);
  }
};
const renderAllHome = (home) => {
  const SelectHomeElement = document.querySelector("#home");

  SelectHomeElement.innerHTML += `
        <div class="col-6">
          <div class="box-data">
          <div class="logo-home">
           <img src="img/location.png"></div>
          
            <div class="data">
                <h6>${home.jumlah_ip_record}</h6>
            </div>
            <div class="data-info">
            <h5>Data IP</h5>
            </div>
          </div>
        </div>
         <div class="col-6">
          <div class="box-data">
            <div class="logo-home">
            <img src="img/database.png">
           </div>
            <div class="data">
            <h6>${home.jumlah_user_record}</h6>
            </div>
            <div class="data-info">
            <h5>Data User</h5>
            </div>
          </div>
        </div>
            `;
};
getHome();
