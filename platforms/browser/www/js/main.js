const baseUrl = "https://ptkai-loc.teknopertiwi.com/admin";
const getBidang = async () => {
  try {
    const response = await fetch(`${baseUrl}/data_bidang`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderAllBidang(responseJson.data);
    }
  } catch (error) {
    showResponseMessage(error);
  }
};

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

const getUser = async () => {
  try {
    const response = await fetch(`${baseUrl}/data_user`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderAllUser(responseJson.data);
    }
  } catch (error) {
    showResponseMessage(error);
  }
};

const getBidangselect = async () => {
  try {
    const response = await fetch(`${baseUrl}/data_bidang`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderAllBidangselect(responseJson.data);
    }
  } catch (error) {
    showResponseMessage(error);
  }
};

const removeBook = (bidangId) => {
  fetch(`${baseUrl}/data_bidang/hapus_data/${bidangId}`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getBidang();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const renderAllBidang = (data) => {
  const listBidangElement = document.querySelector("#listBidang");
  listBidangElement.innerHTML = "";

  data.forEach((bidang) => {
    listBidangElement.innerHTML += `
        <tbody>
          <tr>
            <td>${bidang.nama_bidang}</td>
            <td> <button type="button" class="btn btn-danger button-delete" id="${bidang.id_bidang}">Hapus</button></td>
          </tr>
      
        </tbody>
  
           
            `;
  });

  const buttons = document.querySelectorAll(".button-delete");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const bidangId = event.target.id;
      removeBook(bidangId);
    });
  });
};

const renderAllUser = (data) => {
  const listUserElement = document.querySelector("#list-user");
  listUserElement.innerHTML = "";

  data.forEach((user) => {
    listUserElement.innerHTML += `
    
        

        <tbody>
          <tr>
            <td>${user.nama_lengkap}</td>
            <td>${user.username}</td>
            <td> <button type="button" class="btn btn-danger button-delete" id="${user.id_bidang}">Hapus</button></td>
          </tr>
      
        </tbody>
  
           
            `;
  });

  const buttons = document.querySelectorAll(".button-delete");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const bidangId = event.target.id;
      removeBook(bidangId);
    });
  });
};

const renderAllBidangselect = (select) => {
  const SelectBidangElement = document.querySelector("#selectBidang");
  SelectBidangElement.innerHTML = "";
  select.forEach((bidang) => {
    SelectBidangElement.innerHTML += `
        <option value="${bidang.id_bidang}">${bidang.nama_bidang}</option> 
            `;
  });
};

const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};

getBidangselect();
getBidang();
getUser();
