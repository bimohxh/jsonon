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


## deploy on oss
sometime we want to deploy the app on a oss static server,  we offer a tool to deploy site to qiniu oss.

### initial node environment
run
```
npm install
```

### config qiniu 
Create a  file `config/local_env.json` like :

```
{
  "qiniu": {
    "accessKey": "....",
    "secretKey": "....",,
    "bucket": "....",,
    "origin": "...."
  }
}
```


### run  command
```
npm run deploy
```


## License
[MIT](http://opensource.org/licenses/MIT)
