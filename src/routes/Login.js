import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd';
const FormItem = Form.Item;
const axios = require('axios');
const history = (require('history').createBrowserHistory)();

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post("https://reqres.in/api/login",
                    {
                        "email": values.userEmail,
                        "password": values.password
                    }
                ).then(
                    (res) => {
                        console.log("response returned from server: ", res);
                        this.showSuccessMessage();
                        sessionStorage.setItem("sessionToken", res.data.token);
                        setTimeout(() => {
                            history.push('/home');
                            history.go();
                        }, 1000);
                    }
                    ).catch(
                    (error) => {
                        console.log("error occured ", error);
                        this.showErrorMessage();
                    }
                    );
            } else {
                console.log("Something wrong within the UI: ", err);
                this.showErrorMessage();
            }


        });
    };
    showSuccessMessage = () => {
        message.success('Successfully logged in.');
    };

    showErrorMessage = () => {
        message.error('Login Failed.');
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="v-centered bg">
                <Card hoverable title="Login" className="loginFormCardStyle h-centered">
                    <div name="CardContent" className="formCardContentStyle">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userEmail', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                    )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                    )}
                                <br />
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                &nbsp;
                                Or <a href="./register">register now!</a>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>

        );
    }
}

export default Form.create()(Login);