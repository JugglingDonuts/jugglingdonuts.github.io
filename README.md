# Juggling Donuts website
## 開発環境のセットアップ
[yarn]() をインストールし、次のコマンドでライブラリをインストールする。

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

写真のリサイズや切り抜きは convert コマンドで行える。 (convertコマンドは imagemagick に含まれている)

```
$ convert -resize 600x600 sample.org.jpg sample.jpg
$ convert -crop 600x400+0+100 sample.org.jpg sample.jpg
```
