# azf-vgo-vigo

Azure function that communicates with [RiM 2 WebService](https://drive.google.com/file/d/1RnrN7jSZNY4nhk6dRzgdYPXwWifL6EI9/view?usp=sharing)

## functions

### pull-timed-trigger

Pulls data from [RiM 2 WebService](https://drive.google.com/file/d/1RnrN7jSZNY4nhk6dRzgdYPXwWifL6EI9/view?usp=sharing)
every 1 minute, stores documents(s) in blob storage as JSON.

#### Example data from vigo

```json
{
  "UnikId": "1",
  "FagsystemNavn": "VIGO",
  "Fodselsnummer": "01234567890",
  "Fornavn": "Morkel",
  "Etternavn": "Mosetuss",
  "Epost": "morkel_musetuss@hotmail.com",
  "Mobilnr": "91000000",
  "Skole": "",
  "Fylke": "8",
  "FolkeRegisterAdresse": {
    "Adresselinje1": "Morgentåkedalen 1000",
    "Adresselinje2": "",
    "Postnummmer": "3000",
    "Poststed": "NOTODDEN"
  },
  "Dokumentelement": {
    "Dokumenttype": "SOKNAD",
    "Dokumenttittel": "Søknad",
    "DokumentId": "ADADAXBXZVAE",
    "Dokumentdato": "2019-01-29T23:00:00.000Z",
    "Dokumentfil": "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9MZW5ndGggMjc2L04gMy9GaWx0ZXIvRmxhd ...", // Base64 of PDF
    "Tilhorighet": "8",
    "Info": "20192020;8026;Nome videregående skole;BAANL2----;Anleggsteknikk;"
  }
}
```

### pull

HttpTrigger needs body example
```js
{
  antallElevDokument: 10
}
```

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
    "VGO_FYLKE": "8",
    "VGO_ANTALL_ELEV_DOKUMENT": "1"
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
- add values from [local.settings.json](#localsettingsjson)

- add function
  - Plattform features -> deployment center
  - github
  - branch master

# Development

Install all tools needed for [local development](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

Clone the repo. Install dependencies (```npm install```)

Create a [local.settings.json](#localsettingsjson) file

Install extentions

```
$ func extentions install
```

Start server

```
$ func start
```

# License

[MIT](LICENSE)
