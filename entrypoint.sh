#!/bin/sh

set -o errexit
set -o nounset

source logger.sh

INFO "Starting the Sonar Scanner Analysis"

SONAR_LOGIN=${1}
SONAR_PROJECT_SETTINGS=${2}
SONAR_WORKING_DIRECTOYRY=${3}

SONAR_ANALYSIS_TYPE=""

if [ ! -z "$SONAR_PULL_REQUEST_KEY" ] || [ ! -z "$SONAR_PULL_REQUEST_BRANCH" ] || [ ! -z "$SONAR_PULL_REQUEST_BASE_BRANCH" ] || [ ! -z "$SONAR_BRANCH" ] || [ ! -z "$SONAR_BRANCH_TARGET" ]; then
  if [ ! -z "$SONAR_PULL_REQUEST_KEY" ] || [ ! -z "$SONAR_PULL_REQUEST_BRANCH" ] || [ ! -z "$SONAR_PULL_REQUEST_BASE_BRANCH" ]; then 
    if [ -z "$SONAR_PULL_REQUEST_KEY" ]; then
      ERROR "Environment SONAR_PULL_REQUEST_KEY is required."
      exit 1
    fi
    if [ -z "$SONAR_PULL_REQUEST_BRANCH" ]; then
      ERROR "Environment SONAR_PULL_REQUEST_BRANCH is required."
      exit 1
    fi
    if [ -z "$SONAR_PULL_REQUEST_BASE_BRANCH" ]; then
      ERROR "Environment SONAR_PULL_REQUEST_BASE_BRANCH is required."
      exit 1
    fi

    SONAR_ANALYSIS_TYPE="pull_request"

  elif [ ! -z "$SONAR_BRANCH" ] || [ ! -z "$SONAR_BRANCH_TARGET" ]; then
    if [ -z "$SONAR_BRANCH" ]; then
      ERROR "Environment SONAR_BRANCH is required."
      exit 1
    fi

    SONAR_ANALYSIS_TYPE="branch"

  fi
else
  ERROR "Missing one of the following environment variables to run the Sonar Scanner Analysis:
  - SONAR_PULL_REQUEST_KEY is missing
  - SONAR_PULL_REQUEST_BRANCH is missing
  - SONAR_PULL_REQUEST_BASE_BRANCH is missing
  - SONAR_BRANCH is missing
  - SONAR_BRANCH_TARGET is missing"
  exit 1
fi

if [ "$SONAR_ANALYSIS_TYPE" = "pull_request" ]; then
  sonar-scanner -X -D project.settings=$SONAR_PROJECT_SETTINGS -D sonar.login=$SONAR_LOGIN -D sonar.pullrequest.key=$SONAR_PULL_REQUEST_KEY -D sonar.pullrequest.branch=$SONAR_PULL_REQUEST_BRANCH -D sonar.pullrequest.base=$SONAR_PULL_REQUEST_BASE_BRANCH
elif [ "$SONAR_ANALYSIS_TYPE" = "branch" ]; then
  BRANCH_TARGET=""

  if [ ! -z $SONAR_BRANCH_TARGET ]; then
    BRANCH_TARGET="-D sonar.branch.target=$SONAR_BRANCH_TARGET"
  fi
  
  sonar-scanner -X -D project.settings=$SONAR_PROJECT_SETTINGS -D sonar.login=$SONAR_LOGIN -D sonar.branch.name=$SONAR_BRANCH $BRANCH_TARGET
fi

INFO "Starting the Sonar Quality Gate verification"

REPORT_TASK_FILE="${SONAR_WORKING_DIRECTOYRY}/report-task.txt"
SONAR_HOST_URL=$(cat $REPORT_TASK_FILE | grep serverUrl | cut -d '=' -f 2-)
CE_TASK_ID=$(cat $REPORT_TASK_FILE | grep ceTaskId | cut -d '=' -f 2-)

if [ -z "$CE_TASK_ID" ]; then
  LOG "No task id found"
  exit 1
fi

WAIT_FOR_SUCCESS=true
FORCE_EXIT=0

while [ "${WAIT_FOR_SUCCESS}" = "true" ]; do
  FORCE_EXIT=$((FORCE_EXIT + 1))

  CE_STATUS=$(curl -s -u "${SONAR_LOGIN}": ${SONAR_HOST_URL}/api/ce/task?id=${CE_TASK_ID} | jq -r .task.status)

  INFO "Status of SonarQube not found. Trying again"

  if [ "${CE_STATUS}" = "CANCELLED" ]; then
    LOG "SonarQube Compute job has been cancelled"
    exit 1
  fi

  if [ "${CE_STATUS}" = "FAILED" ]; then
    LERRORG "SonarQube Compute job has failed"
    exit 1
  fi

  if [ "${CE_STATUS}" = "SUCCESS" ]; then
    WAIT_FOR_SUCCESS=false
  fi

  if [ "$FORCE_EXIT" -gt "5" ]; then
    ERROR "Exceded the limit of tries"
    exit 1
  fi

  sleep "5"

done

CE_ANALYSIS_ID=$(curl -s -u ${SONAR_LOGIN}: ${SONAR_HOST_URL}/api/ce/task?id=${CE_TASK_ID} | jq -r .task.analysisId)

INFO "Using analysis id of ${CE_ANALYSIS_ID}"

QUALITY_GATE_STATUS=$(curl -s -u ${SONAR_LOGIN}: ${SONAR_HOST_URL}/api/qualitygates/project_status?analysisId="${CE_ANALYSIS_ID}" | jq -r .projectStatus.status)

INFO "Quality Gate status is ${QUALITY_GATE_STATUS}"

if [ "${QUALITY_GATE_STATUS}" != "OK" ]; then
  ERROR "Quality gate is not OK"
  exit 1
fi
=