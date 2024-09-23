# Shopify

## cli ver3

```shell
$ shopify version
バージョン確認

$ shopify theme --help
ヘルプ

$ shopify theme pull --store xxxxx(自身のストア名)
本番からテーマを落としてくる

$ shopify theme dev
開発環境を立ち上げる

$ shopify theme push
開発したテーマを上げる

$ shopify auth logout
ログアウト
```

## 構成

### assetsディレクトリ

・CSSファイル、JavaScriptファイル、画像ファイルを格納する。

・ここには下層ディレクトリは作成できない。

### configディレクトリ

#### settings_data.json

・テーマに入れ込む変数を書き込む。presetsにはテーマのデフォルトの値が入っていて、currentにカスタマイズしたい値を追加すると上書きできる。

#### settings_schema.json

・管理画面の「テーマ設定」で設定できる項目を定義

### layoutディレクトリ

#### password.liquid

・パスワード設定時に表示する画面

#### theme.liquid

・全ページの共通となるheadタグ・bodyタグが記述されている。metaタグや共通のstyle,scriptタグはtheme.liquidに書く。

### localesディレクトリ

・翻訳用ファイル

### sectionsディレクトリ

・デフォルトで入っているsectionファイルを複製して変更するか、自分で一からHTMLを書いて作成。

・sectionには静的セクションと動的セクションがある。

静的セクションとしてsections/header.liquidを呼び出す例

```liquid
{% section 'header' %}
```

・動的セクションを使うにはsectionファイルにはschemaが必須。

・"presets"を記述することで"name"属性の名前で管理画面からsectionを追加するときに選択肢として呼び出せるようになる。逆に言えば管理画面から入力して作りたければschemaが必須となる。

```liquid
sections/sample.liquid

{% schema %}
{
  "name": "main-section-xxxx",
  "class": "", // wrapperのクラス
  "tag": "", // wrapperのHTMLタグ
  "settings": [
    {
        "id": "xxxx", // {{ section.settings.xxxx }}としてliquidファイル内から呼び出せる。
        "type": "text",
        "label": "Header", // 管理画面に表示させるテキスト
        "default": "Hello world" // typeのデフォルト値
    }
  ],
  "blocks": [ // for文で表示
    {
      "name": "hoge",
      "type": "text",
      "limit": 1,
      "settings": [
         {
          "id": "hogefuga-block"
          "type": "text",
          "name": "hoge",
          "label": "Hoge",
         }
      ]
    }
  ],
  "max_blocks": 2,
  "default": { // 静的に含まれているセクションは、スキーマでデフォルトの構成を定義できる
    "settings": {
        "heading": "Hello World"
    },
  },
  "locales": {
      "en": {
        "title": "Welcome"
      },
      "fr": {
        "title": "Bienvenue"
      }
  },
  "presets": [
    {
      "name": "xxxセクション",
    }
  ]
}
{% endschema %}
```

### snippetsディレクトリ

・sectionファイル内で呼び出すことができ、アイコンとして使うsvg・ボタン・ナビゲーションなど、使いまわしたいパーツを作成。

・schemaは不要。svgタグを置いてアイコンとして呼び出したり、変数を引き渡して自在にリンク先を変えられるボタンなどとして使用

### templatesディレクトリ

・各ページのテンプレートが入っている。中には呼び出すsectionとその順番を記述。

・"sections"の中に呼び出したいsectionの情報を記述。"order"でsectionの表示順を指定。

・"settings"はsectionファイルの中で定義されていなければ書かなくても良い。

```liquid
{
  "sections": {
    "main": {
      "type": "main-section-xxxx", //ファイル名
      "settings": {
        "padding_top": 28,
        "padding_bottom": 28
      }
    }
  },
  "order": ["main"]
}
```

templateファイルからセクション(sectionsディレクトリにあるliquidファイル)を呼び出す方法

```json
example.json

"sections": {
    "hoge": {
      "type": "hoge-hoge-section", // sectionsディレクトリにあるファイル名
      "settings": {}
    },
    "fuga": {
      "type": "fuga-fuga-section", // sectionsディレクトリにあるファイル名
      "settings": {}
    }
},
"order": [ // 上記の呼び出し順
  "hoge",
  "fuga"
]
```

## 備考

### render

snippetsフォルダにあるファイルをsectionフォルダのliquidファイルから呼び出すときに使う。

```liquid
sectionファイル

{% render 'ファイル名' %}
```

snippetsからsectionに変数を渡す場合、snippetsに{{ 変数名 }}を記述しておいて、

```liquid
snippets/throw_snippets.liquid

<h3 class="{{ title_color }}">{{ title }}</h3>

<style>
  h3 {
    color: #333;
  }

  .title_color {
    color: {{ section.settings.color }};
  }
</style>
```

sectionファイルで値を渡す。「,」で区切って変数: 値

```liquid
sections/catch_snippets.liquid

{% render 'throw_snippets',
    title_color: 'title_color', // snippetsで命名した変数: 'cssクラス名'
    title: section.settings.title // snippetsで命名した変数: 管理画面から入力された値
%}

{% schema %}
{
  "name": "render 確認用セクション",
  "class": "test-wrap",
  "tag": "section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "見出し",
      "default": "h3タイトル"
    },
    {
      "type": "color",
      "id": "color",
      "label": "テキストカラー",
      "default": "#AE4747"
    }
  ],
  "presets": [
    {
      "name": "render 確認用セクション",
      "category": "カスタムパーツ"
    }
  ]
}
{% endschema %}

```

