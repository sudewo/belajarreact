
## clone project
ingin langsung lihat demonya, clone projectnya disini
```
> git clone https://github.com/sudewo/belajarreact.git
> npm install
> webpack-dev-server --content-base=public/ --hot --inline
```






ikuti langkah2nya disini

## setup project
Sebelum memulai project pembuatan aplikasi reactjs, pastikan kita sudah menginstall nodejs dan npm.

## npm
npm digunakan untuk menginstall library2 nodejs yang akan gunakan dalam pembuatan project.

Buat folder aplikasi dengan nama belajarreact, didalam folder tersebut tulis perintah seperti dibawah ini untuk men inisialisais project.

```
> npm init -y

```
perintah diatas akan mengerate file package.json seperti dibawah ini

```
{
  "name": "belajarreact",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

```

## struktur file aplikasi

buat folder dan file seperti struktur dibawah ini

```
belajarreact
--public
----index.html
--src
----index.js
```

isi file pada public/index.html dengan kode dibawah ini
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

isi file pada src/index.js
```
document.getElementById('app').innerHTML = 'hello world';
```

- ``<div id="app"></app>`` digunakan sebagai root aplikasi reactjs.
- ``<script src="bundle.js"></script>``  adalah file js hasil kompilasi yang otomatis terbuat pada saat perintah webpack di eksekusi.




#### webpack
Untuk membuat program dengan javascript modern yang menggunakan fitur2 Javascript ECMAScript 6, kita memerlukan tools untuk mengkompilasi seluruh code javascript es6 menjadi javascript es5 disnilah kita memerlukan webpack.

#### webpack dev server
digunakan pada tahap development, berfungsi sebagai server, agar aplikasi yang kita buat dapat berjalan pada browser, salah satu kelebihannya adalah memiliki fitur hot module reaplacement dan automatically refresh browser pada saat mendeteksi perubahan pada aplikasi.

#### install webpack && webpack dev server

install kedua package dibawah ini :
```
npm i -D webpack webpack-dev-server
```
code ditatas akan menginstall module webpack dan webpack-dev-server sebagai devDependencies didalam package.json.

>
- npm -S  : untuk menginstall module npm dan menuliskan file yang diinstall kedalam package.json sebagai dependencies
- npm -D  : untuk menginstall module npm dan menuliskan file yang diinstall kedalam package.json sebagai devDependencies


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
Penjelasan kode diatas :

- entry : entry point dari aplikasi (src/index.js),  file ini dan file2 dependensi didalamnya akan dieksekusi menjadi bundle.js hasilnya berada di folder /public/bundle.js
- output : lokasi output file yang telah dikompilasi oleh wepback hasilnya dapat kita lihat folder /public/bundle.js
- module : digunakan untuk mentransform code
- plugins :


#### running webpack
```
> webpack
```
untuk menjalankan webpack kita hanya perlu menuliskan perintah  "webpack" pada root folder aplikasi seperti diatas, webpack akan otomatis membaca file config dengan nama webpack.config.js


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


untuk mensetup project reactjs menggunakan fitur es6, kita akan menginstall beberapa package yang diperlukan seperti dibawah ini

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



update file src/index.jsx untuk membuat react component dengan kode es6
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



running webpack, untuk mengkompilasi ulang script reactjs kedalam bundle.js seperti dibawah ini

```
> webpack
```

kemudian jalankan webpack-dev-server seperti command dibawah ini kemudian lihat hasilnya di browser dengan mengakses http://localhost:8080

```
> webpack-dev-server --content-base=public/
```

sampai pada saat ini kita blm mengerjakan aplikasi menggunakan reactjs, setidaknya pada proses diatas kita sudah memahami tools-tools yang digunakan untuk pembuaatan apliaksi yaitu npm, webpack, webpack-dev-server dan babel.


## reactjs
Apa itu Reactjs,
Reactjs adalah Javascript Library untuk membangun userinterface.
bagaiamana cara membuat userinterface dengan react? jawabanya component.
Apa itu Component
Component adalah "building blocks" dari react, component seperti directive pada angular.

bagaimana cara berpikir membangun userinterface dengan react component?, lihat gambar dibawah ini.
userinterface dibawah ini  terdiri dari beberapa kumpulan component.


bagaimana cara membuat component?
component bisa dibuat degan function atau class

pada dasarnya component adalah sebuah function,seperti dibawah ini

dengan function
```
function Hello(){
  return(<div>Hello World</div>)
}
```

atau dengan class dengan render functionnya :
```
import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
    render() {
        return (
            <div>Hello</div>
        );
    }
}
```
bagaimana cara memanggil component diatas
```
<Hello />
```

<!--
cara menampilkannya ke browser dengan ReactDom seperti diwabah ini
ReactDom.render(<Hello />, document.getElementById('#app'));
ReactDom.Render akan menampilkan component <Hello/> kemudian di ineject kedalaman div attribut #app
-->
kenapa memanggil function seperti tag HTML  <Hello />

Itu namanya JSX

Apa itu jsx : JSX memudahkan kita menulis component seperti HTML syntax yang akan ditransform sebagai javascript object. contohnya ?

component <Hello/> diatas akan ditransform menjadi javascript seperti dibawah ini :

```
React.createElement("div", null, "Hello World");
```
sekali lagi, JSX memudahkan kita menulis component seperti HTML Syntax daripada menulisnya dengan pure javascript.


### props
Setiap component pada react dapat memiliki props, ditulis sebagai attribute setiap component.
lihat contoh dibawah ini

```
import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
    render() {
        return (
            <div>Hello {this.props.title}</div>
        );
    }
}

Hello.propTypes = {
    title: React.PropTypes.string
}

Hello.defaultProps = {
    title: 'World'
}

// var hello = React.createElement('div', null, 'hello world');
ReactDom.render(
    <Hello title="Mike"/>, document.getElementById('app'));

```

- ``<Hello title="Mike"/>``  : cara membuat attribute props title pada compoenent
- ``this.props.title`` : cara memanggil props didalem component.


```
Hello.propTypes = {
    title: React.PropTypes.string
}
```
script diatas sebagai type checking, untuk memastikan data title yang diinput harus string

```
Hello.defaultProps = {
    title: 'World'
}
```
script diatas sebagai default props, jika attribute props title tidak diisi maka nilai defaultnya title.

```
<Hello title={2}/>
```
error :
Warning: Failed prop type: Invalid prop `title` of type `number` supplied to `Hello`, expected `string`.

jika kita masukan integer pada nilai props title, maka akan muncul warning karna nilai props tidak sesuai dengan yang sudah didefinisikan. maka dari itu propTypes dalam react component sangat penting sebagai pengecekan atribute props.
