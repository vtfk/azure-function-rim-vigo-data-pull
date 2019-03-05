# azure-functions-rim-vigo-data-pull

Azure function that pulls data from [RiM 2
WebService](https://drive.google.com/file/d/1RnrN7jSZNY4nhk6dRzgdYPXwWifL6EI9/view?usp=sharing)
every 1 minute, stores file(s) in blob storage and adds document(s) in message queue.

## local.settings.json

```json
{
  "Values": {
    "VGO_URL": "https://vigo.dummy.allthethings.win",
    "VGO_USERNAME": "username",
    "VGO_PASSWORD": "password",
    "VGO_FYLKE": "8",
    "VGO_ANTALL_DOKUMENTER": "1"
  }
}
```

## Development

Install all tools needed for [local development](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

```
$ func start
```

# License

[MIT](LICENSE)
