import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {RouteComponentProps, withRouter} from "react-router";
import {IAuthLoginCredentials} from "./IAuthLoginCredentials";
import {AuthService} from "./AuthService";
import {AuthContext} from "./AuthContext";
import {IAuthContext} from "./IAuthContext";

interface IProps extends RouteComponentProps{}

interface IState {
    authLoginCredentials: IAuthLoginCredentials
}

export const Login = withRouter(class InnerLogin extends React.Component<IProps, IState> {
    public static contextType = AuthContext;

    constructor(props:IProps) {
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
    }

    protected login = async () => {
        const authLoginTokens = await AuthService.login(this.state.authLoginCredentials);
        this.authContext.setAuthLoginTokens(authLoginTokens);
        const loggedUser = await AuthService.getLoggedUser();
        this.authContext.setLoggedUser(loggedUser);
        this.props.history.push("/");
    }

    protected get authContext():IAuthContext {
        return this.context as IAuthContext;
    }

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
                        <Form.Text className="text-muted">
                            We will never share your email with anyone else.
                        </Form.Text>
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
});
