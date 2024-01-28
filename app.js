//BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function (type, des, val) {
            var newItem, id;

            //create new ID
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }

            // create new item based on 'inc' or 'exp'
            if (type === 'exp') {
                newItem = new Expense(id, des, val);
            } else if (type === 'inc') {
                newItem = new Income(id, des, val);
            }
            // push it into data structure
            data.allItems[type].push(newItem);

            //return the new item
            return newItem;
        },

        testing: function () {
            console.log(data)
        }

    };

})();

// UI CONTROLLER
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };

        },
        addListItem: function (obj, type) {


        },
        getDOMStrings: function () {
            return DOMStrings;
        }

    };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setUpEventListeners = function () {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.which === 13) {
                ctrlAddItem();
            }
        });

    };
    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get input fields
        input = UICtrl.getInput();

        //2. Add Item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    }
    return {
        init: function () {
            console.log('Application has started.')
            setUpEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();

