// ==LICENSE-BEGIN==
// Copyright 2017 European Digital Reading Lab. All rights reserved.
// Licensed to the Readium Foundation under one or more contributor license agreements.
// Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file exposed on Github (readium) in the project repository.
// ==LICENSE-END==

import * as React from "react";

import { Styles } from "readium-desktop/renderer/components/styles";

import { lazyInject } from "readium-desktop/renderer/di";

import FlatButton from "material-ui/FlatButton";

import { Translator } from "readium-desktop/common/services/translator";

interface IOpdsFormProps {
    closeDialog: any;
    downloadOPDS: any;
    closeList: any;
}

interface IOpdsFormState {
    username: string;
    password: string;
    formError: boolean;
}

export default class AuthenticationForm extends React.Component<IOpdsFormProps, IOpdsFormState> {
    @lazyInject("translator")
    private translator: Translator;

    constructor(props: IOpdsFormProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            formError: false,
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    public render(): React.ReactElement<{}>  {
        const __ = this.translator.translate.bind(this.translator);
        const messageError = (<p style={Styles.OpdsList.errorMessage}>Veuillez remplir tous les champs</p>);
        let currentMessageError = (<div></div>);
        if (this.state.formError) {
            currentMessageError = messageError;
        }
        return (
            <div>
                {currentMessageError}
                <p>{__("opds.authentication.sentence")}</p>
                <div style={Styles.OpdsList.formElement}>
                    <label style={Styles.OpdsList.formElementLabel}>{__("opds.authentication.username")}</label>
                        <input
                            type="text"
                            style={Styles.OpdsList.textZone}
                            value={this.state.username}
                            onChange={this.handleUsernameChange}/><br/>
                </div>
                <div style={Styles.OpdsList.formElement}>
                    <label style={Styles.OpdsList.formElementLabel} >{__("opds.authentication.password")}</label>
                        <input
                            type="password"
                            style={Styles.OpdsList.textZone}
                            value={this.state.password}
                            onChange={this.handlePasswordChange}/><br/>
                </div>
                <div>
                    <FlatButton
                        label={__("opds.authentication.loginButton")}
                        primary={true}
                        onClick={() => {
                            if (this.isFormValid()) {
                                this.props.downloadOPDS({username: this.state.username, password: this.state.password});
                                this.props.closeDialog();
                            } else {
                                this.setState({formError: true});
                            }
                        }}
                    />
                    <FlatButton
                        label={__("opds.back")}
                        primary={true}
                        onClick={() => {
                                this.props.closeDialog();
                                this.props.closeList();
                        }}
                    />
                </div>
            </div>
        );
    }

    private handleUsernameChange(event: any) {
        this.setState({username: event.target.value});
    }

    private handlePasswordChange(event: any) {
        this.setState({password: event.target.value});
    }

    private isFormValid(): boolean {
        if (this.state.password !== "" && this.state.username !== ""
            && this.state.password !== undefined && this.state.username !== undefined) {
            return true;
        }
        return false;
    }
}
