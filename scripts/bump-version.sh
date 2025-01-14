#!/bin/bash

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "[ERROR] Please provide a version number (e.g. 1.0.0)"
  exit 1
fi

BASE_DIR="${PWD}"

ANDROID_BUILD_GRADLE="${BASE_DIR}/android/app/build.gradle"
IOS_DIR="${BASE_DIR}/ios"
APP_VERSION_JSON="${BASE_DIR}/assets/env/appVersion.json"
jq --arg VERSION "$VERSION" '.APP_VERSION = $VERSION' "$APP_VERSION_JSON" > tmp.$$.json && mv tmp.$$.json "$APP_VERSION_JSON"
SONAR_PROJECT_PROPERTIES="${BASE_DIR}/sonar-project.properties"
sed -i '' "s/^sonar.projectVersion.*$/sonar.projectVersion=$VERSION/" "${SONAR_PROJECT_PROPERTIES}"
sed -i '' "s/app_version=\".*\"/app_version=\"$VERSION\"/" "${ANDROID_BUILD_GRADLE}"
cd "${BASE_DIR}" && yarn --new-version version $VERSION --no-git-tag-version --no-commit-hooks
# cd "${IOS_DIR}" && bundle install && APP_VERSION="$VERSION" bundle exec fastlane versionnum
