# Sonar Quality Gate

This action checks the status of a quality gate for a particular analysisID approach taken from [Breaking the CI Build](https://docs.sonarqube.org/display/SONARQUBE53/Breaking+the+CI+Build)

When SonarScanner executes, the compute engine task is given an id. The status of this task, and analysisId for the task can be checked at `/api/ce/task?id=taskid`. When the status is SUCCESS, the quality gate status can be checked at `/api/qualitygates/project_status?analysisId=analysisId`

## Inputs

### `sonar-host-url`

**Required** The server URL

### `sonar-login`

**Required** The login or authentication token of a SonarQube user with Execute Analysis permission on the project.

### `sonar-working-directory`

**Required** The working directory for an analysis triggered with the SonarScanner

## Sample usage

```
name: App Continuous Integration

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with: 
        submodules: "true"
        token: ${{ secrets.ACCESS_TOKEN }}

    - name: Unit Tests
      run: npm run test

    - uses: ./.github/github-actions/sonar-scanner
      if: github.event_name == 'pull_request'
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        PULL_REQUEST_NUMBER: ${{ github.event.number }}
      run: sonar-scanner -X -D project.settings=sonar-project.properties -D sonar.pullrequest.key=$PULL_REQUEST_NUMBER -D sonar.pullrequest.branch=${GITHUB_HEAD_REF} -D sonar.pullrequest.base=${GITHUB_BASE_REF} -D sonar.login="$SONAR_TOKEN"

    - uses: ./.github/github-actions/sonar-quality-gate
      with:
        SONAR_HOST_URL: "https://sonarqube.aj-plus.net"
        SONAR_LOGIN: ${{ secrets.SONAR_TOKEN }}
        SONAR_WORKING_DIRECTORY: ".scannerwork"
```