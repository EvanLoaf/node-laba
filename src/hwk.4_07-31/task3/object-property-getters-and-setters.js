export const bankAccount = {
	_balance: 1000,
	get formattedBalance() {
		return `$${this._balance}`;
	},
	set balance(value) {
		if (typeof value === 'number' && value === value) {
			this._balance = value;
		}
	},
	transfer: function (targetAcc, amount) {
		if (amount <= 0) {
			throw new Error('Invalid amount');
		}
		if (this._balance >= amount) {
			this._balance -= amount;
			targetAcc._balance += amount;
		} else {
			throw new Error('Insufficient funds');
		}
	},
};
