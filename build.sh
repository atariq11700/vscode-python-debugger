#!/bin/bash

set -e

npm install

PYTHON_VERSION="$(py -3 --version | grep -Po "[\d\.]+")"
echo "Default Python version: $PYTHON_VERSION"

IFS="."
# shellcheck disable=SC2206
PYTHON_VERSION_ARR=($PYTHON_VERSION)
unset IFS

PYTHON_MAJOR_VERSION=${PYTHON_VERSION_ARR[0]}
PYTHON_MINOR_VERSION=${PYTHON_VERSION_ARR[1]}

if [[ $PYTHON_MAJOR_VERSION -lt 3 || $PYTHON_MINOR_VERSION -lt 7 ]]; then
    echo "Minimum version of Python 3.7 required"
    exit 1
fi

cp noxfile.py noxfile_tmp.py

read -r -d ":" FUNCTION_LINE <<< "$(grep -n "def install_old_bundled_libs(session):" noxfile.py)"
SESSION_LINE=$((FUNCTION_LINE - 1))

SED_COMMAND="$SESSION_LINE"s/@nox.session\(python=\"3.7\"\)/@nox.session\(python=\"$PYTHON_VERSION\"\)/
sed -i "$SED_COMMAND" noxfile.py

py -3 -m pip install nox
py -3 -m nox --session install_old_bundled_libs

mv noxfile_tmp.py noxfile.py

npm run vsce-package
