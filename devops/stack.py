# python3 -m pip install pyyaml
import json
import subprocess
import sys
import yaml

def create_cloud_formation(job, site):

  errStr = 'Proper usage: \n$ python3 stack.py [create|update] [myhealthinsurance|test]'
  if job not in ['deploy']:
    sys.exit('Job \'{}\' not found. '.format(job) + errStr)
  if site not in ['myhealthinsurance', 'test']:
    sys.exit('Site \'{}\' not found. '.format(site) + errStr)

  with open('config.yaml') as file:
    config = yaml.safe_load(file)
    template_file = config['TemplateFile']
    s3_bucket = config['S3Bucket']
    s3_prefix = config['S3Prefix']
    del config['TemplateFile']
    del config['S3Bucket']
    del config['S3Prefix']

    domain = config['DomainName']
    config['ProjectName'] = domain

    # build
    command = (
      'aws cloudformation package --template-file {} '
      '--s3-bucket {} --s3-prefix {} --output-template-file packaged.yaml '
    ).format(template_file, s3_bucket, s3_prefix)

    print("Running command: {}".format(command))
    result = subprocess.run(command, shell=True, capture_output=True)
    stdout = result.stdout.decode('utf-8')
    print(stdout if stdout else "Error: " + result.stderr.decode('utf-8'))

    # prepare parameters
    params = '--parameter-overrides '
    json_config = []
    for (key, val) in config.items():
      json_config.append({'ParameterKey': key, 'ParameterValue': val})
    params += "'" + str(json.dumps(json_config)) + "'"

    # deploy
    stackName = site + '-com-v2'
    command = ('aws cloudformation deploy --stack-name {} '
      '--s3-bucket {} '
      '--s3-prefix {} '
      '--template-file packaged.yaml '
      '--capabilities CAPABILITY_NAMED_IAM '
      '{} ').format(stackName, s3_bucket, s3_prefix, params)

    print("Running command: {}".format(command))
    result = subprocess.run(command, shell=True, capture_output=True)
    stdout = result.stdout.decode('utf-8')
    print(stdout if stdout else "Error: " + result.stderr.decode('utf-8'))

if __name__ == '__main__':
  create_cloud_formation(sys.argv[1], sys.argv[2])
