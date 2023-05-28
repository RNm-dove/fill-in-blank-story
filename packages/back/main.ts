import express, {Request, Response} from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // .envファイルの読み込み

const app = express();
app.use(express.json());
app.use(cors());

type InputData = {
	noun1: string;
	noun2: string;
	verb1: string;
	adverb1: string;
	adjective1: string;
	place1: string;
};

/**
 * OpenAPIのchat apiを叩くコード。マッドリブようの文字列データを生成してもらう。
 * @returns
 */
async function interactWithChatGPT(): Promise<string> {
	const endpoint = 'https://api.openai.com/v1/chat/completions';
	const apiKey = process.env.CHAT_GPT_SECRET_KEY; // ChatGPT APIキーを入力してください

	const headers = {
		Authorization: `Bearer ${apiKey}`,
		'Content-Type': 'application/json',
	};

	const requestMessage = `Create parodies of famous story to create  mad-lib story in Japanese in about 300 characters
	. Use: "<noun1>","<noun2>","<verb1>て","<adjective1>な","<adverb1>に","<place1>"`;
	console.debug('requestMessage', requestMessage);

	const data = {
		model: 'gpt-3.5-turbo',
		messages: [
			{role: 'system', content: 'You are a mad-lib game master.'},
			{role: 'user', content: requestMessage},
		],
	};

	try {
		const response = await axios.post(endpoint, data, {headers});
		const responseData = response.data;
		if (responseData.choices && responseData.choices.length > 0) {
			return responseData.choices[0].message.content;
		} else {
			return 'エラーが発生しました。';
		}
	} catch (error: any) {
		console.error('ChatGPT APIの呼び出しでエラーが発生しました:', error);
		throw error;
	}
}

/**
 * OpenAPIの画像生成APIを叩くコード。ユーザーが入力したデータをもとに、適当な画像を生成してもらう。
 * @param input
 * @returns
 */
async function createImage(input: InputData) {
	const endpoint = 'https://api.openai.com/v1/images/generations';
	const apiKey = process.env.CHAT_GPT_SECRET_KEY; // ChatGPT APIキーを入力してください

	const headers = {
		Authorization: `Bearer ${apiKey}`,
		'Content-Type': 'application/json',
	};
	const data = {
		prompt: `${input.place1}で、${input.noun1}と${input.noun2}が${input.adverb1}に${input.verb1}てた。`,
		n: 1,
		size: '512x512',
	};
	console.debug('requestData', data);

	try {
		const response = await axios.post(endpoint, data, {headers});
		const responseData = response.data;
		if (responseData.data && responseData.data.length > 0) {
			return responseData.data[0].url;
		} else {
			return 'エラーが発生しました。';
		}
	} catch (error: any) {
		console.error('ChatGPT APIの呼び出しでエラーが発生しました:', error);
		throw error;
	}
}

/**
 * POST: localhost:3000/chat で叩かれる想定。入力された文字列を、OpenAPIのAIが作成した文章に注入し、また画像を生成して、返す。
 */
app.post('/chat', async (req: Request, res: Response) => {
	const userWord: InputData = req.body.word;
	console.debug(userWord);

	try {
		const text = await interactWithChatGPT();
		const imageUrl = await createImage(userWord);
		const union = text
			.replace(/<noun1>/g, userWord.noun1)
			.replace(/<noun2>/g, userWord.noun2)
			.replace(/<verb1>/g, userWord.verb1)
			.replace(/<adverb1>/g, userWord.adverb1)
			.replace(/<adjective1>/g, userWord.adjective1)
			.replace(/<place1>/g, userWord.place1);
		console.debug(text);
		console.debug(union);
		console.debug(imageUrl);
		res.json({
			raw: text,
			union,
			input: userWord,
			imageUrl,
		});
	} catch (error) {
		console.error('error', error);
		res.status(500).json({error: '内部エラーが発生しました。'});
	}
});

const port = 3000;
app.listen(port, () => {
	console.log(`サーバーがポート ${port} で起動しました。`);
});
