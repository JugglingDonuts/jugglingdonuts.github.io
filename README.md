# Juggling Donuts website
[![Build Status](https://github.com/jugglingdonuts/jugglingdonuts.github.io/workflows/github_pages/badge.svg)](https://github.com/JugglingDonuts/jugglingdonuts.github.io/actions)

## メンバーの追加のやり方
以下では `2017` 年度入会のメンバーを追加する場合で説明する

1. 写真を `200px x 200px` の解像度にする (ペイントなどでできる)
2. 写真を `img/member/2017/` にアップロードする
3. `members/2017.toml` を編集する

メンバーの情報は次のような形式で与える。

```toml
[[members]]
name = ""
picture = ""
description = ""
team = ""
```

※新年度に(数字).tomlファイルは新規作成するだけで勝手にホームページに追加してくれます。

## サイトの写真の変更
`img/top.jpg`, `img/members.jpg`, `img/irai.jpg` を上書きすることで写真を変更できる。

## JDL特設ページ
- `jdl/`に `2017.toml`のようなファイルを作成する
- `.env` を編集し、`WITH_JDL` に対象の年をセットする
- `templates`の`jdl.html` も編集し甲斐がある

## 開発環境のセットアップ
[yarn](https://yarnpkg.com/ja/) をインストールし、次のコマンドでライブラリをインストールする。

```
$ yarn
```

HTMLとCSSを生成し、プレビューを見るには

```
$ yarn run preview
```

とする。

### 注意
写真は600x600以下の解像度で保存すること。

写真のリサイズや切り抜きは convert コマンドで行える。 (convertコマンドは [imagemagick](https://www.imagemagick.org/script/index.php) に含まれている)

```
$ convert -resize 600x600 sample.org.jpg sample.jpg
$ convert -crop 600x400+0+100 sample.org.jpg sample.jpg
```

### ディレクトリの構成

- `img/`: 画像データ
- `members/`: メンバーの情報
- `templates/`: HTMLのテンプレート
- `main.js`: HTMLを生成するためのスクリプト

### 使用している技術

- [nodejs](https://nodejs.org/en/)
- [stylus](http://stylus-lang.com/)
- [nunjucks](https://mozilla.github.io/nunjucks/)

### ライブラリの更新

```
$ yarn upgrade
```

### デプロイとホスティング
[このサイト](https://juggling-donuts.org)は、[GitHub Pages](https://help.github.com/ja/github/working-with-github-pages/about-github-pages)でホスティングされています。

このリポジトリのdevブランチに変更がpushされると、[GitHub Actions](https://help.github.com/ja/actions/getting-started-with-github-actions/about-github-actions)でサイトがビルドされデプロイされます。
ビルド結果は、masterブランチにpushされます。
masterブランチに手動で変更を加えないでください。
この設定は `.github/workflows/gh-pages.yml` に記述されています。


