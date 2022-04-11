// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const HOST = 'http://localhost:';
import { license } from '../../env';

export const environment = {
  production: false,
    adlogin: false,
    sendsms: true,
    api: HOST + '8000',
    nodeapi: HOST + '6002/nodeapi',
    reportsapi: HOST + '6002/nodeapi',
    cacheapi: HOST +  '5600/cache',
    letters_api: HOST + '8004/docx/',
    uploadurl: HOST + '4000',
    demanddownload: HOST + '4000',
    fileupload: HOST + '4005/file-upload',
    metrics: HOST + '8000/appmetrics-dash',
    applink: HOST + '4200',
    emailapi: HOST + '8005/demandemail/email',
    shareemail: HOST + '8005/callbackshare/email',
    demandsmsapi: HOST + '7000',
    auth: HOST + '/adlogin',
    filesapi: HOST + '3000/filesapi', // activityupload
    accplanlink: HOST + '3001',
    birt: HOST + '8080/birt',
    kibana: HOST + '5601/app/kibana#/dashboard?_g=0',
    manuals_path: 'C:\\manuals\\',
    insurancetemplate: 'C:\\templates\\insurance.xlsx',
    portfoliodash: HOST + '5601/goto/bf80fe14782362d8f9307501e75bf055?embed=true',
    portal: HOST + '4300/edc/',
    accplanreport: HOST +  '5601/app/kibana#/discover/346b8c30-0b89-11ea-8410-c5d8870411ab?_g=()',
    // tslint:disable-next-line:max-line-length
    ptpreport: '',
    homedash: '',
    workflow: 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/login/login',
    flem: license.flem,
    invite: 'http://localhost:9000/call',
    host: 'http://localhost:4200',
    miniofiles: 'http://localhost:4400/miniofiles',
    miniovideos: 'http://127.0.0.1:9005',
    rabbitmq: 'http://localhost:5400/activitylogtomq',
    clientactionplantomq: 'http://localhost:5400/clientactionplantomq',
    clientactionplan_to_logstash_http: HOST + '5045/clientactionplan_to_logstash_http',
    ewsactivityrpt:
        'http://127.0.0.1:5601/goto/b3cc2afe3ed845d62b03d6c0c34d3892',
    statutoryexpiry:
        'http://127.0.0.1:5601/goto/1eba45cee8d960cd849aaa4e605dff58',
    otherdemandsexpiry:
        'http://127.0.0.1:5601/goto/1eba45cee8d960cd849aaa4e605dff58',
    collector_activity_raw_v2:
        'http://127.0.0.1:5601/goto/48c8c30edd19f9e8945902887c98452e',
    ews_on_elasticsearch: 'http://127.0.0.1:5401/elasticsearchupdate',
    ewsrpt:
        'https://172.16.19.151:5601/app/dashboards#/view/27a6cf10-1b80-11ec-a304-a3f047cc52bd?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A180000)%2Ctime%3A(from%3Anow%2Fd%2Cto%3Anow%2Fd))',
    mongorest: 'http://localhost:8500/mongorest',
    edcportal: 'http://localhost:4300',
    callbackschedulerpt: '',
    clientactionplanrpt: '',
    flem_server: 'http://localhost:9500',
    elasticsearch: 'https://localhost:9200',
    streamapi: 'http://127.0.0.1:8105/streamapi/utilizationrptbranches',
    srcMainDashboard : 'https://ecollect.inteligen.co.ke/kibana/app/dashboards#/view/291a4b50-b2d5-11ec-8470-d7041aae7a20?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-7d%2Cto%3Anow))'

};
