'use client';
import {ChangeEvent, FormEvent, useState} from 'react';
import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Input,
	VStack,
	Text,
	SimpleGrid,
	Image,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Stack,
	Center,
	InputGroup,
	InputRightAddon,
} from './ChakraClient';
import axios from 'axios';
import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './126681-story-icon.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

export default function Page() {
	const [word, setWord] = useState<{
		noun1: string;
		noun2: string;
		verb1: string;
		adverb1: string;
		adjective1: string;
		place1: string;
	}>({
		noun1: '',
		noun2: '',
		verb1: '',
		adverb1: '',
		adjective1: '',
		place1: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [response, setResponse] = useState({
		raw: 'ある日、<noun1>と<noun2>は<place1>の中で出会いました。<noun1>は驚くほど<adjective1>で、<noun2>はとても<adverb1>話していました。二人はすぐに友達になり、一緒に<verb1>することを決めました。\n\nしかし、<noun1>がとても変わった考えを持っていたため、<noun2>は少し心配しました。<noun1>は、<noun2>と一緒に<place1>を出て、<noun1>の特別な計画に従って行動することにしました。\n\n<place1>を出た後、<noun1>は急に<adjective1>行動をとり始めました。<noun2>は「どうしたの？」と尋ねましたが、<noun1>は答えませんでした。代わりに、<noun1>は<noun2>を狂ったように追いかけ始め、<noun2>は逃げることになりました。\n\n最終的に、<noun2>は<noun1>に捕まり、<noun1>は<noun2>に不気味な提案をしました。<noun2>は、「いやだ、それは恐ろしい」と言いましたが、<noun1>は根気強く説得し続けました。\n\n最終的に、<noun2>は<noun1>の提案に同意しましたが、この怪奇的な冒険は2人にとって忘れられない経験になりました。',
		union:
			'ある日、サザエとタラちゃんはファミマの中で出会いました。サザエは驚くほど魅惑的なで、タラちゃんはとてもくねくねした動きで話していました。二人はすぐに友達になり、一緒にフードファイトするすることを決めました。\n\nしかし、サザエがとても変わった考えを持っていたため、タラちゃんは少し心配しました。サザエは、タラちゃんと一緒にファミマを出て、サザエの特別な計画に従って行動することにしました。\n\nファミマを出た後、サザエは急に魅惑的な行動をとり始めました。タラちゃんは「どうしたの？」と尋ねましたが、サザエは答えませんでした。代わりに、サザエはタラちゃんを狂ったように追いかけ始め、タラちゃんは逃げることになりました。\n\n最終的に、タラちゃんはサザエに捕まり、サザエはタラちゃんに不気味な提案をしました。タラちゃんは、「いやだ、それは恐ろしい」と言いましたが、サザエは根気強く説得し続けました。\n\n最終的に、タラちゃんはサザエの提案に同意しましたが、この怪奇的な冒険は2人にとって忘れられない経験になりました。',
		input: {
			noun1: 'サザエ',
			noun2: 'タラちゃん',
			verb1: 'フードファイトする',
			adverb1: 'くねくねした動きで',
			adjective1: '魅惑的な',
			place1: 'ファミマ',
		},
		imageUrl: '',
	});

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post('http://localhost:3000/chat', {word});
			setResponse(response.data);
		} catch (error) {
			console.error(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box backgroundColor="skyblue" height="100%">
			<Container maxWidth="1024px" paddingY={3}>
				<Heading
					as="h1"
					mb={4}
					textAlign="center"
					color="white"
					textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
				>
					マッドリブス
				</Heading>
				<SimpleGrid columns={2} gap={4}>
					<VStack>
						<VStack spacing={4} width="100%">
							<FormControl>
								<FormLabel color="white">名詞1</FormLabel>
								<Input
									type="text"
									value={word.noun1}
									onChange={(event) => {
										setWord((prev) => ({
											...prev,
											noun1: event.target.value,
										}));
									}}
									variant="filled"
									bg="white"
									color="gray.800"
									_hover={{bg: 'gray.100'}}
									_focus={{bg: 'gray.100', boxShadow: 'outline'}}
								/>
							</FormControl>
							<FormControl>
								<FormLabel color="white">名詞2</FormLabel>
								<Input
									type="text"
									value={word.noun2}
									onChange={(event) => {
										setWord((prev) => ({
											...prev,
											noun2: event.target.value,
										}));
									}}
									variant="filled"
									bg="white"
									color="gray.800"
									_hover={{bg: 'gray.100'}}
									_focus={{bg: 'gray.100', boxShadow: 'outline'}}
								/>
							</FormControl>
							<FormControl>
								<FormLabel color="white">形容詞</FormLabel>
								<InputGroup size="sm">
									<Input
										type="text"
										value={word.adjective1}
										onChange={(event) => {
											setWord((prev) => ({
												...prev,
												adjective1: event.target.value,
											}));
										}}
										variant="filled"
										bg="white"
										color="gray.800"
										_hover={{bg: 'gray.100'}}
										_focus={{bg: 'gray.100', boxShadow: 'outline'}}
									/>
									<InputRightAddon children="な" />
								</InputGroup>
							</FormControl>
							<FormControl>
								<FormLabel color="white">副詞</FormLabel>
								<InputGroup size="sm">
									<Input
										type="text"
										value={word.adverb1}
										onChange={(event) => {
											setWord((prev) => ({
												...prev,
												adverb1: event.target.value,
											}));
										}}
										variant="filled"
										bg="white"
										color="gray.800"
										_hover={{bg: 'gray.100'}}
										_focus={{bg: 'gray.100', boxShadow: 'outline'}}
									/>
									<InputRightAddon children="に" />
								</InputGroup>
							</FormControl>
							<FormControl>
								<FormLabel color="white">動詞</FormLabel>
								<InputGroup size="sm">
									<Input
										type="text"
										value={word.verb1}
										onChange={(event) => {
											setWord((prev) => ({
												...prev,
												verb1: event.target.value,
											}));
										}}
										variant="filled"
										bg="white"
										color="gray.800"
										_hover={{bg: 'gray.100'}}
										_focus={{bg: 'gray.100', boxShadow: 'outline'}}
									/>
									<InputRightAddon children="て" />
								</InputGroup>
							</FormControl>
							<FormControl>
								<FormLabel color="white">場所</FormLabel>
								<Input
									type="text"
									value={word.place1}
									onChange={(event) => {
										setWord((prev) => ({
											...prev,
											place1: event.target.value,
										}));
									}}
									variant="filled"
									bg="white"
									color="gray.800"
									_hover={{bg: 'gray.100'}}
									_focus={{bg: 'gray.100', boxShadow: 'outline'}}
								/>
							</FormControl>
							<Button
								colorScheme="teal"
								onClick={handleSubmit}
								bg="#FF77B7"
								color="white"
								borderRadius="md"
								_hover={{bg: '#FF5FA0'}}
								_active={{bg: '#FF4380'}}
								width="100%"
							>
								マドリブ!
							</Button>
							{error && (
								<Text color="red.300" fontSize="small">
									エラーが発生しました。{error}
								</Text>
							)}
						</VStack>
					</VStack>
					<VStack>
						<Tabs width="100%">
							<TabList>
								<Tab>生成マドリブ</Tab>
								<Tab>生データ</Tab>
								<Tab>入力データ</Tab>
							</TabList>

							<TabPanels>
								<TabPanel>
									<Box>{response.union}</Box>
									<Image src={response.imageUrl}></Image>
								</TabPanel>
								<TabPanel>
									<Box>{response.raw}</Box>
								</TabPanel>
								<TabPanel>
									<Stack>
										<div>
											<dt>名詞1 &lt;noun1 &gt; </dt>
											<dd>{response.input.noun1}</dd>
										</div>
										<div>
											<dt>名詞2 &lt;noun2 &gt; </dt>
											<dd>{response.input.noun2}</dd>
										</div>
										<div>
											<dt>動詞1 &lt;verb1 &gt; </dt>
											<dd>{response.input.verb1}</dd>
										</div>
										<div>
											<dt>副詞1 &lt;adverb1 &gt; </dt>
											<dd>{response.input.adverb1}</dd>
										</div>
										<div>
											<dt>形容詞1 &lt;adjective1 &gt; </dt>
											<dd>{response.input.adjective1}</dd>
										</div>
										<div>
											<dt>場所1 &lt;place1 &gt; </dt>
											<dd>{response.input.place1}</dd>
										</div>
									</Stack>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</VStack>
				</SimpleGrid>
			</Container>
			{isLoading && (
				<Box position="fixed" top={0} left={0} right={0} bottom={0}>
					<Box
						height="100%"
						width="100%"
						backgroundColor="white"
						opacity="0.5"
						position="fixed"
					></Box>
					<Grid
						position="fixed"
						height="100%"
						width="100%"
						placeItems="center"
						placeContent="center"
					>
						<Lottie options={defaultOptions} height={400} width={500} />
						<Text
							fontWeight="extrabold"
							color="yellow"
							fontSize="5xl"
							position="relative"
							top="-69px"
							left="13px"
						>
							ストーリー作成中...
						</Text>
					</Grid>
				</Box>
			)}
		</Box>
	);
}
