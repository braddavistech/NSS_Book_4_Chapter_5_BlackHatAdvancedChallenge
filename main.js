let FinancialAdvisor = Object.create(Object.prototype, { 
  company: {
    value: "Shady Investments",
    enumerable: false,
    writable: false
  },
  specialty: {
    value: "",
    enumerable: false,
    writable: true,
    
  },
  name: {
    value: "",
    enumerable: true
  },
  portfolio: {
    value: [
      
    ],
    enumerable: false,
    writable: false
  },
  worth: {
    get: function () { 
      let totalWorth = 0;
      for (let i = 0; i < this.portfolio.length; i++){
        if (this.portfolio[i].transaction == "buy") {
          totalWorth += this.portfolio[i].quantity * this.portfolio[i].price;
        } else if (this.portfolio[i].transaction == "sell") {
          totalWorth -= this.portfolio[i].quantity * this.portfolio[i].price;
        }
      }
      return totalWorth.toFixed(2);
    },
    set: function () {},
    enumerable: false,
  },
  purchase: {
    value: function (stockName, purchaseQuantity, purchasePrice) {
      let index = this.portfolio.indexOf(stockName);
      if (index == -1) {
        let newStock = {
          transaction: "buy",
          stock: stockName,
          quantity: purchaseQuantity,
          price: purchasePrice
        }
        this.portfolio.push(newStock);
      } else {
        this.portfolio[index].quantity += purchaseQuantity;
        this.portfolio[index].price += purchasePrice;
      }
    },
    enumerable: false,
  },
  sell: {
    value: function (stockName, sellQuantity, sellPrice) {
      let currentlyOwn = false;
      for (let i = 0; i < this.portfolio.length; i++) {
        if (stockName == this.portfolio[i].stock){
          currentlyOwn = true;
          if (this.portfolio[i].quantity - sellQuantity >= 0) {
            this.portfolio[i].quantity -= sellQuantity;
            if (this.portfolio[i].quantity == 0) {
              this.portfolio.splice(i, 1);
            }
          } else {
            return `You only have ${this.portfolio[i].quantity} shares so you can't sell ${sellQuantity}. Try again.`;
          }
        }
      }
      if (currentlyOwn == false) {
        return `You don't own any shares of ${stockName}.`;
      }
    },
    enumerable: false
  },
  toMyString: {
    value: function () {
      let placeHolder = document.getElementById("nameBox");
      let sentence = document.createElement("h4");
      sentence.setAttribute("id", "sentence");
      sentence.innerHTML = `​​​​​${this.name} is an advisor at ${this.company}. The current value of their portfolio is USD $${this.worth}.`
      placeHolder.appendChild(sentence);
    },
    writable: false,
    enumerable: false
  }
});

const juliaKimChung = Object.create(FinancialAdvisor,  {  
 name: {value: "Julia Kim Chung"},
  specialty: {value: "Futures Trader"},
  portfolio: {value: []}
});
const bradDavis = Object.create(FinancialAdvisor, {
  name: {value: "Brad Davis"},
  specialty: {value: "Tech Start Ups"},
  portfolio: {value: []}
});
const forrestGump = Object.create(FinancialAdvisor,  {  
  name: {value: "Forrest Gump"},
   specialty: {value: "Shrimping Boats"},
   portfolio: {value: []}
 });
const steveMartin = Object.create(FinancialAdvisor, {
  name: {value: "Steve Martin"},
  specialty: {value: "Gag Gift Companies"}  ,
  portfolio: {value: []}
});

const buildName = (names, companies, specialties) => {
  let placeHolder = document.getElementById("nameBox");
  let nameBox = document.createElement("div");
  let companyName = document.createElement("h1");
  companyName.setAttribute("id", "company");
  companyName.innerHTML = companies;
  nameBox.appendChild(companyName);
  let specialtyName = document.createElement("h2");
  specialtyName.setAttribute("id", "specialty");
  specialtyName.innerHTML = specialties;
  nameBox.appendChild(specialtyName);
  let personName = document.createElement("h3");
  personName.setAttribute("id", "name");
  personName.innerHTML = names;
  nameBox.appendChild(personName);
  placeHolder.appendChild(nameBox);
};

function currentStock (stocks) {
  let placeHolder = document.getElementById("nameBox");
  let stockFrag = document.createDocumentFragment();
  for (let i = 0; i < stocks.length; i++) {
    let stockBox = document.createElement("p");
    stockBox.innerHTML = `${i+1}. ${stocks[i].stock} -   Own: ${stocks[i].quantity} shares. -   Price: $${stocks[i].price.toFixed(2)}`;
    stockFrag.appendChild(stockBox);
  }
  placeHolder.appendChild(stockFrag);
}


console.log(juliaKimChung);




juliaKimChung.purchase("Oil Futures", 50, 79.99);
bradDavis.purchase("GitHub", 60, 20);
steveMartin.purchase("Whoopie Cushions Inc", 70, 43.25);
bradDavis.sell("Facebook", 30, 98);
juliaKimChung.purchase("Corn Futures", 60, 10.5);
steveMartin.purchase("Bubba Gump", 60, 47);
juliaKimChung.purchase("Steel Futures", 75, 10);
bradDavis.purchase("YouTube", 50, 79.99);
bradDavis.purchase("Microsoft", 60, 20);
steveMartin.sell("Slinky", 70, 43.25);
bradDavis.purchase("Facebook", 15, 98);
steveMartin.purchase("Mattel", 60, 10.5);
steveMartin.purchase("Silly String", 60, 47);
juliaKimChung.purchase("Solar Energy Futures", 75, 10);
bradDavis.purchase("Apple", 75, 100.5);
forrestGump.purchase("Jenny", 1, 100000);
buildName(bradDavis.name, bradDavis.company, bradDavis.specialty);
currentStock(bradDavis.portfolio);
bradDavis.toMyString();
buildName(steveMartin.name, steveMartin.company, steveMartin.specialty);
currentStock(steveMartin.portfolio);
steveMartin.toMyString();
buildName(juliaKimChung.name, juliaKimChung.company, juliaKimChung.specialty);
currentStock(juliaKimChung.portfolio);
juliaKimChung.toMyString();
buildName(forrestGump.name, forrestGump.company, forrestGump.specialty);
currentStock(forrestGump.portfolio);
forrestGump.toMyString();
