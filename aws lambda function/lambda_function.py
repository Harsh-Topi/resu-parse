import json
import base64
import requests

def lambda_handler(event, context):
    
    #resJson = json.loads(event['body'])
    resumeb64 = base64.b64decode(event['body']['content'])
    response = requests.post('https://jobs.lever.co/parseResume', files=dict(resume=resumeb64))
    
    return {
        'statusCode' : 200,
        'body' : resumeb64
    }
    
    # if response.status_code != 200:
    #     return {
    #         'statusCode': 500,
    #         'body': 'Error, file was not parsed'
    #     }
    
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps(response.json())
    # }
    
    # return {
    #     'statusCode' : 200,
    #     'body' : 'big gaming gamers'
    # }
