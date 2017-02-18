# jsonon
A json online viewer and formatter.

## Start
`app` is the foled which include all site files that needed to run. you should run a server  (nginx or just run a simple python ` python -m SimpleHTTPServer 3000`) and point to `app`.

If you just open file `app/index.html`, you will lost the icons.


## Featrue
- format the json string into  well looking.
- verification json format and tell where the erroris.
- compress json string to a single string.
- highlight js value in different style by it's type.
- fold and expand the object and array value.
- fold all and expand all.
- identify link tags to `<a>...</a>` .


## develop and deploy
Some resources such as font and svg must be run at a server. I recommand to use [webon](https://github.com/bimohxh/webon)

### install webon
[webon](https://github.com/bimohxh/webon) is help to develop and deploy a static site.
run
```
npm install webon -g
```

### configuration
You need to do some configuration with `webon init`

### development
Just run 
```
webon s
```

### deploy
```
webon deploy
```


## License
[MIT](http://opensource.org/licenses/MIT)
