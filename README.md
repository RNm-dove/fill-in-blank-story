# マッドリブス

遊び方

1. 名詞 1、名詞 2、形容詞、副詞、動詞、場所を指定する。
2. ChatGPT の API がランダムに虫食いされた物語を生成する
3. ChatGPT の API が入力された名詞をもとに、画像を生成
4. 画面に物語が表示される
5. それを楽しむ

意味不明さを楽しんでね。

## セットアップ

1. レポジトリをクローン:

```bash
git clone <repository-url>
```

2. NodeJS 環境を準備する(すでにあればスキップ):
   環境に応じてお好みで。

3. pnpm(npm 互換のライブラリマネージャー)をインストールする(すでにあればスキップ):

4. レポジトリへ移動:

```bash
cd <レポジトリをクローンしたフォルダ>
```

5. パッケージルートのライブラリのインストール

```bash
pnpm install
```

6. front パッケージのライブラリのインストール

```bash
pnpm front install
```

6. back パッケージのライブラリのインストール

```bash
pnpm back install
```

## 開発

### フロント

1. front パッケージのサーバー立ち上げ:

```bash
pnpm front dev
```

2. localhost:8080 へアクセス

### バック

1. back パッケージのサーバー立ち上げ:

```bash
pnpm back start
```

2. localhost:3000 へ API を叩く
