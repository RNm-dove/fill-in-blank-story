import Provider from './Provider';

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" style={{height: '100%'}}>
			<body style={{height: '100%'}}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
