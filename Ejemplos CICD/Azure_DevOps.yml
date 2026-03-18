trigger:
- main
pool:
  vmImage: ubuntu-latest
steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.x'
- script: |
    npm install
    npm test
  displayName: 'Build and Test'
- task: AzureWebApp@1
  inputs:
    appName: 'myapp-devops'
    package: '$(System.DefaultWorkingDirectory)'
