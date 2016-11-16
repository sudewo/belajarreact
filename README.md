## setup project

```
git clone https://github.com/sudewo/belajarreact.git
```
## npm
npm digunakan untuk menginstall library2 nodejs yang akan kita gunakan dalam pembuatan project
npm init -y
perintah diatas akan mengerate file package.json seperti dibawah ini

```
{
  "name": "belajarreact",
  "version": "1.0.0",
  "description": "belajar react",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sudewo/belajarreact.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/sudewo/belajarreact/issues"
  },
  "homepage": "https://github.com/sudewo/belajarreact#readme"
}
```

## struktur file aplikasi

buat folder aplikasi seperti struktur dibawah ini

```
belajarreact
--public
----index.html
--src
----index.js
```

buat file pada public/index.html dengan kode dibawah ini
```
<html>
  <head>
    <title>BelajarReact</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

buat file pada src/index.js
```
document.getElementById('app').innerHTML = 'hello world';
```

- <div id="app"></app> digunakan sebagai root aplikasi reactjs.
- <script src="bundle.js"></script>  adalah file js hasil kompilasi yang otomatis terbuat pada saat perintah webpack di eksekusi.

## webpack

#### webpack
Webpack sebagagi frontend development tools, salah satunya fungsi yang akan kita gunakan dalam project ini adalah untuk mengkompilasi javascript es6
menjadi javascript es5.

#### webpack dev server
digunakan pada tahap development, berfungsi sebagai server, agar aplikasi yang kita buat dapat berjalan pada browser, salah satu kelebihannya adalah memiliki fitur hot module reaplacement dan automatically refresh browser pada saat mendeteksi perubahan pada aplikasi.

#### install webpack && webpack dev server
```
npm i -D webpack webpack-dev-server
```
code ditatas akan menginstall module webpack dan webpack-dev-server sebagai devDependencies didalam package.json.

- npm -S install : untuk menginstall module npm dan menuliskan file yang diinstall kedalam package.json sebagai dependencies
- npm -D install : untuk menginstall module npm dan menuliskan file yang diinstall kedalam package.json sebagai


#### webpack config

untuk menjalankan webpack kita harus memiliki file konfigurasi, secara default file konfigurasi yang dibuat bernama webpack.config.js, isi file tersebut denga kode dibawah ini

```
module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: './public/'
    },
    module: {},
    plugins: []
}

```

#### running webpack
```
> webpack
```
untuk menjalankan webpack kita hanya perlu menuliskan perintah  "webpack" pada root folder aplikasi seperti diatas, webpack akan otomatis membaca file config dengan nama webpack.config.js

- entry : entry point dari aplikasi (src/index.js) file ini dan file2 dependensi didalamnya akan dieksekusi menjadi bundle.js hasilnya berada di folder /public/bundle.js
- output : lokasi output file yang telah dikompilasi hasilnya dapat kita lihat folder /public/bundle.js
- module : digunakan untuk mentransform code
- plugins :

setelah proses kompilasi menjadi bundle.js selesai, selanjutnya kita akan menjalankan aplikasi pada browser dengan webpack dev server.

#### running webpack-dev-server

```
> webpack-dev-server --content-base=/public/
```
secara default webpack-dev-server akan menjalankan server pada port 8080, opsi "--content-base=/public" digunakan untuk memberitahu server lokasi file index.html pada aplikasi. selanjutanya lihat aplikasi melalui browser : http://localhost:8080


## Babel
sekarang sebagian besar project untuk mengerjakan aplikasi reactjs atau angualar 2 ditulis menggunakan bahasa javascript es6,
masalahnya adalah tidak semua browser mendukung javascript es6, sebagian browser sekarang masih mendukung penulisan javascript es5.
kita memerlukan tools untuk mengkompilasi seluruh code javascript es6 pada aplikasi yang kita buat menjadi javascript es5,
sehingga aplikasi yang kita buat dapat berjalan pada sebagian browser.


Pada Dasarnya babel adalah tools untuk mengkompilasi ECMAScript 6 TO ECMAScript 5,
yang mengijinkan kita menulis project aplikasi dengan fitur ES6 yang kemudian akan dikompilasi menjadi ES5.


untuk mensetup project reactjs app menggunakan fitur es6, kita akan menginstall beberapa package yang diperlukan seperti dibawah ini

```
npm i -D babel-core babel-loader babel-preset-es2015 babel-preset-react
```
- babel-core : Babel compiler core
- babel-loader : package yang digunakan untuk mentranspile javascript file menggunakan babel dan webpack.
- babel-preset-react : Babel preset for all React plugins
- babel-preset-es2015 : Babel preset yang mengandung fitur es6. seperti block scoping, arrow functions, template strings dll.


kemudian install juga react dan react-dom sebagai file dependency pada aplikasi seperti dibawah ini
```
npm i -S react react-dom
```

buat file .babelrc , file ini disimpan didalam root folder aplikasi.
```
{
  presets: ["react","es2015"]
}
```
babel akan melihat file .babelrc untuk mentransform react jsx code dan es2015(es6) menjadi javascript es5


update file webpack.config.js pada bagian module
```
module : {
  loaders : [
    test : /\.jsx?$/,
    exclude : /node_modules/
    loader : 'babel-loader'
  ]
}
```
salah satu fungsi module webpack adalah mentransform code
- dari sass/scss => pure css
- dari jsx syntax => javasript es5
- dari coffescript => javascript

pada script diatas module loaders melihat file .babelrc dan mentransform reactjs dan es2015 menjadi es5



update file src/index.js untuk membuat react component dengan kode es6
```
//creating your first component
import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
    render() {
        return <h1>Hello</h1>
    }
}

ReactDom.render(
    <Hello/>, document.getElementById('app'))
```
react description here ...


running webpack, untuk mengkompilasi ulang script reactjs kedalam bundle.js seperti dibawah ini

```
> webpack
```

kemudian jalankan webpack-dev-server untuk melihat hasilnya di browser.

```
> webpack-dev-server --content-base=public/
```

sampai pada saat ini kita blm mengerjakan aplikasi menggunakan reactjs, setidaknya pada proses diatas kita sudah memahami tools-tools yang digunakan untuk pembuaatan apliaksi yaitu npm, webpack, webpack-dev-server dan babel.
