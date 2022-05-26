fetch("./jsonData/product-list.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendData(data) {
  let tabs = document.getElementById("div");
  let textt = "Size Özel";
  data.responses[0][0].params.userCategories.map((x, index) => {
    let ul = document.createElement("ul");
    ul.classList.add("items-li");
    ul.onclick = () => {
      textt = ul.innerHTML;
      fetchData(data, textt.replace(/&amp;/g, "&").replace(/&gt;/g, ">"));
    };

    let myValue = String(x).indexOf(">");
    ul.innerHTML = String(x).includes(">")
      ? String(x).slice(myValue + 2, x.length)
      : x;
    tabs.appendChild(ul);
  });
  let replacingText = textt.replace(/&amp;/g, "&").replace(/&gt;/g, ">");
  fetchData(data, replacingText);
}

function fetchData(data, textt) {
  if (!textt) {
    textt = "Size Özel";
  }

  let newText = data.responses[0][0].params.userCategories.filter((item) =>
    String(item).includes(String(textt))
  );
  let products = document.getElementById("products");
  products.innerHTML = "";
  let mappingProduct = data.responses[0][0].params.recommendedProducts[newText];

  for (let a = 0; a < mappingProduct.length; a++) {
    let firstDiv = document.createElement("div");
    let secondDiv = document.createElement("div");
    let thirdDiv = document.createElement("div");
    let fourthDiv = document.createElement("div");
    let img = document.createElement("img");
    let imgLogo = document.createElement("img");
    let firstSpan = document.createElement("span");
    let secondSpan = document.createElement("span");
    let addcart = document.createElement("button");
    firstDiv.classList.add("product-items");
    imgLogo.src = "./css/shipping.png";
    imgLogo.className = "imgShip";
    img.src = mappingProduct[a].image;
    img.classList.add("img");
    img.alt = "img";
    secondDiv.classList.add("product-content");
    thirdDiv.classList.add("price");
    fourthDiv.classList.add("shipping-in");
    firstSpan.classList.add("Logo");
    secondSpan.classList.add("shippingFee");
    addcart.classList.add("button");

    addcart.textContent = "Sepete Ekle";
    firstSpan.textContent = "Logo";
    secondSpan.textContent =
      mappingProduct[a].params.shippingFee && "Ücretsiz Kargo";
    fourthDiv.append(imgLogo, secondSpan);
    thirdDiv.textContent = mappingProduct[a].priceText;
    secondDiv.textContent = mappingProduct[a].name;
    firstDiv.append(img, secondDiv, thirdDiv, fourthDiv, addcart);
    products.append(firstDiv);
  }
}
