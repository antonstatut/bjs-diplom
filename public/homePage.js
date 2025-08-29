const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout(response => {
        if (response) {
            location.reload();
        };
    });
};

ApiConnector.current(response => {
    if(response){
        ProfileWidget.showProfile(response.data);
    };
});

const ratesBoard = new RatesBoard();

function getCurrencyRate(){
    ApiConnector.getStocks(response => {
        if(response){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
};
setInterval(getCurrencyRate(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if (response.error) {
            moneyManager.setMessage(false, response.error);
        } else {
            moneyManager.setMessage(true, "Успешное пополнение!");
            ProfileWidget.showProfile(response.data);
        };
    });
};

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if (response.error) {
            moneyManager.setMessage(false, response.error);
        } else {
            moneyManager.setMessage(true, "Успешное конвертирование!");
            ProfileWidget.showProfile(response.data)
        };
    });
};

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if (response.error) {
            moneyManager.setMessage(false, response.error);
        } else {
            moneyManager.setMessage(true, "Успешный перевод!");
            ProfileWidget.showProfile(response.data);
        }
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data , response => {
        if (response.error) {
            favoritesWidget.setMessage(false, response.error);
        } else {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен!")
        };
    });
};

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.error) {
            favoritesWidget.setMessage(false, response.error);
        } else {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно удален!")
        };
    });
}
