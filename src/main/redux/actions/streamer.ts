// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import { Action } from "readium-desktop/common/models/redux";

import { Publication } from "readium-desktop/common/models/publication";

export enum ActionType {
    StartRequest = "STREAMER_START_REQUEST",
    StartSuccess = "STREAMER_START_SUCCESS",
    StartError = "STEAMER_START_ERROR",

    StopRequest = "STREAMER_STOP_REQUEST",
    StopSuccess = "STREAMER_STOP_SUCCESS",
    StopError = "STEAMER_STOP_ERROR",

    PublicationOpenRequest = "STREAMER_PUBLICATION_OPEN_REQUEST",
    PublicationOpenSuccess = "STREAMER_PUBLICATION_OPEN_SUCCESS",
    PublicationOpenError = "STREAMER_PUBLICATION_OPEN_ERROR",

    PublicationCloseRequest = "STREAMER_PUBLICATION_CLOSE_REQUEST",
    PublicationCloseSuccess = "STREAMER_PUBLICATION_CLOSE_SUCCESS",
    PublicationCloseError = "STREAMER_PUBLICATION_CLOSE_ERROR",
}

export function start(): Action {
    return {
        type: ActionType.StartRequest,
    };
}

export function openPublication(publication: Publication): Action {
    return {
        type: ActionType.PublicationOpenRequest,
        payload: {
            publication,
        },
    };
}

export function closePublication(publication: Publication): Action {
    return {
        type: ActionType.PublicationCloseRequest,
        payload: {
            publication,
        },
    };
}

export function stop() {
    return {
        type: ActionType.StopRequest,
    };
}
