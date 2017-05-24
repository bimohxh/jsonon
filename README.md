# jsonon
A json online viewer and formatter.


![](https://raw.githubusercontent.com/bimohxh/jsonon/master/img/logo.png)

## Featrue
- format the json string into  well looking.
- verification json format and tell where the erroris.
- compress json string to a single string.
- highlight js value in different style by it's type.
- fold and expand the object and array value.
- fold all and expand all.
- identify link tags to `<a>...</a>` .
- diff two json, find the different between them.
- save current json data to local.
- all saved json lists view and fill data to current view and remove it.
- offline visit


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
