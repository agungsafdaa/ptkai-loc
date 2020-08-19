const baseUrl = "https://ptkai-loc.teknopertiwi.com/admin";
const getIP = async () => {
  try {
    const response = await fetch(`${baseUrl}/data_aset_ip`);
    const responseJson = await response.json();
    if (responseJson.error) {
      showResponseMessage(responseJson.message);
    } else {
      renderAllIpAddres(responseJson.data);
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

const renderAllIpAddres = (data) => {
  const listBidangElement = document.querySelector("#listIP");
  listBidangElement.innerHTML = "";

  data.forEach((ip) => {
    listBidangElement.innerHTML += `
        <tbody>
          <tr>
            <td>${ip.ip_address}</td>
            <td>${ip.username}</td>
            <td> <button type="button" class="btn btn-danger button-delete" id="${ip.id_aset_ip}">Hapus</button></td>
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

const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};

getIP();
