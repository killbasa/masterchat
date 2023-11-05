import { Masterchat } from '../../src';
import axios from 'axios';
import { setupRecorder } from 'nock-record';
import { beforeAll, describe, expect, it, vi } from 'vitest';

const mode = (process.env.NOCK_BACK_MODE as any) || 'lockdown';
const record = setupRecorder({ mode });

async function fetchUpcomingStreams() {
	const data = await axios.get('https://holodex.net/api/v2/live?status=live&org=Hololive', {
		headers: {
			'X-APIKEY': process.env.HOLODEX_APIKEY
		}
	});
	return data.data;
}

describe('normal live chat', () => {
	let subject: any;
	let mc: Masterchat;

	beforeAll(async () => {
		const { completeRecording, assertScopesFinished } = await record('wildlife');
		const index = await fetchUpcomingStreams();
		subject = index[Math.round(index.length / 2)];
		mc = new Masterchat(subject.id, subject.channel.id);
		completeRecording();
		assertScopesFinished();
	});

	it('context match', async () => {
		expect(mc.videoId).toBe(subject.id);
		expect(mc.channelId).toBe(subject.channel.id);
	}, 60000);

	it('can fetch live chat', async () => {
		expect.assertions(3);

		const { completeRecording } = await record('wildlife2');

		const errFn = vi.fn();

		let times = 0;
		await mc
			.on('chats', (chats) => {
				const textChat = chats.find((chat: any) => chat.membership && 'text' in chat.message![0]);
				expect(textChat).toEqual(
					expect.objectContaining({
						authorName: expect.any(String),
						authorChannelId: expect.any(String),
						authorPhoto: expect.stringMatching(/^https:\/\/yt\d\.ggpht/),
						contextMenuEndpointParams: expect.any(String),
						id: expect.any(String),
						isModerator: expect.any(Boolean),
						isVerified: expect.any(Boolean),
						isOwner: expect.any(Boolean),
						timestamp: expect.any(Date),
						timestampUsec: expect.stringMatching(/^\d+$/),
						type: 'addChatItemAction',
						rawMessage: expect.arrayContaining([
							{
								text: expect.any(String)
							}
						])
					})
				);

				times += 1;
				if (times >= 2) mc.stop();
			})
			.on('error', errFn)
			.listen({ topChat: false });

		completeRecording();

		expect(errFn).not.toBeCalled();
	}, 60000);
});
