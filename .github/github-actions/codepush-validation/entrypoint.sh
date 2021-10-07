#!/bin/sh

git diff --name-only origin/$INPUT_BASE_BRANCH... > ./git-diff.txt

while read git_diff_line; do
  echo "::debug::LINE: $git_diff_line "

  if [[ "$git_diff_line" == "$INPUT_PACKAGE_JSON_PATH"* ]]; then
    echo "::warning title=$git_diff_line::Skip CodePush deployment as branch may not contains only react-native changes."
    echo "::set-output name=codepush_deployment::false"
    exit 0
  fi

  if [[ "$git_diff_line" == "$INPUT_ANDROID_PATH"* ]]; then
    echo "::warning title=$git_diff_line::Skip CodePush deployment as branch may not contains only react-native changes."
    echo "::set-output name=codepush_deployment::false"
    exit 0
  fi

  if [[ "$git_diff_line" == "$INPUT_IOS_PATH"* ]]; then
    echo "::warning title=$git_diff_line::Skip CodePush deployment as branch may not contains only react-native changes."
    echo "::set-output name=codepush_deployment::false"
    exit 0
  fi

  if [[ "$git_diff_line" == "$INPUT_YARN_LOCK_PATH"* ]]; then
    echo "::warning title=$git_diff_line::Skip CodePush deployment as branch may not contains only react-native changes."
    echo "::set-output name=codepush_deployment::false"
    exit 0
  fi
done < ./git-diff.txt

echo "::note title=CodePush deployment::CodePush deployment elegible."
echo "::set-output name=codepush_deployment::true"