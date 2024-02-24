/* eslint-disable @typescript-eslint/naming-convention */
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import * as path from 'path';

export const PYTHON_LANGUAGE = 'python';
const folderName = path.basename(__dirname);
export const EXTENSION_ROOT_DIR =
    folderName === 'common' ? path.dirname(path.dirname(__dirname)) : path.dirname(__dirname);
export const BUNDLED_PYTHON_SCRIPTS_DIR = path.join(EXTENSION_ROOT_DIR, 'bundled');
export const SERVER_SCRIPT_PATH = path.join(BUNDLED_PYTHON_SCRIPTS_DIR, 'tool', `server.py`);
export const DEBUG_SERVER_SCRIPT_PATH = path.join(BUNDLED_PYTHON_SCRIPTS_DIR, 'tool', `_debug_server.py`);

export const AppinsightsKey = '';

export function isTestExecution(): boolean {
    return process.env.VSC_PYTHON_CI_TEST === '1' || isUnitTestExecution();
}

/**
 * Whether we're running unit tests (*.unit.test.ts).
 * These tests have a special meaning, they run fast.
 * @export
 * @returns {boolean}
 */
export function isUnitTestExecution(): boolean {
    return process.env.VSC_PYTHON_UNIT_TEST === '1';
}

export namespace Commands {
    export const Debug_In_Terminal = 'debugpy-old.debugInTerminal';
    export const TriggerEnvironmentSelection = 'debugpy-old.triggerEnvSelection';
    export const PickLocalProcess = 'debugpy-old.pickLocalProcess';
    export const PickArguments = 'debugpy-old.pickArgs';
    export const ViewOutput = 'debugpy-old.viewOutput';
    export const ClearStorage = 'debugpy-old.clearCacheAndReload';
    export const Enable_SourceMap_Support = 'debugpy-old.enableSourceMapSupport';
    export const SelectDebugConfig = 'debugpy-old.SelectAndInsertDebugConfiguration';
    export const Set_Interpreter = 'python-old.setInterpreter';
}

export type Channel = 'stable' | 'insiders';
