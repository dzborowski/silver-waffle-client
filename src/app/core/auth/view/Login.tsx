import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {IAuthLoginCredentials} from "../interface/IAuthLoginCredentials";
import {AppModel} from "../../../AppModel";

interface IProps {}

interface IState {
    authLoginCredentials: IAuthLoginCredentials;
}

export class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            authLoginCredentials: {
                email: "jan.kowalski@gmail.com",
                password: "0okm(IJN",
            },
        };
    }

    protected setAuthLoginCredentialsProperty = (data: Partial<IAuthLoginCredentials>) => {
        this.setState((state) => ({
            ...state,
            authLoginCredentials: {
                ...state.authLoginCredentials,
                ...data,
            },
        }));
    };

    protected login = async () => {
        await AppModel.rootStore.auth.login(this.state.authLoginCredentials);
        const {from} = AppModel.history.location.state || {from: {pathname: "/"}};
        AppModel.history.replace(from);
    };

    public render() {
        return (
            <div className={"Login"}>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={this.state.authLoginCredentials.email}
                            onChange={(event) => {
                                this.setAuthLoginCredentialsProperty({email: event.target.value});
                            }}
                        />
                        <Form.Text className="text-muted">We will never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={this.state.authLoginCredentials.password}
                            onChange={(event) => {
                                this.setAuthLoginCredentialsProperty({password: event.target.value});
                            }}
                        />
                    </Form.Group>

                    <Button variant="primary" onClick={this.login}>
                        Zaloguj się
                    </Button>
                </Form>
            </div>
        );
    }
}
