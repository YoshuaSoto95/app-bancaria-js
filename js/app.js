class Account {
    constructor(name, account, balance = 0, transactions = 0, movements = []) {
        this.account = account;
        this.name = name;
        this.balance = balance;
        this.transactions = transactions;
        this.movements = movements;
    }

    deposit(quantity){
        this.balance += quantity;
        this.movements.push({
            transaction: this.transactions,
            type: "Deposit",
            amount: quantity,
            date: new Date()
        });
        this.transactions += 1;
        alert(`Dear: ${this.name}, You have successfully deposited $${quantity} in your account.`);
    }
    withdraw(quantity){
        if (quantity > this.balance) {
            alert(`Dear: ${this.name}, You don't have enough money in your account.`);
        } else {
            this.balance -= quantity;
            this.movements.push({
                transaction: this.transactions,
                type: "Withdrawal",
                amount: quantity,
                date: new Date()
            });
            this.transactions += 1;
            alert(`Dear: ${this.name}, You have successfully withdrawn $${quantity} from your account.`);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const accountName = document.getElementById("account-name-account");
    const accountNumber = document.getElementById("account-number-account");
    const getNameAccount = document.getElementById("get-name-account");
    const getBalanceAccount = document.getElementById("get-balance-account");
    const getTransactionsAccount = document.getElementById("get-transactions-account");
    const formDeposit = document.getElementById("form-deposit");
    const formWithdraw = document.getElementById("form-withdraw")
    const cardMovements = document.getElementById("card");

    const new_name = prompt(`
        Please enter your name to create your New Card.
        Example: John Due.
        `);
    const new_account = generarNumeroTarjetaDebito();

    function generarNumeroTarjetaDebito() {
        let numero = '';
        for (let i = 0; i < 4; i++) {
          let grupo = '';
          for (let j = 0; j < 4; j++) {
            grupo += Math.floor(Math.random() * 10);
          }
          numero += grupo + (i < 3 ? ' ' : '');
        }
        return numero;
}

    const client =  new Account(new_name.toUpperCase(), new_account);

    function showDataAccount() {
        accountName.innerHTML = client.name
        accountNumber.innerHTML = client.account
        getNameAccount.innerHTML = client.name
        getBalanceAccount.innerHTML = "$ " + client.balance + " USD"
        getTransactionsAccount.innerHTML = client.transactions
    }

    showDataAccount();
    console.log(client);

    document.getElementById("form-deposit").addEventListener("submit", (event) =>{
        event.preventDefault();

        let quantity = parseFloat(document.getElementById("deposit").value);

        client.deposit(quantity);
        renderMovements()
        showDataAccount();
        formDeposit.reset();
    });

    document.getElementById("form-withdraw").addEventListener("submit", (event) =>{
        event.preventDefault();

        let quantity = parseFloat(document.getElementById("withdraw").value);

        client.withdraw(quantity);
        renderMovements()
        showDataAccount();
        formWithdraw.reset();
    });

    function renderMovements() {
        let movements = client.movements;
        cardMovements.innerHTML = "";
        movements.forEach((move, index) => {
            let card = document.createElement("div");
                card.innerHTML = `
                <div class="card-style">
                    <div class="box">
                        <label for="">Transaction:</label>
                        <p>#${move.transaction + 1}</p>
                    </div>
                    <div class="box">
                        <label for="">Type of transaction:</label>
                        <p>${move.type}</p>
                    </div>
                    <div class="box">
                        <label for="">Amount:</label>
                        <p>$ ${move.amount} USD</p>
                    </div>
                    <div class="box">
                        <label for="">Date:</label>
                        <p>${move.date.toDateString()}</p>
                    </div>
                </div>
                `
            cardMovements.appendChild(card);
        });
    }
});

