# azf-vgo-vigo-data-pull

Azure function that pulls data from [RiM 2
WebService](https://drive.google.com/file/d/1RnrN7jSZNY4nhk6dRzgdYPXwWifL6EI9/view?usp=sharing)
every 1 minute, stores file(s) in blob storage and adds document(s) in message queue.

## functions

### pull

HttpTrigger needs body example
```js
{
  antallElevDokument: 10
}
```

Responds with: 

### update-status

HttpTrigger needs body example
```js
{
  status: {
    fagsystemNavn: 'Public360',
    dokumentId: 'ADADAXBXZVAE',
    fodselsnummer: '01234567890',
    arkiveringsUtfort: true
  }
}
```

## local.settings.json

```json
{
  "Values": {
    "VGO_URL": "https://vigo.dummy.allthethings.win",
    "VGO_USERNAME": "username",
    "VGO_PASSWORD": "password",
    "VGO_FYLKE": "8"
  }
}
```
## Deploy

### Azure

You'll need a valid subscription and to setup the following resources

- resource group
- app service plan
- storage account

#### Setup function

The easiest way to make this function run is to setup an app service, configure the app and get the function from GitHub.

- add function app
  - Runtime stack -> Node

Configuration for app (Application settings)
- add values from [local.settings.json](#local.settings.json)

- add function
  - Plattform features -> deployment center
  - github
  - branch master

# Development

Install all tools needed for [local development](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

Clone the repo. Install dependencies (```npm install```)

Create a [local.settings.json](#local.settings.json) file

Start server

```
$ func start
```

# License

[MIT](LICENSE)
