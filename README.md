# Juggling Donuts website
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
1. 基本的に `/docs` 以下のファイルを直接編集しない。 `/docs` 以下のHTMLやCSSは `/templates` や `/css` をもとに生成されたものである。
2. 写真は600x600以下の解像度で保存すること。

写真のリサイズや切り抜きは convert コマンドで行える。 (convertコマンドは [imagemagick](https://www.imagemagick.org/script/index.php) に含まれている)

```
$ convert -resize 600x600 sample.org.jpg sample.jpg
$ convert -crop 600x400+0+100 sample.org.jpg sample.jpg
```

## メンバーの追加
`members` 以下に入会年度ごとに tomlファイルを作成する。
ひとり分のデータは次のような形で登録する。
よくわからない場合は、 `members/2015.toml` を参考にすること。

```toml
[[members]]
name = ""
picture = ""
description = ""
team = ""
```
