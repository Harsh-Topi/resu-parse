import json
import base64
import requests

def lambda_handler(event, context):
    
    convert = json.loads(event['body'])
    resumeb64 = base64.b64decode(convert['body']['content'])
    response = requests.post('https://jobs.lever.co/parseResume', files=dict(resume=resumeb64))

    return {
        "isBase64Encoded": 'false',
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "POST"
        },
        'body' : json.dumps(response.json())
    }
    