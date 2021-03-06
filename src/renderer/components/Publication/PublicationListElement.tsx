// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";

import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import LinearProgress from "material-ui/LinearProgress";

import { lazyInject } from "readium-desktop/renderer/di";

import { Publication } from "readium-desktop/common/models/publication";

import { Translator } from "readium-desktop/common/services/translator";

import RaisedButton from "material-ui/RaisedButton";

import { DownloadStatus } from "readium-desktop/common/models/downloadable";

import { Styles } from "readium-desktop/renderer/components/styles";

import { Cover } from "readium-desktop/renderer/components/Publication/index";

import { lcpReadable } from "readium-desktop/utils/publication";

interface IPublicationProps {
    publication: Publication;
    publicationId: number;
    downloading: boolean;
    downloadProgress?: number;
    handleRead: any;
    cancelDownload: any;
    deletePublication: any;
    openInfoDialog: (publication: Publication) => void;
    openReturnDialog: (publication: Publication) => void;
    openRenewDialog: (publication: Publication) => void;
}

interface IDownload {
    link: string;
    progress: number;
}

export default class PublicationListElement extends React.Component<IPublicationProps, null> {
    @lazyInject("translator")
    private translator: Translator;

    public render(): React.ReactElement<{}>  {
        const __ = this.translator.translate.bind(this.translator);

        const publication: Publication = this.props.publication;

        let author: string = "";
        let image: string = "";

        const id = this.props.publicationId;

        if (publication.authors && publication.authors.length > 0) {
            author = this.translator.translateContentField(publication.authors[0].name);
        }
        if (publication.cover) {
            image = publication.cover.url;
        }

        return (
            <div style={Styles.BookListElement.body}>
                <div style={Styles.BookListElement.image_container}>
                    {publication.cover ? (
                        <img style={Styles.BookListElement.image} src={publication.cover.url}/>
                    ) : (
                        <div style={Styles.BookListElement.custom_cover}>
                            <Cover publication={publication}/>
                        </div>
                    )}
                </div>
                <div style={Styles.BookListElement.description}>
                    <h4 style={Styles.BookListElement.title}>
                    {this.translator.translateContentField(publication.title)}
                    </h4>
                    <div style={Styles.BookListElement.content}>
                        <div style={Styles.BookListElement.column}>
                            <p>{author}</p>
                        </div>
                        <div style={Styles.BookListElement.column}>
                                {this.props.downloading ? (
                                    <>
                                        <p>{__("publication.progressDownload")}</p>
                                        <LinearProgress mode="determinate"
                                            value={this.props.downloadProgress} />
                                        <FlatButton
                                            style={Styles.BookCard.downloadButton}
                                            onClick={() => {this.props.cancelDownload(publication); }}
                                            label={__("publication.cancelDownloadButton")} />
                                    </>
                                ) : (
                                    <>
                                        {lcpReadable(publication) ? (
                                            <FlatButton
                                            style={Styles.BookCard.downloadButton}
                                            onClick={() => {this.props.handleRead(publication); }}
                                            label={__("publication.readButton")} />
                                        ) : (
                                            <p style={Styles.BookListElement.lcpSentense}>
                                                {__("publication.notReadableLcp")}
                                            </p>
                                        )}

                                        {publication.lcp && (
                                            <>
                                                <FlatButton
                                                style={Styles.BookCard.downloadButton}
                                                onClick={() => {this.props.openInfoDialog(publication); }}
                                                label={__("publication.infoButton")} />
                                                <FlatButton
                                                style={Styles.BookCard.downloadButton}
                                                onClick={() => {this.props.openRenewDialog(publication); }}
                                                label={__("publication.renewButton")} />
                                                <FlatButton
                                                style={Styles.BookCard.downloadButton}
                                                onClick={() => {this.props.openReturnDialog(publication); }}
                                                label={__("publication.returnButton")} />
                                            </>
                                        )}

                                        <FlatButton
                                        style={Styles.BookCard.downloadButton}
                                        onClick={() => {this.props.deletePublication(publication); }}
                                        label={__("publication.deleteButton")}/>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
