import {FinanceCalculator, Order, OrderManagement, Validator} from "../src/app";

describe("OrderManagement", () => {

    // before all, new validator and new calculator
    // before each, new order manager
    let validator: Validator;
    let calc: FinanceCalculator;
    let orderManager: OrderManagement;
    let baseValidator: (order: Order) => void;

    beforeAll(() => {
        validator = new Validator([]);
        calc = new FinanceCalculator();
    });
    beforeEach(() => {
        baseValidator = validator.validate;
        validator.validate = jest.fn();
        orderManager = new OrderManagement(validator, calc);
    });
    afterEach(() => {

    });
    it("should add an order", () => {
        // Arrange
        const item = "Sponge";
        const price = 15;

        // Act
        orderManager.addOrder(item, price);

        // Assert 
        expect(orderManager.getOrders()).toEqual([{id: 1, item, price}]);
    });

    it("should get an order", () => {
        // Arrange 
        const item = "Sponge";
        const price = 15;
        orderManager.addOrder(item, price);

        // Act
        const order = orderManager.getOrder(1);

        // Assert
        expect(order).toEqual({id: 1, item, price});
    });

    it("should call finance calculator getRevenue", () => {
        // Arrange
        const item = "Sponge";
        const price = 15;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calc, 'getRevenue');

        // Act
        orderManager.getTotalRevenue();

        // Assert
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{id: 1, item, price}]);
        expect(spy).toHaveReturnedWith(15);
    });

    it("should throw addition exception if validator does not pass", () => {
        // Arrange
        const item = "Sponge";
        const price = 10;
        (validator.validate as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid order");
        });

        // Act & Assert
        expect(() => orderManager.addOrder(item, price)).toThrow("[OrderManagement] Error adding order: Invalid order");
    })
});

describe("FinancialCalculator", () => {
    it("should calculate total revenue", () => {
        // Arrange
        const cal = new FinanceCalculator();
        const orders = [
            {id: 1, item: "Sponge", price: 5},
            {id: 2, item: "Chocolate", price: 20},
            {id: 3, item: "Fruit", price: 10}
        ];

        // Act
        const revenue = cal.getRevenue(orders);

        // Assert
        expect(revenue).toBe(35);
    });

    it("should calculate average buy power", () => {
        // Arrange
        const cal = new FinanceCalculator();
        const orders = [
            {id: 1, item: "Sponge", price: 5},
            {id: 2, item: "Chocolate", price: 20},
            {id: 3, item: "Fruit", price: 10}
        ];

        // Act
        const averageBuyPower = cal.getAverageBuyPower(orders);

        // Assert
        expect(averageBuyPower).toBe(11.666666666666666);
    });
});