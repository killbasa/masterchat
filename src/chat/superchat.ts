import { parseColorCode } from './utils';
import { stringify } from '../utils';
import { SUPERCHAT_COLOR_MAP, SUPERCHAT_SIGNIFICANCE_MAP } from '../interfaces/misc';
import type { SuperChat } from '../interfaces/misc';
import type { YTLiveChatPaidMessageRenderer } from '../interfaces/yt/chat';

const AMOUNT_REGEXP = /[\d.,]+/;

const SYMBOL_TO_TLS_MAP: Record<string, string> = {
	$: 'USD',
	'£': 'GBP',
	'¥': 'JPY',
	'JP¥': 'JPY',
	'₩': 'KRW',
	'₪': 'ILS',
	'€': 'EUR',
	'₱': 'PHP',
	'₹': 'INR',
	A$: 'AUD',
	CA$: 'CAD',
	HK$: 'HKD',
	MX$: 'MXN',
	NT$: 'TWD',
	NZ$: 'NZD',
	R$: 'BRL'
};

export function toTLS(symbolOrTls: string): string {
	return (SYMBOL_TO_TLS_MAP[symbolOrTls] as string | undefined) ?? symbolOrTls;
}

export function parseAmountText(purchaseAmountText: string) {
	const input = stringify(purchaseAmountText);
	const amountString = AMOUNT_REGEXP.exec(input)![0].replace(/,/g, '');

	const amount = parseFloat(amountString);
	const currency = toTLS(input.replace(AMOUNT_REGEXP, '').trim());
	return { amount, currency };
}

export function parseSuperChat(renderer: YTLiveChatPaidMessageRenderer): SuperChat {
	const { amount, currency } = parseAmountText(renderer.purchaseAmountText.simpleText);

	const color = SUPERCHAT_COLOR_MAP[renderer.headerBackgroundColor.toString() as keyof typeof SUPERCHAT_COLOR_MAP];
	const significance = SUPERCHAT_SIGNIFICANCE_MAP[color];

	return {
		amount,
		currency,
		color,
		significance,
		authorNameTextColor: parseColorCode(renderer.authorNameTextColor),
		timestampColor: parseColorCode(renderer.timestampColor),
		headerBackgroundColor: parseColorCode(renderer.headerBackgroundColor),
		headerTextColor: parseColorCode(renderer.headerTextColor),
		bodyBackgroundColor: parseColorCode(renderer.bodyBackgroundColor),
		bodyTextColor: parseColorCode(renderer.bodyTextColor)
	};
}
