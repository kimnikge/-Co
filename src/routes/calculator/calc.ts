import { taxConfig } from '$lib/config/taxConfig';

export type CalculatorInput = {
	monthlyRevenue: number;
	payroll: number;
	hasVAT: boolean;
	currentRegime?: string;
};

export type CalculatorResult = {
	taxUSN: number;
	totalOUR: number;
	difference: number;
	recommendation: string;
};

export function calculateTax(input: CalculatorInput): CalculatorResult {
	const monthlyRevenue = Math.max(0, input.monthlyRevenue);
	const payroll = Math.max(0, input.payroll);

	const taxUSN = monthlyRevenue * taxConfig.usnRate + payroll * taxConfig.socialRate;
	const grossProfit = monthlyRevenue * 0.3;
	const corporateTax = grossProfit * taxConfig.corporateRate;
	const socialTax = payroll * taxConfig.socialRate;
	const vat = input.hasVAT ? monthlyRevenue * taxConfig.vatRate : 0;

	const totalOUR = corporateTax + socialTax + vat;
	const difference = totalOUR - taxUSN;

	const recommendation =
		difference < 0
			? 'ОУР выгоднее'
			: difference > 0
				? 'УСН выгоднее'
				: 'Нагрузка сопоставима';

	return { taxUSN, totalOUR, difference, recommendation };
}